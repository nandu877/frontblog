import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const SERVER_URL = "https://backend-production-29df.up.railway.app/";

const api = axios.create({
  baseURL: SERVER_URL,
  timeout: 15000,
});



export async function connectToAPI(contextURL,method = "GET",data = null) {
 
  try {
    const token = localStorage.getItem("token");

    const response = await api({
      url: contextURL,
      method,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    const status = error?.response?.status;
   
    if (status === 403) {
    localStorage.removeItem("token");
    localStorage.removeItem("user")
    window.location.href="/login";
      return;
    }
    console.error("API Error:", error);
    throw error;
  }
}
