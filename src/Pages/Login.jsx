import axios from 'axios'
import React, { cloneElement, use, useEffect, useState } from 'react'
import { Form, Link, redirect, useActionData, useLocation, useNavigation } from 'react-router-dom'
import { LOGIN_URL, SUPABASE_API_KEY } from '../constant'
import { getUser } from '../uitls/getUser'
// import { Link } from 'react-router-dom'
// using loader for redirecting form login 
import styles from "./LoginAndSignUp.module.css";
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
export async function loginLoder(){
const user = await  getUser();
if( user=== null){
  return null;
}else{
  return redirect("/")
  }
}

 export async function loginAction({request}){
  const redirectTo = new URL(request.url).searchParams.get("redirectTo")||"/";
  const data = await request.formData()
   const credential ={
     email : data.get("email"),
     password : data.get("password")
   }
   console.log(request)
  // posting request
  try {
    const response = await axios.post(LOGIN_URL,credential,{
    headers:{
      apikey:SUPABASE_API_KEY,
      "Content-Type":"application/json",
    }
  }) 
   const {access_token,expires_at,refresh_token,user:{id:user_id}} = response.data;
   const user = {access_token,expires_at,refresh_token,user_id};
  //  localStorage
  //sessionStorage

  localStorage.setItem("user",JSON.stringify(user));
   return redirect(redirectTo)

  } catch (error) {
    localStorage.removeItem("user")
    if(error.response.status===400){
      return {error:"Wrong username and password"};
    }else{
      // console.log(error.response.data.message);
      return {error:error?.request?.data?.message||error.message};
    }
  }
 }
export default function Login() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state==="submitting";
  const data = useActionData();
  const location = useLocation();
  const loginURL = location.pathname + location.search;
  
  const [toastShown, setToastShown] = useState(false);
  useEffect(() => {
    if (data?.error && !toastShown) {
      toast.error(data.error);
      setToastShown(true);
    }
  }, [data, toastShown]);

  useEffect(() => {
    if (isSubmitting) {
      setToastShown(false); // reset on new form submission
    }
  }, [isSubmitting]);
 return (
  <div className={styles.authPageWrapper}>
    <h2 className={styles.pageHeading}>Welcome Back! Login to continue learning</h2>
    <Form method="POST" action={loginURL} replace className={styles.authFormContainer}>
      <h1 className={styles.authTitle}>Login</h1>

      <div className={styles.formGroup}>
        <input type="email" name="email" id="email" placeholder="Email" autoComplete="off" required className={styles.inputField} />
      </div>

      <div className={styles.formGroup}>
        <input type="password" name="password" id="password" placeholder="Password" autoComplete="off" required className={styles.inputField} />
      </div>

      <div className={styles.formGroup}>
        <input type="submit" value={isSubmitting ? 'Logging in...' : 'Login'} disabled={isSubmitting} className={styles.submitBtn} />
      </div>

      <div className={styles.linkGroup}>
        <Link to="/forgot-password" className={styles.linkText}>Forgot password?</Link>
        <span> | </span>
        <Link to="/signup" className={styles.linkText}>Sign up</Link>
      </div>
    </Form>
  </div>
 );
}