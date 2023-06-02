import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { SortOption, SortOptionData } from "../../../types";

type SelectInputProps = {
  id: string,
  mobileLabel: string,
  options: SortOptionData[],
  selectedOption: SortOptionData,
  setSelectedOption: (option: SortOptionData) => void,
}

const SelectInput = ({id, mobileLabel, options, selectedOption, setSelectedOption} : SelectInputProps) => {
  const [selectorWidth, setSelectorWidth] = useState({width: 0});
  const [selectedOptionText, setSelectedOptionText] = useState(options[0].displayName);
  const tempSelectorRef = useRef<HTMLSelectElement>(null);
  const [displayTempElement, setDisplayTempElement] = useState(true);

  const setOption = (option: SortOption) => {
    const optionData = options.find((e) => e.value===option);
    setSelectedOption(optionData ? optionData : options[0]);
    setSelectedOptionText(optionData ? optionData.displayName : "");
  }

  useLayoutEffect(() => {
    if (tempSelectorRef && tempSelectorRef.current) {
      if (displayTempElement) setSelectorWidth({width: tempSelectorRef.current.offsetWidth});
      setDisplayTempElement(false);
    } 
  }, [tempSelectorRef.current, displayTempElement])

  useEffect(() => {
    setDisplayTempElement(true);
  }, [selectedOption])

    return (
      <div className="flex py-2.5 bg-gray-700 w-full rounded-lg justify-center md:justify-normal md:w-fit md:bg-transparent">
        <span className="text-sm text-white font-bold md:hidden">{mobileLabel}:</span>
        <select value={selectedOption.value} onChange={(e) => setOption(e.target.value as SortOption)} id={id} className={`block outline-none px-0 text-sm bg-gray-700 md:bg-gray-800 text-white`} style={selectorWidth}>
          {options.map((e) => (
            <option value={e.value} key={e.value}>{e.displayName}</option>
          ))}
        </select>
        <select id="width_tmp_select" style={{display: displayTempElement ? 'block' : 'none'}} ref={tempSelectorRef}>
          <option id="width_tmp_option">{selectedOptionText}</option>
        </select>
      </div>
    )
}

export default SelectInput;