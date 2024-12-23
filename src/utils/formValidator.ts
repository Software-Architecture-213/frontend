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


export const updateUserProfileValidator = Yup.object({
  displayName: Yup.string()
    .min(3, "Display Name must be at least 3 characters long")
    .required("Display Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .matches(
      /^\+[1-9][0-9]{9,14}$/,
      "Phone number must be between 10 to 15 digits"
    )
    .required("Phone Number is required"),
  dateOfBirth: Yup.string()
    .matches(
      /^\d{4}-\d{2}-\d{2}$/, // Regex to check for YYYY-MM-DD format
      "Date of Birth must be in YYYY-MM-DD format"
    )
    .test(
      "is-valid-date",
      "Date of Birth is invalid",
      (value) => !value || !isNaN(Date.parse(value)) // Check if the date is valid
    )
    .required("Date of Birth is required"),
  gender: Yup.string()
    .oneOf(["MALE", "FEMALE"], "Invalid gender")
    .required("Gender is required"),
});
