import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLoaderData } from "react-router-dom";;
import axios from "axios";
import { getUser } from "../uitls/getUser";
import isTokenExpire from "../uitls/isTokenExpire";
import refreshToken from "../uitls/refreshToken";
import { BASE_URL, PUBLISHABLE_KEY, SUPABASE_API_KEY } from "../constant";
import { requireAuth } from "../uitls/requireAuth";
import CheckoutForm from "./CheckoutForm";

export async function paymentLoader({ request, params }) {
  const pathname = new URL(request.url).pathname;
  await requireAuth({ redirectTo: pathname });
  let { access_token, expires_at}= await getUser();
  if (isTokenExpire(expires_at)) {
    console.log("Token Expired :(");
    access_token = await refreshToken();
  }
  const createPaymentIntent = async () => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}functions/v1/create-stripe-payment`,
        { course_id: params.CourseId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
            apiKey: SUPABASE_API_KEY,
          },
        }
      );

      return { clientSecret: data.clientSecret, error: null };
    } catch (error) {
      return {
        error: error?.response?.data?.error || error.message,
        clientSecret: null,
      };
    }
  };
  return await createPaymentIntent();
}
function Payment() {
  const { error, clientSecret } = useLoaderData();
  const stripePromise = loadStripe(PUBLISHABLE_KEY);

  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <>
      <h1>React Stripe and the Payment Element</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm/>
        </Elements>
      )}
    </>
  );
}

export default Payment;