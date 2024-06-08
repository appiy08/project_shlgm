import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "lodash";
import { addAddressAPI, getAddressAPI } from "../../lib/actions/address";
// End Dependencies

export const addAddress = createAsyncThunk("address/addAddress", async (values) => {
  const response = await addAddressAPI(values);
  return response;
});

export const getAddressData = createAsyncThunk(
  "address/getAddressData",
  async (userId) => {
    const response = await getAddressAPI(userId);
    return response;
  }
);

export const cartSlice = createSlice({
  name: "address",
  initialState: {
    data: [],
    status: "idle", // idle | loading | succeeded | failed
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
        state.data.push(...get(action, "payload.data.data.addresses", []));
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
        state.data = get(action, "payload.data.data.addresses", []);
      })
      .addCase(getAddressData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;
