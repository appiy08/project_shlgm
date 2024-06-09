import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "lodash";
import {
  addAddressAPI,
  deleteAddressAPI,
  getAddressAPI,
  setDefaultAddressAPI,
} from "../../lib/actions/user";
// End Dependencies

export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (values) => {
    const response = await addAddressAPI(values);
    return response;
  }
);

export const getAddressData = createAsyncThunk(
  "address/getAddressData",
  async (userId) => {
    const response = await getAddressAPI(userId);
    return response;
  }
);

export const setDefaultAddress = createAsyncThunk(
  "address/setDefaultAddress",
  async (values) => {
    const response = await setDefaultAddressAPI(values);
    return response;
  }
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (values) => {
    const response = await deleteAddressAPI(values);
    return response;
  }
);

export const addressSlice = createSlice({
  name: "address",
  initialState: {
    data: [],
    status: "idle", // idle | loading | succeeded | failed
    message: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = get(action, "payload.data.data.addresses", []);
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getAddressData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAddressData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = get(action, "payload.data.data", []);
      })
      .addCase(getAddressData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(setDefaultAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setDefaultAddress.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = get(action, "payload.data.message", "");
      })
      .addCase(setDefaultAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default addressSlice.reducer;
