
import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";

import type {
  Student,
  StudentField,
  StudentPayload,
} from "../../types/interface/student.interface";
import { studentFields } from "../../types/interface/students.fields";



interface StudentFormProps {
  initialData?: Student | null;
  onSubmit: (payload: StudentPayload) => Promise<void>;
  submitLabel: string;
  onCancel: () => void;
}

const emptyForm: StudentPayload = {
  name: "",
  email: "",
  age: 0,
  phone: "",
  course: "",
};

const getInitialFormData = (
  student?: Student | null,
): StudentPayload => {
  if (!student) {
    return { ...emptyForm };
  }

  return {
    name: student.name ?? "",
    email: student.email ?? "",
    age: student.age ?? 0,
    phone: student.phone ?? "",
    course: student.course ?? "",
  };
};

const StudentForm = ({
  initialData,
  onSubmit,
  submitLabel,
  onCancel,
}: StudentFormProps) => {
  const [formData, setFormData] = useState<StudentPayload>(() =>
    getInitialFormData(initialData),
  );

  const [loading, setLoading] = useState(false);

  const handleChange = (
    field: StudentField,
    value: string,
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field.name]:
        field.type === "number"
          ? value === ""
            ? 0
            : Number(value)
          : value,
    }));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const missingField = studentFields.find((field) => {
      const value = formData[field.name];

      return (
        field.required &&
        String(value).trim() === ""
      );
    });

    if (missingField) {
      toast.error(`${missingField.label} is required`);
      return;
    }

    if (formData.age < 1) {
      toast.error("Please enter a valid age");
      return;
    }

    try {
      setLoading(true);
      await onSubmit(formData);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

return (
  <form
    onSubmit={handleSubmit}
    className="w-full space-y-7"
  >
 
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {studentFields.map((field) => (
        <div
          key={field.name}
          className="flex flex-col gap-2.5"
        >
          <label
            htmlFor={field.name}
            className="text-sm font-semibold text-[#123d3a]"
          >
            {field.label}
            {field.required && (
              <span className="ml-1 text-red-500">*</span>
            )}
          </label>

          <input
            id={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            required={field.required}
            min={field.type === "number" ? 1 : undefined}
            value={formData[field.name]}
            onChange={(event) =>
              handleChange(field, event.target.value)
            }
            className="w-full rounded-xl border border-gray-200 bg-[#f8fbfa] px-4 py-3.5 text-sm text-gray-800 outline-none transition duration-200 placeholder:text-gray-400 hover:border-[#a8d9ce] focus:border-[#28766b] focus:bg-white focus:ring-4 focus:ring-[#e1f6f0]"
          />
        </div>
      ))}
    </div>

 
    <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
      <button
        type="button"
        onClick={onCancel}
        disabled={loading}
        className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-600 transition duration-200 hover:border-[#123d3a] hover:bg-[#f4f7f7] hover:text-[#123d3a] disabled:cursor-not-allowed disabled:opacity-60"
      >
        Cancel
      </button>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#123d3a] px-6 py-3 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-[#205a53] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Please wait...
          </>
        ) : (
          submitLabel
        )}
        {!loading && <span className="text-lg">→</span>}
      </button>
    </div>
  </form>
);
};

export default StudentForm;
