import { ClipLoader } from "react-spinners";

export function Spinner() {
    return (
        <div className="items-center justify-center flex flex-col">
            <ClipLoader
                color="#f75f07"
                loading={true}
                size={70}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}