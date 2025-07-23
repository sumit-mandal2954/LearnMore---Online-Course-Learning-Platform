import React from 'react'
import { getUser } from '../uitls/getUser'
import { requireAuth } from '../uitls/requireAuth';
import isTokenExpire from '../uitls/isTokenExpire';
import refreshToken from '../uitls/refreshToken';
import axios from 'axios';
import { BASE_URL, SUPABASE_API_KEY } from '../constant';
import { Link, useLoaderData } from 'react-router-dom';
import thumbnail from "../assets/thumbnail.svg"
import styles from "./MyCourse.module.css"
export async function MyCourseLoader({request}) {
   const pathname = new URL(request.url).pathname;
   await requireAuth({redirectTo:pathname});
   let{access_token,expires_at,user_id} = await getUser();
   if(isTokenExpire(expires_at)){
    access_token = await refreshToken();
   }
   const subscriptionEndpoint = `${BASE_URL}/rest/v1/subscriptions?user_id=eq.${user_id}&select=*`;
   const {data:subscriptions} = await axios.get(subscriptionEndpoint,{
    headers:{
      apikey:SUPABASE_API_KEY,
      Authorization: `Bearer ${access_token}`
    }
   })
   const coursesNumber = subscriptions.map((course)=>{return course.course_id}).join(",");
   
   const myCourseEndPoint = `${BASE_URL}/rest/v1/courses?id=in.%28${coursesNumber}%29`;
    const {data:mycourse} = await axios.get(myCourseEndPoint,{
      headers:{
        apikey:SUPABASE_API_KEY,
        Authorization: `Bearer ${access_token}`
      }
    })
   return mycourse;
}
export default function MyCourse() {
  const mycourse = useLoaderData();

  return (
    <div className={styles.myCourseContainer}>
      <h1 className={styles.myCourseTitle}>My Courses</h1>
      <div className={styles.courseList}>
        {mycourse.map((course) => {
          const { name, id } = course;
          return (
            <div key={id} className={styles.courseCard}>
              <img src={thumbnail} alt="Course generic thumbnail" className={styles.courseThumbnail} />
              <h2 className={styles.courseName}>{name}</h2>
              <Link to={`${id}`} className={styles.watchNowBtn}>
                Watch now
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
