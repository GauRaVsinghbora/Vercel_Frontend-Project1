import React from 'react'

function Select({
    label,
    options=[],
    className="",
    ...props
},ref) {
    const id = React.useId();

    return (
        <div className="flex flex-col mt-2">
            {
                label && <label htmlFor={id} className="hidden">{label}</label>
            }
            <select
                id={id}
                ref={ref}
                className={`w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none ${className}`}
                {...props}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>

    )
}

export default React.forwardRef(Select)
