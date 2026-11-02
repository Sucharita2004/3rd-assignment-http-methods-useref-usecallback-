import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import StudentForm from "../../components/StudentManagementCRUD/StudentForm";
import {
  getStudentById,
  updateStudent,
} from "../../services/helper/student.function";
import type {
  Student,
  StudentPayload,
} from "../../types/interface/student.interface";

const EditStudent = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const fetchStudent = async () => {
      if (!id) {
        toast.error("Student ID is missing");
        navigate("/");
        return;
      }

      try {
        setLoading(true);
        const response = await getStudentById(id);

        if (active) {
          setStudent(response);
        }
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to fetch student";

        toast.error(message);

        if (active) {
          navigate("/");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void fetchStudent();

    return () => {
      active = false;
    };
  }, [id, navigate]);

  const handleUpdateStudent = async (payload: StudentPayload) => {
    if (!id) {
      throw new Error("Student ID is missing");
    }

    await updateStudent(id, payload);

    toast.success("Student updated successfully");
    navigate(`/student-management/details/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-10 text-center text-gray-500">
        Loading student details...
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50 p-10 text-center">
        Student not found.
        <div>
          <Link to="/" className="text-blue-600 hover:underline">
            Back to Students
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f7f7] px-4 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <Link
          to={`/students/${student.$id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#123d3a] transition hover:text-[#28766b]"
        >
          <span className="text-lg">←</span>
          Back to Details
        </Link>

        <div className="mb-7 mt-6">
          <span className="inline-flex rounded-full bg-[#e1f6f0] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#123d3a]">
            Student Management
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#123d3a] sm:text-4xl">
            Edit Student
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
            Update the student's information and save your changes.
          </p>
        </div>

        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center gap-4 bg-[#123d3a] px-5 py-5 sm:px-8 sm:py-6">
            <div>
              <h2 className="text-lg font-bold text-white sm:text-xl">
                Update Student Information
              </h2>

              <p className="mt-1 text-sm text-gray-300">
                Make the necessary changes below.
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-8">
            <StudentForm
              initialData={student}
              submitLabel="Update Student"
              onSubmit={handleUpdateStudent}
              onCancel={() => navigate(`/students/${student.$id}`)}
            />
          </div>
        </section>

        <p className="mt-5 text-center text-xs leading-5 text-gray-500">
          Review your changes before updating the student record.
        </p>
      </div>
    </main>
  );
};

export default EditStudent;
