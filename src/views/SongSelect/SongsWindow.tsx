import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import SelectInput from "./components/SelectInput";
import { useGetSongsQuery } from "../../services/api";
import { Song, SortOption, SortOptionData } from "../../types";
import { sortData } from "../../utils/dataSortAndFilter";

const SongsWindow = () => {
    const sortOptions : SortOptionData[] = [
        {displayName: "Nazwa", value: "name", isLatin: false},
        {displayName: "Nazwa (alfabet łaciński)", value: "latinName", isLatin: true},
        {displayName: "Artysta", value: "artist", isLatin: false},
        {displayName: "Artysta (alfabet łaciński)", value: "latinArtist", isLatin: true},
        {displayName: "Rok wydania", value: "releaseYear", isLatin: false}
    ]
    const [sortOption, setSortOption] = useState<SortOptionData>(sortOptions[0]);

    // const filterOptions = [
    //     {displayName: "Wszystkie", value: "all"},
    //     {displayName: "Tylko z trybem rankingowym", value: "scoreModeOnly"},
    //     {displayName: "Tylko ulubione", value: "favouritesOnly"}
    // ]

    // const [filterOption, setFilterOption] = useState(filterOptions[0].value)

    const address = import.meta.env.VITE_SERVER_ADDRESS;

    const {
        data,
        isSuccess,
        isError,
        isLoading
      } = useGetSongsQuery();

    const [modData, setModData] = useState<Song[]>([]);

    useEffect(() => {
        if(!isSuccess || !data) return;
        setModData(sortData(data, sortOption.value));
    }, [sortOption, data, isSuccess])

    return (
        <div className="h-[calc(100vh-7rem)] overflow-y-hidden flex flex-col md:p-4 md:bg-gray-800 md:border md:border-gray-700 md:rounded-lg md:shadow lg:col-span-2">
            <div className="rounded-lg flex flex-col space-y-4 m-2 py-2 items-center md:space-y-0 md:justify-end md:m-0 md:flex-row md:space-x-6">
                {/* <SelectInput id="filter-select" mobileLabel="Pokaż" options={filterOptions} selectedOption={filterOption} setSelectedOption={setFilterOption} /> */}
                <SelectInput id="sort-select" mobileLabel="Sortuj" options={sortOptions} selectedOption={sortOption} setSelectedOption={setSortOption} />
            </div>
            <div className="md:grid md:grid-cols-2 overflow-y-auto max-h-[calc(100vh-10rem)]">
            {!!modData.length && modData.map((e) => (
                <Card cover={`${address}/getCoverImage/${e.id}`} key={e.id} name={sortOption.isLatin ? e.latinName : e.name} artist={sortOption.isLatin ? e.latinArtist : e.artist} />
            ))}
            </div>
        </div>
    )
}

export default SongsWindow;