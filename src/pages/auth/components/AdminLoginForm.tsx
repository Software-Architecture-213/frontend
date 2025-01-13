// AdminLoginForm.tsx
import { useFormik } from "formik";
import { loginFormValidator } from "../../../utils/formValidator";
import { identityAuthApi } from "../../../api/identityClient/identityAuthApi";
import { setAccessToken, setRefreshToken } from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/AuthContext";
import Cookies from 'universal-cookie';
import { useState } from "react";
import Loading from "../../../components/Loading";
import { toast, ToastContainer } from "react-toastify";


const AdminLoginForm = () => {
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const authContext = useAuth()
  const navigate = useNavigate(); // Initialize navigate
  // Formik hook with imported validation schema
  const formik = useFormik({
    initialValues: {
      email: "admin@gmail.com",
      password: "123456",
    },
    validationSchema: loginFormValidator, // Use the imported schema
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        const response = await identityAuthApi.login(values.email, values.password)
        const data = await response.data
        if (!data.accessToken) {
          alert("Internal server error, please retry again");
          return;
        }
        setAccessToken(data.accessToken)
        if (!data.refreshToken) {
          alert("Internal server error, please retry again");
          return;
        }
        setRefreshToken(data.refreshToken)
        const cookies = new Cookies({}, { path: '/' })
        cookies.set("accessToken", data.accessToken)
        cookies.set("refreshToken", data.refreshToken)
        authContext.fetchProfile()
        navigate("/admin");  // Redirect user to the /admin page
      } catch (error: any) {
        // alert(err.response.data.message); 
        toast.error(`${error.response?.data?.message || "An unknown error occurred."}`)

      } finally {
        setIsLoading(false)
      }
    },
  });

  return (<>

    <ToastContainer limit={1} autoClose={2000} />

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
          className={`w-full p-3 text-black bg-white border rounded-md focus:outline-none focus:ring-2 ${formik.touched.email && formik.errors.email
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-f75f07"
            }`}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-black font-bold text-left text-sm mt-1">{formik.errors.email}</p>
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
          className={`w-full p-3 text-black bg-white border rounded-md focus:outline-none focus:ring-2 ${formik.touched.password && formik.errors.password
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-f75f07"
            }`}
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-black font-bold text-left text-sm mt-1">{formik.errors.password}</p>
        )}
      </div>
      <button
        type="submit"
        className={`w-full py-3 main-text bg-white  bg-f75f07 text-white rounded-md hover:bg-f75f07/90 focus:outline-none ${isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        disabled={isLoading} // Disable button when loading
      >
        {isLoading ? "Logging in..." : "Login as Admin"}
      </button>
    </form>
  </>
  );
};

export default AdminLoginForm;