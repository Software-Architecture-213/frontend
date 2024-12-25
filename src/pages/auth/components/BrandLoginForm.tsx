import { useFormik } from "formik";
import { loginFormValidator } from "../../../utils/formValidator";
import { setAccessToken, setRefreshToken } from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/AuthContext";
import Cookies from 'universal-cookie';
import { brandApi } from "../../../api/brandClient/brandApi";


const BrandLoginForm = () => {
  const authContext = useAuth();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginFormValidator,
    onSubmit: async (values) => {
      console.log("Form submitted with values: ", values);
      try {
        const response = await brandApi.login(values.email, values.password)
        console.log("Response when login as brand with identity ", response)
        const data = await response.data
        if (!data.accessToken) {
          alert("Internal server error, please retry again"); 
          return;
        }
        setAccessToken(data.accessToken);
        if (!data.refreshToken){
          alert("Internal server error, please retry again"); 
          return;
        }
        setRefreshToken(data.refreshToken);
        const cookies = new Cookies({}, {path : '/'})
        cookies.set("accessToken", data.accessToken)
        cookies.set("refreshToken", data.refreshToken)
        authContext.fetchProfile();
        navigate("/brand");
      } catch (err: any){
        alert(err.response.data.message);
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

      {/* Submit Button */}
      <button className="w-full py-3 main-text bg-white  bg-f75f07 text-white rounded-md hover:bg-f75f07/90 focus:outline-none">
          Login as Brand
        </button>
    </form>
  );
};
export default BrandLoginForm