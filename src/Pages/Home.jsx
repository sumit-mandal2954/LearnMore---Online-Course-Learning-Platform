import axios from "axios";
import { GET_ALL_COURSES, SUPABASE_API_KEY } from "../constant";
import { Link, useLoaderData } from "react-router-dom";
import styles from "./Home.module.css";

import heroImage from "../assets/hero.svg";
import dollarIcon from "../assets/dollor.svg";
import thumbnail from "../assets/thumbnail.svg";

export async function homeLoader() {
  const { data } = await axios.get(GET_ALL_COURSES, {
    headers: {
      apikey: SUPABASE_API_KEY,
    },
  });
  return data;
}

export default function Home() {
  const courses = useLoaderData();

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroHeading}>We teach everything</h1>
          <p className={styles.heroSubHeading}>Make sure you understand everything</p>
          <button className={styles.heroButton}>Start Learning</button>
        </div>
        <img
          src={heroImage}
          alt="Person learning online"
          className={styles.heroImage}
        />
      </section>

      {/* Courses Section */}
      <section className={styles.courseSection}>
        <h2 className={styles.courseSectionHeading}>Our Most Popular Courses</h2>
        <div className={styles.courseCards}>
          {courses.map(({ id, name, description, amount }) => (
            <div key={id} className={styles.card}>
              <img
                src={thumbnail}
                alt="Course thumbnail"
                className={styles.courseThumbnail}
              />
              <h3 className={styles.courseTitle}>{name}</h3>
              <p className={styles.coursePrice}>
                <img src={dollarIcon} alt="Dollar" className={styles.dollarIcon} />
                {amount}
              </p>
              <p className={styles.courseDescription}>{description}</p>
              <Link to={`/course-detail/${id}?name=${name}`} className={styles.moreInfoBtn}>
                View Course
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
