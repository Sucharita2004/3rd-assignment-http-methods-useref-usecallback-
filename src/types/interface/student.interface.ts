export interface Student {
  $id: string;
  name: string;
  email: string;
  age: number;
  phone: string;
  course: string;
}

export type StudentPayload = Omit<Student, "$id">;

export type StudentField = {
  name: keyof StudentPayload;
  label: string;
  type: "text" | "email" | "number" ;
  placeholder: string;
  required?: boolean;
};
