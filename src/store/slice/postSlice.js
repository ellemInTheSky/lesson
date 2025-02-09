import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push({ id: Date.now(), ...action.payload, inputValue: "" });
    },
    removePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    editPost: (state, action) => {
      const { id, title, content } = action.payload;
      const post = state.posts.find((post) => post.id === id);
      if (post) {
        post.title = title;
        post.content = content;
      }
    },
    updateInputValue: (state, action) => {
      const { id, inputValue } = action.payload;
      const post = state.posts.find((post) => post.id === id);
      if (post) {
        post.inputValue = inputValue;
      }
    },
  },
});

export const { addPost, removePost, editPost, updateInputValue } =
  postsSlice.actions;
export default postsSlice.reducer;
