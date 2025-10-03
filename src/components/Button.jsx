import React from 'react'

function Button(
    {
        label,
        onClick,
        className="",
        ...props    
    },ref
) {
    const id = React.useId();
    return (
        <button
            onClick={onClick}
            id={id}
            ref={ref}
            className={`mt-4 py-3 px-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold focus:outline-none ${className}`}
            {...props}
        >
            {label}
        </button>     
    )
}

export default React.forwardRef(Button)
