import React from 'react';
import { BASE_URL, SUPABASE_API_KEY } from '../constant';
import axios from 'axios';
import { Form, useActionData } from 'react-router-dom';
import styles from "./Forgot.module.css";
export async function ForgotAction({ request }) {
  const data = await request.formData();

  const credential = {
    email: data.get("email"),
    redirect_to: "http://localhost:5173/reset-password"  
  };

  const forgotURL = `${BASE_URL}auth/v1/recover`;

  try {
    const response = await axios.post(forgotURL, credential, {
      headers: {
        apikey: SUPABASE_API_KEY,
        "Content-Type": "application/json",
      }
    });

    console.log(response.data);

    return {
      success: true,
      message: "Password reset link sent to your email.",
    };
  } catch (error) {
    console.error("Error :", error.message);
    return {
      success: false,
      message: error.response?.data?.msg || "Failed to send password reset link.",
    };
  }
}

export default function Forgot() {
  const actionData = useActionData();

  return (
     <div className={styles.container}>
      <div className={styles.formBox}>
        <Form method="POST" action="/forgot-password">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email"id="email"className={styles.inputField} placeholder="Enter your Email" required
          />
          <input
            type="submit"
            value="Send Reset Link"
            className={styles.submitButton}
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