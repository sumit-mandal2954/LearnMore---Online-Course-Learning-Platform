import axios from 'axios';
import React from 'react'
import { Form, redirect, useActionData } from 'react-router-dom'
import { SIGN_UP, SUPABASE_API_KEY } from '../constant';
import { getUser } from '../uitls/getUser';
import styles from "./LoginAndSignUp.module.css";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
export async function signupLoader() {
  const user = await  getUser();
if( user=== null){
  return null;
}else{
  return redirect("/")
  }
}

export async function signupAction({request}) {
  const formData = await request.formData()
  const newUser ={
    email: formData.get("email"),
    password: formData.get("password")
  }
  const confirmpassword = formData.get("confirm-password");
  if(newUser.password!==confirmpassword){
    return{error:"password must match"}
  }
  try {
      const response = await axios.post(SIGN_UP, newUser, {
      headers: {
        apikey: SUPABASE_API_KEY,
        Authorization: `Bearer ${SUPABASE_API_KEY}`,
        "Content-Type": "application/json"
      }
    });
    const data = response.data;
    console.log(data)
    if(data.identities && data.identities.length===0){
      return {error:"user already exit"}
    }
    return {message:"confirm your email and login"};
  } catch (error) {
    console.log(error)
    return{error:error.message};
  }
  
}
// identity_id: 'cac711b0-459f-4d47-adfa-e685d66da196
export default function SignUp() {
  const data = useActionData();

 if (data?.error) {
  Swal.fire({
    icon: 'error',
    title: 'Signup Failed',
    text: data.error,
  });
}

if (data?.message) {
  Swal.fire({
    icon: 'success',
    title: 'Signup Successful',
    text: data.message,
  });
}

  return (
    <div className={styles.authPageWrapper}>
      <h2 className={styles.pageHeading}>Create your account</h2>

      <Form method="POST" action="/signup" className={styles.authFormContainer}>
        <h1 className={styles.authTitle}>Sign Up</h1>

        <div className={styles.formGroup}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            autoComplete="off"
            required
            className={styles.inputField}
          />
        </div>

        <div className={styles.formGroup}>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            autoComplete="off"
            required
            className={styles.inputField}
          />
        </div>

        <div className={styles.formGroup}>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            placeholder="Confirm Password"
            autoComplete="off"
            required
            className={styles.inputField}
          />
        </div>

        <div className={styles.formGroup}>
          <input
            type="submit"
            value="Sign Up"
            className={styles.submitBtn}
          />
        </div>
      </Form>
    </div>
  );
}

