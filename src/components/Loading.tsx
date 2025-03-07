
const Loading = ({ message = "Loading..." }) => {
  return (
    <button className="ml-2 px-4 py-2 main-bg text-sm text-white cursor bg-blue-600 rounded hover:bg-blue-500">
      <svg
        className="w-5 h-5 mr-3 text-white animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      <span>{message}</span>
    </button>
  );
};

export default Loading;
