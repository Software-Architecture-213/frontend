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
  username: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  displayName: Yup.string().required("Name is required"),
  field: Yup.string().required("Field is required"),
  // latitude: Yup.number()
  //   .min(-90, "Latitude must be between -90 and 90")
  //   .max(90, "Latitude must be between -90 and 90")
  //   .required("Latitude is required"),
  // longitude: Yup.number()
  //   .min(-180, "Longitude must be between -180 and 180")
  //   .max(180, "Longitude must be between -180 and 180")
  //   .required("Longitude is required"),
});

export const updateBrandValidator = Yup.object({
  username: Yup.string()
    .email("Invalid email format"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long"),
  displayName: Yup.string().required("Name is required"),
  field: Yup.string().required("Field is required"),
  latitude: Yup.number()
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90"),
  longitude: Yup.number()
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180"),
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

export const updateBrandProfileValidator = Yup.object({
  displayName: Yup.string()
    .min(3, "Display Name must be at least 3 characters long")
    .required("Display Name is required"),
  field: Yup.string()
    .min(2, "Field must be at least 2 characters long")
    .required("Field is required"),
  mainBranch: Yup.object().shape({
    latitude: Yup.number()
      .min(-90, "Latitude must be between -90 and 90")
      .max(90, "Latitude must be between -90 and 90")
      .required("Latitude is required"),
    longitude: Yup.number()
      .min(-180, "Longitude must be between -180 and 180")
      .max(180, "Longitude must be between -180 and 180")
      .required("Longitude is required"),
  }),
  status: Yup.string()
    .oneOf(["ACTIVE", "INACTIVE"], "Invalid status")
    .required("Status is required"),
});

export const createUserProfileValidator = Yup.object({
  displayName: Yup.string()
    .min(3, "Display Name must be at least 3 characters long")
    .required("Display Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6)
    .required("Password length must be at least 6 characters long"),
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


export const updateGameValidator = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters long")
    .required("Name is required"),
  description: Yup.string()
    .max(500, "Description cannot exceed 500 characters")
    .required("Description is required"),
  type: Yup.string()
    .oneOf(["puzzle", "shake"], "Game type: puzzle, shake")
    .required("Type is required"),
  difficulty: Yup.string()
    .oneOf(["easy", "medium", "hard"], "Difficulty: easy, medium, hard")
    .required("Difficulty is required"),
});