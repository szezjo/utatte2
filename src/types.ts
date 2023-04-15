export type ConnectionCheck = {
  connected: boolean;
};

export type Room = {
  id: number;
  name: string;
};

export type User = {
  id: number;
  name: string;
  profilePicture: string;
};

export type Song = {
  id: number;
  name: string;
  latinName: string;
  artist: string;
  latinArtist: string;
  album: string;
  latinAlbum: string;
  genre: string;
  lang: string;
  albumYear: number;
  duration: number;
  previewStart: number;
  previewEnd: number;
  scoreModeIncluded: boolean;
  instrumentalIncluded: boolean;
}

export type QueueEntry = {
  id: number;
  songId: number;
  userId: number;
  roomId: number;
}

export type UserWithProfilePicture = User & { profilePictureBlob: string };
