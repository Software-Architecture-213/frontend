import { useFormik } from "formik";
import { brandFormValidator } from "../../../utils/formValidator";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/AuthContext";
import Cookies from "universal-cookie";
import { brandApi } from "../../../api/brandClient/brandAuthApi";

const BrandRegisterForm = () => {
  const navigate = useNavigate();
  const authContext = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      field: "",
      address: "",
      lat: "",
      lng: "",
      status: "active",
    },
    validationSchema: brandFormValidator, // Define your validator in formValidator
    onSubmit: async (values) => {
      console.log("Form submitted with values: ", values);
      try {
        const gps = { lat: parseFloat(values.lat), lng: parseFloat(values.lng) };
        const response = await brandApi.register(
          values.email,
          values.password,
          values.name,
          values.field,
          values.address,
          gps,
          values.status
        );
        console.log("Registration Response: ", response);

        const data = response.data;
        const accessToken = data.accessToken;
        const refreshToken = data.refreshToken;

        if (!accessToken || !refreshToken) {
          alert("Error during registration. Please try again.");
          return;
        }

        // Store tokens
        const cookies = new Cookies({}, { path: "/" });
        cookies.set("accessToken", accessToken);
        cookies.set("refreshToken", refreshToken);

        authContext.fetchProfile();
        navigate("/brand");
      } catch (err: any) {
        console.error("Error: ", err.response?.data?.message || "Registration failed");
        alert(err.response?.data?.message || "Registration failed");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      {/* Email Input */}
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full p-3 text-black bg-white border rounded-md focus:outline-none focus:ring-2 ${
            formik.touched.email && formik.errors.email
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-f75f07"
          }`}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-black text-sm mt-1">{formik.errors.email}</p>
        )}
      </div>

      {/* Password Input */}
      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full p-3 text-black bg-white border rounded-md focus:outline-none focus:ring-2 ${
            formik.touched.password && formik.errors.password
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-f75f07"
          }`}
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-black text-sm mt-1">{formik.errors.password}</p>
        )}
      </div>

      {/* Name Input */}
      <div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full p-3 text-black bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-f75f07"
        />
      </div>

      {/* Field Input */}
      <div>
        <input
          type="text"
          name="field"
          placeholder="Field"
          value={formik.values.field}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full p-3 text-black bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-f75f07"
        />
      </div>

      {/* Address Input */}
      <div>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full p-3 text-black bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-f75f07"
        />
      </div>

      {/* Latitude Input */}
      <div>
        <input
          type="text"
          name="lat"
          placeholder="Latitude"
          value={formik.values.lat}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full p-3 text-black bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-f75f07"
        />
      </div>

      {/* Longitude Input */}
      <div>
        <input
          type="text"
          name="lng"
          placeholder="Longitude"
          value={formik.values.lng}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full p-3 text-black bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-f75f07"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 main-text bg-f75f07 text-white rounded-md hover:bg-f75f07/90 focus:outline-none"
      >
        Register as Brand
      </button>
    </form>
  );
};

export default BrandRegisterForm;
