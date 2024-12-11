import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  responses: [],
};
const ResponsesSlice = createSlice({
  name: "responses",
  initialState,
  reducers: {
    setResponses: (state, action) => {
      state.responses = action.payload;
    },
    addResponses: (state, { payload: response }) => {
      state.responses = [...state.responses, response] as any;
    },
    deleteResponses: (state, { payload: responseId }) => {
      state.responses = state.responses.filter(
        (a: any) => a._id !== responseId
      );
    },
    updateResponses: (state, { payload: response }) => {
      state.responses = state.responses.map((a: any) =>
        a._id === response._id ? response : a
      ) as any;
    },
  },
});
export const { setResponses, addResponses, deleteResponses, updateResponses } =
  ResponsesSlice.actions;
export default ResponsesSlice.reducer;
