import { redirect } from "react-router-dom"
import { getUser } from "../uitls/getUser"
import axios from "axios";
import { LOGOUT, SUPABASE_API_KEY } from "../constant";
import isTokenExpire from "../uitls/isTokenExpire";
import refreshToken from "../uitls/refreshToken";

export async function LogoutAction() {
    let {access_token,expires_at} = await getUser();
     if(isTokenExpire(expires_at)){
        console.log("token expire")
        access_token = await refreshToken();
     }
    try {
        await axios.post(LOGOUT,null,{
        headers:{
            apikey:SUPABASE_API_KEY,
            Authorization:`Bearer ${access_token}`,
            "Content-Type":"application/json",
        }
    })
    } catch (error) {
        console.error(error.message)
    } finally{
       localStorage.removeItem("user")
       return redirect("/")
    }
}