import { redirect } from "react-router-dom";
import { getUser } from "./getUser";

export async function requireAuth({redirectTo}) {
  const user = await getUser();
  if(user===null){
   throw redirect(`/login?redirectTo=${redirectTo}`)
  }
}