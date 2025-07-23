import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from "react-router-dom"
import RootLayout from "./layouts/RootLayout"
import {Home,About,Login,SignUp,MyCourse,Profile} from "./Pages"
import { loginAction, loginLoder } from "./Pages/Login"
import { MyCourseLoader } from "./Pages/MyCourse"
import { profileLoader } from "./Pages/Profile"
import { signupAction, signupLoader } from "./Pages/SignUp"
import { LogoutAction } from "./Pages/Logout"
import { getUser } from "./uitls/getUser"
import { homeLoader } from "./Pages/Home"
import CourseDetail, { CourseDetailLoader } from "./Pages/CourseDetail"
import Payment, { paymentLoader } from "./Pages/Payment"
import Thankyou from "./Pages/Thankyou"
import MyCoursesVideos, { myCourseVIdeoLoader } from "./Pages/MyCoursesVideos"
import { ToastContainer } from "react-toastify"
import Forgot, { ForgotAction } from "./Pages/Forgot"
import ResetPassword, { resetActionHandler } from "./Pages/ResetPassword"
const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<RootLayout/>} loader={getUser} id="parentRoute">
     <Route index element={<Home/>} loader={homeLoader}/>
     <Route path="/about" element={<About/>}/>
     <Route path="/profile" element={<Profile/>}  loader ={profileLoader}/>
     <Route path="/login" element={<Login/>} action ={loginAction} loader={loginLoder}/>
     <Route path="/signup" element={<SignUp/>} action ={signupAction} loader={signupLoader}/>
     <Route path="/my-courses" element={<MyCourse/>} loader={MyCourseLoader}/>
     <Route path="/logout" action={LogoutAction}/>
     <Route path="course-detail/:id" element={<CourseDetail/>} loader={CourseDetailLoader}/>
     <Route path="payment/:CourseId" element={<Payment/>} loader={paymentLoader}/>
     <Route path="thankyou" element={<Thankyou/>} />
     <Route path="/my-courses/:CourseId" element={<MyCoursesVideos/>} loader={myCourseVIdeoLoader}/>
     <Route path="/forgot-password" element={<Forgot/>} action={ForgotAction}/>
     <Route path = "/reset-password" element={<ResetPassword/>} action={resetActionHandler}/>
  </Route>
))
function App() {
  return (
    <>
    <ToastContainer/>
     <RouterProvider router={router}/>
    </>
  )
}

export default App
