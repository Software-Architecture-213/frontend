import BrandRegisterForm from './components/BrandRegisterForm';
// import AdminRegisterForm from './components/AdminRegisterForm';
// import BrandRegisterForm from './components/BrandRegisterForm';

const RegisterPage = () => {

  return (
    <div className="flex justify-center items-center min-h-screen main-bg-gradient">
      {/* Form Container */}
      <div className="main-bg bg-white shadow-2xl rounded-lg p-6 w-full max-w-lg">
        <BrandRegisterForm/>
        
        {/* Divider */}
        <div className="mt-6 border-t pt-4 text-center text-gray-700">
            <p> Already have an account?{' '}
                <a
                href="/login"
                className="text-gray-50 font-medium"
                >
                    Login here
                </a>
            </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
