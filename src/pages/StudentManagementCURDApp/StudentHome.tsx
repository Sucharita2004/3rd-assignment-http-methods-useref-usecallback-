import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { FiX, FiUserPlus, FiEdit2 } from "react-icons/fi";

import StudentTable from "../../components/StudentManagementCRUD/StudentTable";
import StudentForm from "../../components/StudentManagementCRUD/StudentForm";

import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../../services/helper/student.function";

import type {
  Student,
  StudentPayload,
} from "../../types/interface/student.interface";

const StudentHome = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Dialog states
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [saving, setSaving] = useState(false);
  const loadStudents = async () => {
    try {
      const response = await getStudents();
      setStudents(response);
    } catch (error) {
      console.error("Failed to fetch students:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to load students",
      );
    }
  };

  // Fetch students
  useEffect(() => {
    let cancelled = false;

    async function fetchStudents() {
      try {
        const response = await getStudents();

        if (!cancelled) {
          setStudents(response);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to fetch students:", error);

          toast.error(
            error instanceof Error ? error.message : "Failed to load students",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void fetchStudents();

    return () => {
      cancelled = true;
    };
  }, []);

  // Open Add Dialog
  const handleOpenAdd = () => {
    setSelectedStudent(null);
    setOpenDialog(true);
  };

  // Open Edit Dialog
  const handleOpenEdit = (student: Student) => {
    setSelectedStudent(student);
    setOpenDialog(true);
  };

  // Close Dialog
  const handleCloseDialog = () => {
    if (saving) return;

    setOpenDialog(false);
    setSelectedStudent(null);
  };

  // Add Student
  const handleAddStudent = async (data: StudentPayload) => {
    try {
      setSaving(true);

      await createStudent(data);

      toast.success("Student added successfully");
      setOpenDialog(false);
      setSelectedStudent(null);

      await loadStudents();
    } catch (error) {
      console.error("Add student error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to add student",
      );
    } finally {
      setSaving(false);
    }
  };

  // Update Student
  const handleUpdateStudent = async (data: StudentPayload) => {
    if (!selectedStudent) return;

    try {
      setSaving(true);

      await updateStudent(selectedStudent.$id, data);

      toast.success("Student updated successfully");
      setOpenDialog(false);
      setSelectedStudent(null);

      await loadStudents();
    } catch (error) {
      console.error("Update student error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update student",
      );
    } finally {
      setSaving(false);
    }
  };

  // Delete Student
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this student?")) {
      return;
    }

    try {
      setDeletingId(id);

      await deleteStudent(id);

      setStudents((previous) =>
        previous.filter((student) => student.$id !== id),
      );

      toast.success("Student deleted successfully");
    } catch (error) {
      console.error("Delete student error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to delete student",
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f7f7] px-4 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-[#123d3a] p-6 shadow-md sm:p-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Student Management
            </h1>

            <p className="mt-2 text-sm text-gray-300">
              Manage student information in one place.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 rounded-xl bg-[#a8eee0] px-5 py-3 text-sm font-semibold text-[#123d3a] transition hover:bg-white"
          >
            <FiUserPlus size={18} />
            Add Student
          </button>
        </div>

        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 px-5 py-5 sm:px-6">
            <div>
              <h2 className="text-lg font-bold text-[#123d3a]">All Students</h2>

              <p className="mt-1 text-sm text-gray-500">
                View and manage your student records.
              </p>
            </div>

            <span className="rounded-full bg-[#e1f6f0] px-4 py-2 text-sm font-semibold text-[#123d3a]">
              Total: {students.length}
            </span>
          </div>

          {loading ? (
            <div className="flex min-h-56 flex-col items-center justify-center gap-3 p-10">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#d9f2ec] border-t-[#123d3a]" />
              <p className="text-sm font-medium text-gray-500">
                Loading students...
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <StudentTable
                students={students}
                onDelete={handleDelete}
                deletingId={deletingId}
                onEdit={handleOpenEdit}
              />
            </div>
          )}
        </section>
      </div>

      {/* Add / Edit MUI Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            bgcolor: "#123d3a",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 3,
            py: 2.5,
          }}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#a8eee0] text-[#123d3a]">
              {selectedStudent ? (
                <FiEdit2 size={19} />
              ) : (
                <FiUserPlus size={19} />
              )}
            </div>

            <div>
              <h2 className="text-lg font-bold">
                {selectedStudent ? "Edit Student" : "Add Student"}
              </h2>

              <p className="mt-1 text-xs font-normal text-gray-300">
                {selectedStudent
                  ? "Update the student's information."
                  : "Enter the new student's information."}
              </p>
            </div>
          </div>

          <IconButton
            onClick={handleCloseDialog}
            disabled={saving}
            aria-label="Close dialog"
            sx={{
              color: "#ffffff",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.12)",
              },
            }}
          >
            <FiX />
          </IconButton>
        </DialogTitle>

        <DialogContent
          sx={{
            p: { xs: 2, sm: 3 },
            pt: "24px !important",
            bgcolor: "#ffffff",
          }}
        >
          <StudentForm
            key={selectedStudent?.$id ?? "new-student"}
            initialData={selectedStudent ?? undefined}
            submitLabel={selectedStudent ? "Update Student" : "Add Student"}
            onSubmit={selectedStudent ? handleUpdateStudent : handleAddStudent}
            onCancel={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default StudentHome;
