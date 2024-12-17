// src/utils/formValidator.ts
import * as Yup from "yup";

export const loginFormValidator = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});

export const brandFormValidator = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  name: Yup.string().required("Name is required"),
  field: Yup.string().required("Field is required"),
  address: Yup.string().required("Address is required"),
  lat: Yup.number()
    .required("Latitude is required")
    .typeError("Latitude must be a valid number"),
  lng: Yup.number()
    .required("Longitude is required")
    .typeError("Longitude must be a valid number"),
  status: Yup.string()
    .oneOf(["active", "inactive"], "Status must be either 'active' or 'inactive'")
    .required("Status is required"),
});
