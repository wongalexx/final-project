import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  questions: [],
};
const QuestionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    addQuestions: (state, { payload: question }) => {
      state.questions = [...state.questions, question] as any;
    },
    deleteQuestions: (state, { payload: questionId }) => {
      state.questions = state.questions.filter(
        (q: any) => q._id !== questionId
      );
    },
    updateQuestions: (state, { payload: question }) => {
      state.questions = state.questions.map((q: any) =>
        q._id === question._id ? question : q
      ) as any;
    },
  },
});
export const { setQuestions, addQuestions, deleteQuestions, updateQuestions } =
  QuestionsSlice.actions;
export default QuestionsSlice.reducer;
