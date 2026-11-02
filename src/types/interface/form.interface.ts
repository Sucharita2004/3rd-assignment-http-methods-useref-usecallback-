import type { ChangeEvent } from "react";

export interface FormDataType {
  fullName: string;
  email: string;
  phone: string;
  age: number;
  gender: string;

  course: string;
  coursePrice: number;
  quantity: number;
  discount: number;

  address: string;
  city: string;
  state: string;
  pinCode: string;
}

export type InputChangeEvent = ChangeEvent<
  HTMLInputElement | HTMLSelectElement
>;

export interface PersonalInfoProps {
  fullName: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  handleChange: (e: InputChangeEvent) => void;
}

export interface CourseInfoProps {
  course: string;
  coursePrice: number;
  quantity: number;
  discount: number;
  handleChange: (e: InputChangeEvent) => void;
}

export interface OrderSummaryProps {
  course: string;
  coursePrice: number;
  quantity: number;
  discount: number;
  totalCost: number;
}