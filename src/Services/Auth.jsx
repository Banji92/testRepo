// authService.ts
import Cookies from "js-cookie";
const baseUrl = process.env.REACT_APP_BASEURL;

const authService = {
  logout: () => {
    Cookies.remove("accessToken");
    localStorage.removeItem("accessToken");
  },

  isAuthenticated: () => {
    let authenticated = null;
    const cookiesToken = Cookies.get("accessToken");
    const lsToken = localStorage.getItem("accessToken");

    
    if (!cookiesToken && !lsToken) {
        authenticated = false;
        return authenticated
    }
    authenticated = true;
    console.log(authenticated)
    return authenticated;
  },

  getAuthUser: async () => {
    const response = await fetch(`${baseUrl}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    if (!response.ok) {
      console.log("Error has Occurred");
    }

    const data = await response.json();
    return data.data
  }

};

export default authService;
