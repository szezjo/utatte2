import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import SelectInput from "./components/SelectInput";
import { useGetSongsQuery } from "../../services/api";
import { Song, SongGroup, SortOption, SortOptionData } from "../../types";
import { groupData, sortData } from "../../utils/dataUtils";
import { useAppSelector } from "../../hooks";

const SongsWindow = () => {
    const sortOptions : SortOptionData[] = [
        {displayName: "Nazwa", value: "name"},
        {displayName: "Artysta", value: "artist"},
        {displayName: "Rok wydania", value: "releaseYear"}
    ]
    const [sortOption, setSortOption] = useState<SortOptionData>(sortOptions[0]);
    const displayRomanizedTitles = useAppSelector((state) => state.settings.displayRomanizedTitles);

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

    const [songGroups, setSongGroups] = useState<SongGroup[]>([]);

    useEffect(() => {
        if(!isSuccess || !data) return;
        setSongGroups(groupData(data, sortOption.value, displayRomanizedTitles));
    }, [sortOption, data, isSuccess])

    useEffect(() => {
        console.log(songGroups);
    }, [songGroups])

    return (
        <div className="h-[calc(100vh-7rem)] overflow-y-hidden flex flex-col md:p-4 md:bg-gray-800 md:border md:border-gray-700 md:rounded-lg md:shadow lg:col-span-2">
            <div className="rounded-lg flex flex-col space-y-4 m-2 py-2 items-center md:space-y-0 md:justify-end md:m-0 md:flex-row md:space-x-6">
                {/* <SelectInput id="filter-select" mobileLabel="Pokaż" options={filterOptions} selectedOption={filterOption} setSelectedOption={setFilterOption} /> */}
                <SelectInput id="sort-select" mobileLabel="Sortuj" options={sortOptions} selectedOption={sortOption} setSelectedOption={setSortOption} />
            </div>
            <div className="overflow-y-auto max-h-[calc(100vh-10rem)]">
            {!!songGroups.length && songGroups.map((group) => {
                return (
                    <div key={`mainDiv-${group.groupId}`}><h1 className="text-xl text-white px-2 md:px-0" key={`header-${group.groupId}`}>{group.groupId}</h1>
                    <div className="md:grid md:grid-cols-2" key={`grid-${group.groupId}`}>
                        {group.songs.map((song) => (
                            <Card cover={`${address}/getCoverImage/${song.id}`} key={song.id} name={displayRomanizedTitles ? song.latinName : song.name} artist={displayRomanizedTitles ? song.latinArtist : song.artist} />
                        ))}
                    </div></div>
                )
            })}
            </div>
        </div>
    )
}

export default SongsWindow;