
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import StudentForm from "../../components/StudentManagementCRUD/StudentForm";
import { createStudent } from "../../services/helper/student.function";

import type {
  StudentPayload,
} from "../../types/interface/student.interface";

const AddStudent = () => {
  const navigate = useNavigate();

  const handleAddStudent = async (payload: StudentPayload) => {
    try {
      await createStudent(payload);

      toast.success("Student added successfully!");

      navigate("/student-management");
    } catch (error) {
      console.error("Failed to add student:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to add student. Please try again.",
      );
    }
  };

  const handleCancel = () => {
    navigate("/student-management");
  };

return (
  <main className="min-h-screen bg-[#f4f7f7] px-4 py-8 sm:px-8 lg:px-10">
    <div className="mx-auto max-w-4xl">
   
      <Link
        to="/student-management"
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#123d3a] transition hover:text-[#28766b]"
      >
        <span className="text-lg">←</span>
        Back to Students
      </Link>

 
      <div className="mb-7 mt-3">
        <span className="inline-flex rounded-full bg-[#e1f6f0] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#123d3a]">
          Student Management
        </span>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#123d3a] sm:text-4xl">
          Add Student
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
          Enter the student details below to create a new student record.
        </p>
      </div>

      
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
   
        <div className="flex items-center gap-4 bg-[#123d3a] px-5 py-5 sm:px-8 sm:py-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#a8eee0] text-2xl font-bold text-[#123d3a]">
            +
          </div>

          <div>
            <h2 className="text-lg font-bold text-white sm:text-xl">
              Student Information
            </h2>

            <p className="mt-1 text-sm text-gray-300">
              Fill in the required information.
            </p>
          </div>
        </div>

      
        <div className="p-5 sm:p-8">
          <StudentForm
            onSubmit={handleAddStudent}
            onCancel={handleCancel}
            submitLabel="Add Student"
          />
        </div>
      </section>

      <p className="mt-5 text-center text-xs leading-5 text-gray-500">
        Please check the student information before submitting the form.
      </p>
    </div>
  </main>
);
};

export default AddStudent;
