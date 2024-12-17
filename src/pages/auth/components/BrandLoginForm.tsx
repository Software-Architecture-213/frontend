import { useFormik } from "formik";
import { loginFormValidator } from "../../../utils/formValidator";
import { identityAuthApi } from "../../../api/identityClient/identityAuthApi";
import { setAccessToken, setRefreshToken } from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/AuthContext";
import Cookies from 'universal-cookie';
import { brandApi } from "../../../api/brandClient/brandAuthApi";


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
        const responseIdentity = await identityAuthApi.login(values.email, values.password)
        console.log("Response when login as brand with identity ", responseIdentity)
        const dataIdentity = await responseIdentity.data
        var accessToken;
        var refreshToken;
        if (!dataIdentity.accessToken) {
          const responseBrand = await brandApi.login(values.email, values.password)
          console.log("Response when login as brand with brand ", responseBrand)
          const dataBrand = await responseBrand.data;
          if (!dataBrand.accessToken){
            alert("Internal server error, please retry again"); 
            return;
          }
          accessToken = dataBrand.accessToken
          if (!dataBrand.refreshToken){
            alert("Internal server error, please retry again"); 
            return;
          }
          refreshToken = dataBrand.refreshToken
        }
        accessToken = dataIdentity.accessToken
        if(!dataIdentity.refreshToken){
          alert("Internal server error, please retry again"); 
          return;
        }
        refreshToken = dataIdentity.refreshToken
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        const cookies = new Cookies({}, {path : '/'})
        cookies.set("accessToken", accessToken)
        cookies.set("refreshToken", refreshToken)
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