import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personal: {
    name: "",
    fathersName: "",
    gender: "",
    category: "",
    dateOfBirth: "",
    jeeRollNo: "",
    jeeRank: "",
    phone: "",
    fathersPhone: "",
    emailId: "",
  },
  address: {
    permanent: {
      address: "",
      state: "",
      district: "",
      pin: "",
    },
    current: {
      address: "",
      state: "",
      district: "",
      pin: "",
    },
  },
  education: {
    class10: {
      school: "",
      board: "",
      percentage: "",
      totalMarks: "",
    },
    class12: {
      school: "",
      board: "",
      percentage: "",
      pcmPercentage: "",
      physicsMarks: "",
      chemistryMarks: "",
      mathsMarks: "",
      subject4: "",
      subject4Marks: "",
      subject5: "",
      subject5Marks: "",
    },
  },
  photoSign: {
    photo: null,
    signature: null,
  },
  documents: {
    tenthMarksheet: {
      name: "",
      size: null,
      type: "",
      lastModified: null,
    },
    twelfthMarksheet: {
      name: "",
      size: null,
      type: "",
      lastModified: null,
    },
    jeeScorecard: {
      name: "",
      size: null,
      type: "",
      lastModified: null,
    },
    incomeCertificate: {
      name: "",
      size: null,
      type: "",
      lastModified: null,
    },
    casteCertificate: {
      name: "",
      size: null,
      type: "",
      lastModified: null,
    },
    domicileCertificate: {
      name: "",
      size: null,
      type: "",
      lastModified: null,
    },
  },
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      const { section, data } = action.payload;
      state[section] = { ...state[section], ...data };
    },
    resetForm: () => initialState,
  },
});

export const { updateFormData, resetForm } = formSlice.actions;
export default formSlice.reducer;
