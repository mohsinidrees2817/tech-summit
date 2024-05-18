import { configureStore, combineReducers } from "@reduxjs/toolkit";
import activePage from "./reducers/activePage";
import favouriteProduct from "./reducers/favouriteProduct";
// import propertyReducer, { fetchData } from "./reducers/allProperties";
import userReducer from "./reducers/userReducer";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  activepage: activePage,
  favouriteproduct: favouriteProduct,
  // properties: propertyReducer,
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["user", "favouriteproduct"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// store.dispatch(fetchData());
export const persistor = persistStore(store);
