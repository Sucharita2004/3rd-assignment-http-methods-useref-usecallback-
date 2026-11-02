import { ID } from "appwrite";
import { tabledb } from "../../lib/AppwriteClient";
import type {
  Student,
  StudentPayload,
} from "../../types/interface/student.interface";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_TABLEDB_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_STUDENT_TABLE_ID;

const validateConfig = () => {
  if (!DATABASE_ID || !TABLE_ID) {
    throw new Error(
      "Appwrite Database ID or Student Table ID is missing. Check your .env file.",
    );
  }
};

// GET: Fetch all students
export const getStudents = async (): Promise<Student[]> => {
  validateConfig();

  const response = await tabledb.listRows({
    databaseId: DATABASE_ID,
    tableId: TABLE_ID,
  });

  return response.rows as unknown as Student[];
};

// GET: Fetch one student by ID
export const getStudentById = async (
  id: string,
): Promise<Student> => {
  validateConfig();

  const response = await tabledb.getRow({
    databaseId: DATABASE_ID,
    tableId: TABLE_ID,
    rowId: id,
  });

  return response as unknown as Student;
};

// POST: Create a student
export const createStudent = async (
  payload: StudentPayload,
): Promise<Student> => {
  validateConfig();

  const safePayload = {
    ...payload,
    name: String(payload.name ?? ""),
    email: String(payload.email ?? ""),
    age: Number(payload.age),
    phone: String(payload.phone ?? ""),
    course: String(payload.course ?? ""),
  };

  console.log("Payload:", safePayload);
  console.log("Phone type:", typeof safePayload.phone);

  const response = await tabledb.createRow({
    databaseId: DATABASE_ID,
    tableId: TABLE_ID,
    rowId: ID.unique(),
    data: safePayload,
  });

  return response as unknown as Student;
};

// PUT: Update a student
export const updateStudent = async (
  id: string,
  payload: StudentPayload,
): Promise<Student> => {
  validateConfig();

  const response = await tabledb.updateRow({
    databaseId: DATABASE_ID,
    tableId: TABLE_ID,
    rowId: id,
    data: payload,
  });

  return response as unknown as Student;
};

// DELETE: Delete a student
export const deleteStudent = async (
  id: string,
): Promise<void> => {
  validateConfig();

  await tabledb.deleteRow({
    databaseId: DATABASE_ID,
    tableId: TABLE_ID,
    rowId: id,
  });
};