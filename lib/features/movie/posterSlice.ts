import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PosterPath {
  id: string;
  posterPath: string;
}

const initialState: PosterPath = {
  id: "", // 초기 id값
  posterPath: "", // 초기 posterPath값
};

const posterSlice = createSlice({
  name: "poster",
  initialState,
  reducers: {
    setPosterPath: (
      state,
      action: PayloadAction<{ id: string; posterPath: string }>
    ) => {
      state.id = action.payload.id;
      state.posterPath = action.payload.posterPath;
      console.log("posterPath reducer action.payload-----", action.payload);
      console.log("updated posterPath", state.posterPath);
    },
  },
});

// actoin 사용하기 위해 slice 에서 action 추출
export const { setPosterPath } = posterSlice.actions;

// reducer 사용
export default posterSlice.reducer;
