
interface InputProps {
    type?: string
    placeholder?: string
    value: string
    onChange: (text: string) => void
}

export function Input(props: InputProps) {
    const {
        type = 'text',
        placeholder,
        value,
        onChange
    } = props

    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-64 p-2 bg-white border border-slate-300 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-200"
        />
    )
}
