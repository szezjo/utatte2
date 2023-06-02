import { Song, SortOption } from "../types"

export const sortData = (data : Song[], sortOption: SortOption) => {
    let modData : Song[] = [...data];
    if (sortOption === "name") {
        return modData.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortOption === "latinName") {
        return modData.sort((a, b) => a.latinName.localeCompare(b.latinName));
    }
    if (sortOption === "artist") {
        return modData.sort((a, b) => a.artist.localeCompare(b.artist));
    }
    if (sortOption === "latinArtist") {
        return modData.sort((a, b) => a.latinArtist.localeCompare(b.latinArtist));
    }
    if (sortOption === "releaseYear") {
        return modData.sort((a, b) => a.albumYear - b.albumYear);
    }
    return data;
}