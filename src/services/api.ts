import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ConnectionCheck, QueueEntry, Room, Song, User } from '../types';

const address = import.meta.env.VITE_SERVER_ADDRESS;

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `${address}/` }),
  endpoints: (builder) => ({
    checkConnection: builder.query<ConnectionCheck, void>({
      query: () => 'checkConnection',
    }),
    getRooms: builder.query<Room[], void>({
      query: () => 'listRooms',
    }),
    createRoom: builder.mutation<void, string>({
      query: (name: string) => ({
        url: 'addRoom',
        method: 'POST',
        body: { name: name },
      }),
    }),
    getUsers: builder.query<User[], void>({
      query: () => 'listUsers',
    }),
    createUser: builder.mutation<void, FormData>({
      query: (body) => ({
        url: 'addUser',
        method: 'POST',
        body,
      }),
    }),
    getSongsAlphabetically: builder.query<Song[], void>({
      query: () => 'listSongsAZ',
    }),
    getSongsAlphabeticallyByLatin: builder.query<Song[], void>({
      query: () => 'listSongsAZL',
    }),
    getSongsAlphabeticallyRev: builder.query<Song[], void>({
      query: () => 'listSongsZAL',
    }),
    getSongsAlphabeticallyByLatinRev: builder.query<Song[], void>({
      query: () => 'listSongsZAL',
    }),
    getQueueEntries: builder.query<QueueEntry[], number>({
      query: (roomId: number) => `listQueueEntries/${roomId}`,
    }),
  }),
});

export const {
  useCheckConnectionQuery,
  useGetRoomsQuery,
  useCreateRoomMutation,
  useGetUsersQuery,
  useCreateUserMutation,
  useGetSongsAlphabeticallyQuery,
  useGetSongsAlphabeticallyByLatinQuery,
  useGetSongsAlphabeticallyRevQuery,
  useGetSongsAlphabeticallyByLatinRevQuery,
  useGetQueueEntriesQuery,
} = api;
