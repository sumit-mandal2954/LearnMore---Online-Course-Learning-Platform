import React, { useEffect } from 'react';
import { NavLink, Outlet, useRouteLoaderData, Form, useNavigate } from 'react-router-dom';
import styles from './RootLayout.module.css';
import logoutIcon from '../assets/logout.svg';

export default function RootLayout() {
  const user = useRouteLoaderData("parentRoute");
  const navigate  = useNavigate();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('access_token') && hash.includes('type=recovery')) {
      const params = new URLSearchParams(hash.substring(1)); // remove "#"
      const token = params.get("access_token");

      if (token) {
        // 👇 Navigate to /reset-password with token as query param
        navigate(`/reset-password?token=${token}`);
      }
    }
  }, [navigate]);
  return (
    <main className={styles.mainLayout}>
      <nav className={styles.navbar}>
        <h1 className={styles.logo}>
          <NavLink to="/" className={styles.brand}> Learn-More</NavLink>
        </h1>
        <ul className={styles.navLinks}>
          <li>
            <NavLink to="about" className={({ isActive }) => isActive ? styles.active : undefined}>
              About
            </NavLink>
          </li>

          {user && (
            <>
              <li>
                <NavLink to="my-courses" className={({ isActive }) => isActive ? styles.active : undefined}>
                  My Courses
                </NavLink>
              </li>
            </>
          )}

          {!user && (
            <>
              <li>
                <NavLink to="login" className={({ isActive }) => isActive ? styles.active : undefined}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="signup" className={({ isActive }) => isActive ? styles.active : undefined}>
                  Signup
                </NavLink>
              </li>
              {/* <li>
                <NavLink></NavLink>
              </li> */}
            </>
          )}
        </ul>

        {user && (
          <Form action="/logout" method="post" className={styles.logoutForm}>
            <button className={styles.logoutButton}>
              <img src={logoutIcon} alt="Logout Icon" className={styles.logoutSvg} />
              Logout
            </button>
          </Form>
        )}
      </nav>

      <Outlet />
    </main>
  );
}
