import React, { useState } from "react";
import Card from "./Card";
import SelectInput from "./SelectInput";
import { useGetSongsAlphabeticallyQuery } from "../../services/api";

const SongsWindow = () => {
    const sortOptions = [
        {displayName: "Od A do Z", value: "from-a-to-z"},
        {displayName: "Od Z do A", value: "from-z-to-a"}
    ]
    const [sortOption, setSortOption] = useState(sortOptions[0].value);

    const filterOptions = [
        {displayName: "Wszystkie", value: "all"},
        {displayName: "Tylko z trybem rankingowym", value: "scoreModeOnly"},
        {displayName: "Tylko ulubione", value: "favouritesOnly"}
    ]

    const [filterOption, setFilterOption] = useState(filterOptions[0].value)

    const address = import.meta.env.VITE_SERVER_ADDRESS;

    const {
        data,
        isSuccess,
        isError,
        isLoading
      } = useGetSongsAlphabeticallyQuery();

    return (
        <div className="h-[calc(100vh-7rem)] overflow-y-hidden flex flex-col md:p-4 md:bg-gray-800 md:border md:border-gray-700 md:rounded-lg md:shadow lg:col-span-2">
            <div className="rounded-lg flex flex-col space-y-4 m-2 py-2 items-center md:space-y-0 md:justify-end md:m-0 md:flex-row md:space-x-6">
                <SelectInput id="filter-select" mobileLabel="Pokaż" options={filterOptions} selectedOption={filterOption} setSelectedOption={setFilterOption} />
                <SelectInput id="sort-select" mobileLabel="Sortuj" options={sortOptions} selectedOption={sortOption} setSelectedOption={setSortOption} />
            </div>
            <div className="md:grid md:grid-cols-2 overflow-y-auto max-h-[calc(100vh-10rem)]">
            {isSuccess && data.map((e) => (
                <Card cover={`${address}/getCoverImage/${e.id}`} key={e.id} name={e.name} artist={e.artist} />
            ))}
            </div>
        </div>
    )
}

export default SongsWindow;