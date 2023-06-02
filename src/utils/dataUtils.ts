import { Song, SongGroup, SongGroupMap, SortOption } from "../types"

export const sortData = (data : Song[], sortOption: SortOption, romanized: boolean) : Song[] => {
    let modData : Song[] = [...data];
    if (sortOption === "name" && !romanized) {
        return modData.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortOption === "name" && romanized) {
        return modData.sort((a, b) => a.latinName.localeCompare(b.latinName));
    }
    if (sortOption === "artist" && !romanized) {
        return sortData(data, "name", false).sort((a, b) => a.artist.localeCompare(b.artist));
    }
    if (sortOption === "artist" && romanized) {
        return sortData(data, "name", true).sort((a, b) => a.latinArtist.localeCompare(b.latinArtist));
    }
    if (sortOption === "releaseYear") {
        return sortData(data, "name", romanized).sort((a, b) => a.albumYear - b.albumYear);
    }
    return data;
}

const isNumeric = (str: string) => {
    return !Number.isNaN(Number(str));
}

export const groupData = (data: Song[], by: SortOption, romanized: boolean) : SongGroup[] => {
    const map : SongGroupMap = {};
    const sortedData = sortData(data, by, romanized);

    if (by=="name") {
        for (const song of sortedData) {
            const firstLetter = song[romanized ? "latinName" : "name"][0].toUpperCase();
            const groupId = isNumeric(firstLetter) ? "#" : firstLetter;
            map[groupId] ||= [];
            map[groupId].push(song);
        }
    }

    else if (by=="artist") {
        for (const song of sortedData) {
            const artist = song[romanized ? "latinArtist" : "artist"];
            map[artist] ||= [];
            map[artist].push(song);
        }
    }

    else if (by=="releaseYear") {
        for (const song of sortedData) {
            map[song.albumYear] ||= [];
            map[song.albumYear].push(song);
        }
    }

    return Object.entries(map).map(([key, value]) => {
      return { groupId: key, songs: value };
    });
}