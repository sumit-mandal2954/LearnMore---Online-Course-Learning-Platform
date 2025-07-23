import React from 'react';
import styles from './About.module.css'; // Make sure to style it

export default function About() {
  return (
    <div className={styles.aboutWrapper}>
      <h1 className={styles.heading}>About Our Learning Platform</h1>
      
      <p className={styles.intro}>
        Welcome to <strong>LearnX</strong> — your modern hub for skill-building and career growth.
        Whether you're a beginner or a pro, we provide high-quality, structured online courses designed
        by experienced mentors to help you learn faster, smarter, and better.
      </p>

      <section className={styles.featuresSection}>
        <h2 className={styles.subHeading}>What We Offer</h2>
        <ul className={styles.featureList}>
          <li>🎯 Project-based learning with real-world scenarios</li>
          <li>📹 High-quality video lectures with modular breakdown</li>
          <li>📈 Track your progress as you learn</li>
          <li>📜 Course completion certificates</li>
          <li>📚 Practice questions, quizzes, and notes</li>
          <li>🧑‍🏫 Learn from industry experts</li>
        </ul>
      </section>

      <section className={styles.missionSection}>
        <h2 className={styles.subHeading}>Our Mission</h2>
        <p>
          We're here to make quality education accessible and affordable for all.
          By removing barriers, we help students, job seekers, and professionals upskill at their own pace — anytime, anywhere.
        </p>
      </section>

      <section className={styles.joinSection}>
        <h2 className={styles.subHeading}>Join Us</h2>
        <p>
          Ready to take the next step in your learning journey? <br />
          <a href="/signup" className={styles.cta}>Sign up now</a> and start learning with us!
        </p>
      </section>
    </div>
  );
}
