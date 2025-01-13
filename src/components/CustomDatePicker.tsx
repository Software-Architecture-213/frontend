import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface ICustomDatePickerProps {
  value: Date | null;
  title: string | null;
  placeholder: string | null;
  onChange: (date: Date | null) => void;
  minDate: Date | null;
  maxDate: Date | null;
}

export function CustomDatePicker(props: ICustomDatePickerProps) {
  const { value, title, placeholder, onChange, minDate, maxDate } = props;
  return (
    <div className='flex flex-col'>
      {title && <label className='text-base font-bold text-left text-black'>{title}</label>}
      <DatePicker
        selected={value}
        onChange={(date) => onChange(date)}
        showIcon
        dateFormat={'yyyy-MM-dd'}
        className='bg-white text-black border-gray-300 border rounded-md items-center w-40'
        placeholderText={placeholder ?? ''}
        minDate={minDate ?? undefined}
        maxDate={maxDate ?? undefined}
      />
    </div>

  )
}
