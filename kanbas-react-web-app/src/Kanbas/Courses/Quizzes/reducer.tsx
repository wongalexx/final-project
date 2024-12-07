import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  quizzes: [],
};
const QuizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuizzes: (state, { payload: quiz }) => {
      state.quizzes = [...state.quizzes, quiz] as any;
    },
    deleteQuizzes: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter((a: any) => a._id !== quizId);
    },
    updateQuizzes: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((a: any) =>
        a._id === quiz._id ? quiz : a
      ) as any;
    },
  },
});
export const { setQuizzes, addQuizzes, deleteQuizzes, updateQuizzes } =
  QuizzesSlice.actions;
export default QuizzesSlice.reducer;
