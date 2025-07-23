import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form, useActionData, useLocation } from 'react-router-dom';
import { BASE_URL, SUPABASE_API_KEY } from '../constant';
import styles from "./ResetPassword.module.css"
export async function resetActionHandler({request}){
  const formData = await request.formData();
  const token = formData.get("token");

    const  newpassword = formData.get("newPassword");
    const confirmPassword = formData.get("confirmPassword")

  if(newpassword!==confirmPassword){
    return{success : false ,message:"Password Do Not Match"}
  }
  const resetEndPoint = `${BASE_URL}auth/v1/user`
  try {
    const res = await axios.put(resetEndPoint,{password: newpassword},{
    headers:{
        apikey : SUPABASE_API_KEY,
        Authorization: `Bearer ${token}`,
        "Content-Type" : 'application/json',
    }
  })

return {success :true , message :"Password Updated Successfuly"}
  
} catch (error) {
    return {success :false , message :error.message}
  }
  
}


export default function ResetPassword() {
     const [token ,setToken] = useState('');
      const actionData = useActionData();
      const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("token");
    console.log("Extracted token from URL:", accessToken);
    setToken(accessToken);
  }, [location]);

     if (!token) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        <h2 className={styles.title}>Reset Your Password</h2>
        <Form method="POST">
          <input type="hidden" name="token" value={token} />
          <input  type="password" name="newPassword" id="newPassword" placeholder="New Password"required className={styles.inputField} />
          <input type="password" name="confirmPassword" id="confirmPassword"placeholder="Confirm Password"required className={styles.inputField}/>
          <input type="submit"value="Reset Password" className={styles.submitButton}
          />
        </Form>
        {actionData && (
          <p
            className={styles.message}
            style={{ color: actionData.success ? 'green' : 'red' }}
          >
            {actionData.message}
          </p>
        )}
      </div>
    </div>
  );
}

