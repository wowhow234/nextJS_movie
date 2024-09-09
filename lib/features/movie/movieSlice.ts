import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
type List = {
  id: string;
  title: string;
  wdate: string;
  review: string;
  posterPath: string;
  completed: boolean;
};
type MovieSlice = {
  list: List[];
};

// Define the initial state using that type
const initialState: MovieSlice = {
  list: [],
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<any, string>) => {
      state.list.push(action.payload);
      console.log("addNote action.payload : ", action.payload);
      console.log("addNote state", state);
      // prepare: (id: string) => {
      //   return {
      //     payload: {
      //       id,
      //     },
      //   };
    },
    updateNote: (
      state,
      action: PayloadAction<{
        id: string;
        title: string;
        wdate: string;
        review: string;
      }>
    ) => {
      const findnote = state.list.find((item) => item.id === action.payload.id);
      // console.log("findnote.....", findnote);
      console.log("update payload-----", action.payload);
      if (findnote) {
        findnote.title = action.payload.title;
        findnote.wdate = action.payload.wdate;
        findnote.review = action.payload.review;
        findnote.completed = !findnote.completed;
      }
    },

    deleteNote: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((note) => note.id !== action.payload);
      // action.payload 는 dispatch()해서 받아온 id 이다.
    },
  },
});

// action 사용하기 위해 Slice 에서 action 추출
export const { addNote, deleteNote, updateNote } = movieSlice.actions;

// reducer 사용
export default movieSlice.reducer;
