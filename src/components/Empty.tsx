

interface IEmptyProps {
    message?: string;
    containerClassName?: string;
    textClassName?: string;
}

export function Empty(props: IEmptyProps) {
    const {
        message = 'Currently, there is no data to display.',
        containerClassName = '',
        textClassName = '',
    } = props

    const actualContainerClassName = `py-6 ${containerClassName}`
    const actualTextClassName = `bg-gray-300 px-20 py-6 max-w-[600px] rounded-2xl  text-black ${textClassName}`

    return (
        <div className={actualContainerClassName}>
            <span className={actualTextClassName}>{message}</span>
        </div>
    )
}
