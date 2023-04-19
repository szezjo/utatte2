import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface LoginState {
  roomId: number;
  userId: number;
  userName: string;
  multiUserDevice: boolean;
  loggedIn: boolean;
}

const initialState: LoginState = {
  roomId: -1,
  userId: -1,
  userName: '',
  multiUserDevice: false,
  loggedIn: false,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setRoomId: (state, action: PayloadAction<number>) => {
      state.roomId = action.payload;
    },
    setUser: (state, action: PayloadAction<{ id: number; name: string }>) => {
      state.userId = action.payload.id;
      state.userName = action.payload.name;
    },
    setMultiUserDeviceState: (state, action: PayloadAction<boolean>) => {
      state.multiUserDevice = action.payload;
    },
    setLoginState: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
    resetLoginData: (state) => {
      state.roomId = initialState.roomId;
      state.userId = initialState.userId;
      state.multiUserDevice = initialState.multiUserDevice;
      state.loggedIn = initialState.loggedIn;
    },
  },
});

export const { setRoomId, setUser, setMultiUserDeviceState, setLoginState, resetLoginData } = loginSlice.actions;
export default loginSlice.reducer;
