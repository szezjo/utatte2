import React, { useEffect } from 'react';
import { useGetQueueEntriesQuery, useGetSongsQuery } from '../../services/api';
import { useAppSelector } from '../../hooks';

const SongSelect = () => {
  const roomId = useAppSelector((state) => state.login.roomId);
  const {
    data: songs,
    isSuccess: songsIsSuccess,
    isError: songsIsError,
    isLoading: songsIsLoading,
  } = useGetSongsQuery();
  const {
    data: queueEntries,
    isSuccess: queueIsSuccess,
    isError: queueIsError,
    isLoading: queueIsLoading,
  } = useGetQueueEntriesQuery(roomId);

  useEffect(() => {
    if (songsIsSuccess && queueIsSuccess) {
      console.log(songs);
      console.log(queueEntries);
    }
  }, [songsIsSuccess, queueIsSuccess]);

  return <></>;
};

export default SongSelect;
