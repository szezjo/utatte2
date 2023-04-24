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

    const address = import.meta.env.VITE_SERVER_ADDRESS;

    const {
        data,
        isSuccess,
        isError,
        isLoading
      } = useGetSongsAlphabeticallyQuery();

    return (
        <div className="h-[calc(100vh-7rem)] overflow-y-hidden flex flex-col md:p-4 md:bg-gray-800 md:border md:border-gray-700 md:rounded-lg md:shadow lg:col-span-2">
            <div className="rounded-lg flex m-2 bg-gray-700 md:bg-gray-800 justify-center md:justify-end md:m-0">
                <SelectInput id="sort-select" options={sortOptions} selectedOption={sortOption} setSelectedOption={setSortOption} />
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