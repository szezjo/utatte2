import React, { useEffect, useRef, useState } from "react";

type SelectInputProps = {
  id: string,
  options: {displayName: string, value: string}[],
  selectedOption: string,
  setSelectedOption: (option: string) => void,
}

const SelectInput = ({id, options, selectedOption, setSelectedOption} : SelectInputProps) => {
    return (
      <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} id={id} className="block py-2.5 px-0 text-sm bg-transparent md:bg-gray-800 text-white">
        {options.map((e) => (
          <option value={e.value} key={e.value}>{e.displayName}</option>
        ))}
      </select>
    )
}

export default SelectInput;