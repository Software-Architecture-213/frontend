import { APP_LOGO } from "../constants/app";

const AppLogo = () => {
    return (
        <div className="flex justify-center mb-4">
            <div className="p-2 border-4 border-orange-500 bg-white rounded-full shadow-md transition-transform duration-300 hover:scale-110 hover:shadow-lg">
                <img
                    src={APP_LOGO}
                    alt="Admin Icon"
                    className="w-16 h-16"
                />
            </div>
        </div>
    );
};

export default AppLogo;
