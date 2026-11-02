import { Link } from "react-router-dom";
import type { Student } from "../../types/interface/student.interface";

interface StudentTableProps {
  students: Student[];
  onDelete: (id: string) => void;
  deletingId: string | null;
  onEdit: (student: Student) => void;
}

const StudentTable = ({
  students,
  onDelete,
  deletingId,
  onEdit,
}: StudentTableProps) => {
  if (students.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
        <p className="text-gray-500">No students found.</p>
        <Link
          to="/students/add"
          className="mt-4 inline-block font-semibold text-blue-600 hover:underline"
        >
          Add your first student
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 bg-white px-5 py-5 sm:px-6">
        <div>
          <h2 className="text-lg font-bold text-[#123d3a]">Student Records</h2>
          <p className="mt-1 text-sm text-gray-500">
            View and manage all student information.
          </p>
        </div>

       
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] border-collapse text-left">
          <thead className="bg-[#e1f6f0]">
            <tr>
              {["Name", "Email", "Age", "Phone", "Course", "Actions"].map(
                (heading) => (
                  <th
                    key={heading}
                    className="border-b border-[#d4ebe4] px-5 py-4 text-xs font-bold uppercase tracking-wider text-[#123d3a]"
                  >
                    {heading}
                  </th>
                ),
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {students.map((student) => (
              <tr
                key={student.$id}
                className="transition duration-200 hover:bg-[#f4faf8]"
              >
                <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-[#123d3a]">
                  {student.name}
                </td>

                <td className="px-5 py-4 text-sm text-gray-600">
                  {student.email}
                </td>

                <td className="px-5 py-4 text-sm text-gray-600">
                  {student.age}
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                  {student.phone}
                </td>

                <td className="px-5 py-4 text-sm text-gray-600">
                  <span className="inline-flex rounded-full bg-[#e1f6f0] px-3 py-1 text-xs font-semibold text-[#123d3a]">
                    {student.course}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onEdit(student)}
                      className="text-sm font-semibold text-[#28766b] hover:text-[#123d3a] hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      disabled={deletingId === student.$id}
                      onClick={() => onDelete(student.$id)}
                      className="text-sm font-semibold text-red-500 transition hover:text-red-700 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {deletingId === student.$id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {students.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center">
                  <p className="text-base font-semibold text-[#123d3a]">
                    No students found
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Add a student to see their information here.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 bg-[#fbfdfc] px-5 py-4 sm:px-6">
        <p className="text-sm text-gray-500">Total student records</p>
        <span className="rounded-full bg-[#e1f6f0] px-3 py-1 text-sm font-bold text-[#123d3a]">
          {students.length}
        </span>
      </div>
    </div>
  );
};

export default StudentTable;
