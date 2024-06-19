//Create a slice
//Create reducers
//export the reducer and export reducer

const { createSlice } = require("@reduxjs/toolkit");
const initialState = {
  currentStep: 1,
  checkoutFormData: {},
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    updateCheckoutFormData: (state, action) => {
      state.checkoutFormData = {
        ...state.checkoutFormData,
        ...action.payload,
      };
    },
  },
});
export const { setCurrentStep, updateCheckoutFormData } = checkoutSlice.actions;
export default checkoutSlice.reducer;
