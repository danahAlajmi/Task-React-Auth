import instance from "./instance";
// import axios from 'axios';
import decode from "jwt-decode";
import { makeAutoObservable } from "mobx";

class AuthStore {
  constructor() {
    makeAutoObservable(this);
    // this will turn our class into a mobx store and all components can observe the changes that happen in the store
  }

  user = null;
  noUser = "";

  setUser = (token) => {
    localStorage.setItem("userToken", token);
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.user = decode(token);
  };

  signup = async (newUser) => {
    try {
      const response = await instance.post("/user/signup", newUser);
      this.setUser(response.data.token);
    } catch (error) {
      console.log(
        "🚀 ~ file: productStore.js ~ line 16 ~ ProductStore ~ createProduct= ~ error",
        error
      );
    }
  };

  signin = async (user) => {
    try {
      const response = await instance.post("/user/signin", user);
      this.setUser(response.data.token);
    } catch (error) {
      console.error(error);
      this.noUser = "User not found";
    }
  };

  signout = () => {
    localStorage.removeItem("userToken");
    delete instance.defaults.headers.common.Authorization;
    this.user = null;
  };

  checkForToken = () => {
    // presistent login ==> check if the user is logged in
    const token = localStorage.getItem("userToken");
    if (token) {
      const currentTime = Date.now();
      const user = decode(token);
      if (user.exp >= currentTime) {
        // if user time is expired then sign him out, if the user still has time then keep him logged in
        this.setUser(token);
      } else {
        this.signout();
      }
    }
  };
}

const authStore = new AuthStore();
export default authStore;
authStore.checkForToken(); // call this method immediatly when you access the store to check if some is already signed in
