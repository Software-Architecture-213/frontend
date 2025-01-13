interface TitleProps {
    text: string
}

export function Title(props: TitleProps) {
    const { text } = props
    return (
        <h1 className='font-bold text-[#f75f07]'>{text}</h1>
    )
}
