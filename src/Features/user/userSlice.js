import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const themes = {
  fantasy: "fantasy",
  night: "night",
};

const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user")) || null;
};

const getThemeFromBrowser = () => {
  const theme = localStorage.getItem("theme") || themes.fantasy;
  document.documentElement.setAttribute("data-theme", theme);
  return theme;
};

const initialState = {
  user: getUserFromLocalStorage(),
  theme: getThemeFromBrowser(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const user = { ...action.payload.user, token: action.payload.jwt };
      state.user = user;

      localStorage.setItem("user", JSON.stringify(user));
    },

    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      toast.success("Logged Out Successfully!");
    },

    toggleTheme: (state) => {
      console.log(state);

      const { fantasy, night } = themes;
      state.theme = state.theme === night ? fantasy : night;
      document.documentElement.setAttribute("data-theme", state.theme);
      localStorage.setItem("theme", state.theme);
    },
  },
});

export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;

export default userSlice.reducer;
