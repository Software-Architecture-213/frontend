import React from 'react'

interface BaseBlockProps {
    children: React.ReactNode
    className?: string
}

export function BaseBlock(props: BaseBlockProps) {
    const { children, className } = props

    const actualClassName = className ? `bg-white shadow-xl rounded-lg p-5 w-full space-y-3 ${className}` : 'bg-white shadow-xl rounded-lg p-5 w-full space-y-3'

    return (
        <div className={actualClassName}>
            {children}
        </div>
    )
}
