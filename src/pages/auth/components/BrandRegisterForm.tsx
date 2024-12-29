import { useFormik } from "formik";
import { brandFormValidator } from "../../../utils/formValidator";
import { useNavigate } from "react-router-dom";
import { brandApi } from "../../../api/brandClient/brandApi";

const BrandRegisterForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      displayName: "",
      imageUrl: "",
      field: "",
      latitude: "",
      longitude: "",
      status: "INACTIVE",
    },
    validationSchema: brandFormValidator, // Define your validator in formValidator
    onSubmit: async (values) => {
      console.log("Form submitted with values: ", values);
      try {
        const gps = { lat: parseFloat(values.latitude), lng: parseFloat(values.longitude) };
        const response = await brandApi.register(
          values.email,
          values.password,
          values.displayName,
          values.imageUrl,
          values.field,
          gps,
          values.status
        );
        console.log("Registration Response: ", response);
        if (response.status == 201){
          navigate("/login");
        }
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

      {/* Display Name Input */}
      <div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formik.values.displayName}
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

      {/* Image URL Input */}
      <div>
        <input
          type="text"
          name="ImageURL"
          placeholder="Image URL"
          value={formik.values.imageUrl}
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
          value={formik.values.latitude}
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
          value={formik.values.longitude}
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
