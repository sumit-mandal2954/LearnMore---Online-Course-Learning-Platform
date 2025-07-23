import axios from 'axios';
import React from 'react'
import { BASE_URL, SUPABASE_API_KEY } from '../constant';
import { Link, useLoaderData, useSearchParams } from 'react-router-dom';
import styles from "./CourseDetail.module.css";
import coding from "../assets/coding.svg"
 export async function CourseDetailLoader({params}) {
  const{id:CourseId} = params;
  const URL = (`${BASE_URL}rest/v1/modules?course_id=eq.${CourseId}&select=*`)
   const {data:modules} = await axios.get(URL,{
    headers:{
      apikey:SUPABASE_API_KEY
    }
   })
   return{modules,CourseId}
 }
export default function CourseDetail() {
  const [searchParams] = useSearchParams();
  const courseName = searchParams.get("name"); 
  const {modules,CourseId} = useLoaderData();
  return (
    <div className="container">
      <header className={styles.header}>
        <div className={styles.headerContent}>
           <h1 className={styles.courseName}>{courseName}</h1>
           <div className={styles.headerButtonCont}>
               <Link to={`/payment/${CourseId}`} className={styles.btn}>Buy Now</Link>
               <a className={styles.btn} href="#curiculum">Veiw More</a>
           </div>
        </div>
         <img
          src={coding}
          alt="Illustration of person doing coding"
          className={styles.headerImg}
        />
      </header>
      {/* {JSON.stringify(modules)}
      <br /> */}
     <section id="curriculum" className={styles.curriculumSection}>
        <h2 className={styles.curriculumHeading}>Curriculum</h2>
        {modules
          .sort((a, b) => a.number - b.number)
          .map((module) => {
            const { id, number, name, description } = module;
            return (
              <div key={id} className={styles.module}>
                <h3 className={styles.chapterNumber}>Chapter {number}</h3>
                <h2>{name}</h2>
                {description}
              </div>
            );
          })}
        <br />
        <Link to={`/payment/${CourseId}`} className={styles.btn}>
          Buy Now
        </Link>
      </section>
    </div>
  )
}
