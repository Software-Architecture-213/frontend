

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

    const actualContainerClassName = `my-2 bg-gray-300 px-20 py-6 max-w-[600px] rounded-2xl shadow ${containerClassName}`
    const actualTextClassName = `text-black ${textClassName}`

    return (
        <div className={actualContainerClassName}>
            <span className={actualTextClassName}>{message}</span>
        </div>
    )
}
