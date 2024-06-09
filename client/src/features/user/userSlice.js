import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "lodash";
import {
  deleteUserAPI,
  getUserDataAPI,
  updateUserDataAPI,
} from "../../lib/actions/user";
// End Dependencies

export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (userId) => {
    const response = await getUserDataAPI(userId);
    return response;
  }
);

export const updateUserData = createAsyncThunk(
  "user/updateUserData",
  async (values) => {
    const response = await updateUserDataAPI(values);
    return response;
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (values) => {
    const response = await deleteUserAPI(values);
    return response;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
    status: "idle", // idle | loading | succeeded | failed
    message: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = get(action, "payload.data.data", []);
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = get(action, "payload.data.data", {});
        state.message = get(action, "payload.data.message", "");
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = get(action, "payload.data.message", "");
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
