import type { StudentField } from "./student.interface";

export const studentFields: StudentField[] = [
  {
    name: "name",
    label: "Student Name",
    type: "text",
    placeholder: "Enter student name",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter email address",
    required: true,
  },
  {
    name: "age",
    label: "Age",
    type: "number",
    placeholder: "Enter age",
    required: true,
  },
  {
    name: "phone",
    label: "Phone",
    type: "number",
    placeholder: "Enter phone number",
    required: true,
  },
  {
    name: "course",
    label: "Course",
    type: "text",
    placeholder: "Enter course name",
    required: true,
  },
];