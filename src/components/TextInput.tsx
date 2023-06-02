import React from "react";

type TextInputProps = {
    id: string,
    value: string,
    setValue: (val: string) => void,
    label?: string | null,
    required?: boolean,
}

const TextInput = ({id, label, value, setValue, required} : TextInputProps) => (
    <>
        {label && <label htmlFor={id} className="block mb-2 text-sm font-medium text-white">
            {label}
        </label>}
        <input
            type="text"
            id={id}
            className="text-sm rounded-lg block w-full p-2.5 border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            required={required}
        ></input>
    </>
)

export default TextInput;