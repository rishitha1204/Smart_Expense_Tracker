import axios from "axios";

const API = axios.create({
  baseURL:"https://smart-expense-tracker-1-ybx9.onrender.com"
});

export const loginUser = (data)=>API.post("/login",data);

export const registerUser = (data)=>API.post("/register",data);