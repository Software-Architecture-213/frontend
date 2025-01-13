import Select from 'react-select';

export interface ISelectItem {
    value: string;
    label: string;
}

interface ISelectProps {
    options: ISelectItem[];
    value: ISelectItem | null;
    onChange: (selectedOption: ISelectItem | null) => void;
    placeholder?: string;
    title?: string;
}

export function CustomSelect(props: ISelectProps) {
    const {
        options,
        value,
        onChange,
        placeholder = 'Select an option',
        title,
    } = props;
    return (
        <div className='flex flex-col w-56'>
            {title && <label className='text-base font-bold text-left text-black'>{title}</label>}
            <Select
                defaultValue={value}
                onChange={(selectedOption) => onChange(selectedOption as ISelectItem | null)}
                options={options}
                placeholder={placeholder}
                className='text-black'
            />
        </div>

    )
}