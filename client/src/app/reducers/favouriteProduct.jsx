// import { createSlice } from "@reduxjs/toolkit";

// const favoritesSlice = createSlice({
//   name: "favorites",
//   initialState: [],
//   reducers: {
//     addFavorite: (state, action) => {
//       // Add the new favorite product to the state
//       state.push(action.payload);
//     },
//     removeFavorite: (state, action) => {
//       // Remove the favorite product with the specified ID from the state
//       const index = state.findIndex((p) => p.id === action.payload);
//       // let favorites = favourite.filter((element) => {
//       //   return element.productID !== product.productID;
//       // });
//       if (index !== -1) {
//         state.splice(index, 1);
//       }
//     },
//   },
// });

// export const { addFavorite, removeFavorite } = favoritesSlice.actions;

// export default favoritesSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    addFavorite: (state, action) => {
      // Add the new favorite product to the state
      state.push(action.payload);
    },
    removeFavorite: (state, action) => {
      // Remove the favorite product with the specified ID from the state
      const index = state.findIndex((p) => p._id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
