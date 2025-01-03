import classnames from "classnames";

interface IToggle {
  checked: boolean;
  onClick: any;
}

function Toggle({ checked = false, onClick }: IToggle) {
  return (
    <div
      onClick={onClick}
      className={classnames(
        { "main-bg": checked },
        { "bg-gray-300": !checked },
        "w-14 h-6 flex items-center rounded-full px-1 cursor-pointer"
      )}
    >
      <div
        className={classnames(
          { "translate-x-7": checked },
          { "translate-x-0": !checked },
          "bg-white w-5 h-5 rounded-full shadow-md transform transition-transform"
        )}
      />
    </div>
  );
}

export default Toggle;
