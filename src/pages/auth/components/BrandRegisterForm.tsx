import { useFormik } from "formik";
import { brandFormValidator } from "../../../utils/formValidator";
import { useNavigate } from "react-router-dom";
import { brandApi } from "../../../api/brandClient/brandApi";

const BrandRegisterForm = () => {
  const navigate = useNavigate();

  // Define handleInputChange function
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value); // Update Formik's field value
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      displayName: "",
      field: "",
      latitude: "",
      longitude: "",
      status: "INACTIVE",
    },
    validationSchema: brandFormValidator, // Define your validator in formValidator
    onSubmit: async (values) => {
      console.log("Form submitted with values: ", values);
      try {
        const gps = { latitude: parseFloat(values.latitude), longitude: parseFloat(values.longitude) };
        const response = await brandApi.register(
          values.username,
          values.password,
          values.displayName,
          values.field,
          gps,
          values.status
        );
        console.log("Registration Response: ", response);
        if (response.status == 201) {
          navigate("/login");
        }
      } catch (err) {
          navigate("/register");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      {/* Username Input */}
      <div>
        <input
          type="email"
          name="username"
          placeholder="Email"
          value={formik.values.username}
          onChange={handleInputChange}  // Call handleInputChange here
          onBlur={formik.handleBlur}
          className={`w-full p-3 text-black bg-white border rounded-md focus:outline-none focus:ring-2 ${
            formik.touched.username && formik.errors.username
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-f75f07"
          }`}
        />
        {formik.touched.username && formik.errors.username && (
          <p className="text-black text-sm mt-1">{formik.errors.username}</p>
        )}
      </div>

      {/* Password Input */}
      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={handleInputChange}  // Call handleInputChange here
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
          name="displayName"
          placeholder="Name"
          value={formik.values.displayName}
          onChange={handleInputChange}  // Call handleInputChange here
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
          onChange={handleInputChange}  // Call handleInputChange here
          onBlur={formik.handleBlur}
          className="w-full p-3 text-black bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-f75f07"
        />
      </div>

      {/* Latitude Input */}
      <div>
        <input
          type="text"
          name="latitude"
          placeholder="Latitude"
          value={formik.values.latitude}
          onChange={handleInputChange}  // Call handleInputChange here
          onBlur={formik.handleBlur}
          className="w-full p-3 text-black bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-f75f07"
        />
      </div>

      {/* Longitude Input */}
      <div>
        <input
          type="text"
          name="longitude"
          placeholder="Longitude"
          value={formik.values.longitude}
          onChange={handleInputChange}  // Call handleInputChange here
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
