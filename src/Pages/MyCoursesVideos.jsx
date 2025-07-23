import React, { useState } from 'react'
import { requireAuth } from '../uitls/requireAuth';
import { getUser } from '../uitls/getUser';
import { BASE_URL, SUPABASE_API_KEY } from '../constant';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import ReactPlayer from 'react-player/vimeo';
import styles from "./MyCourseVideo.module.css"
export async function myCourseVIdeoLoader({request,params}){
    const pathname = new URL(request.url).pathname;
    await requireAuth({redirectTo:pathname});
    const {CourseId} = params;
    const{access_token} = await getUser();
    
    const moduleURL = (`${BASE_URL}rest/v1/modules?course_id=eq.${CourseId}&select=*`)
    const {data:modules} = await axios.get(moduleURL,{
    headers:{
      apikey:SUPABASE_API_KEY
    }
   })
   
   const PromiseArray = modules.map((module)=>{
    return axios.get(`${BASE_URL}/rest/v1/videos?module_id=eq.${module.id}&select=*`,{
    headers:{
        apikey:SUPABASE_API_KEY,
        Authorization: `Bearer ${access_token}`
        }
     })
   })
   const videoResponses = await Promise.all(PromiseArray)
   const modulesWithVideos = modules.map((module, index) => ({...module, videos: videoResponses[index].data,}));
  return modulesWithVideos;
}


export default function MyCoursesVideos() {
  const modules = useLoaderData();
  const firstVideo = modules.find(m => m.videos.length > 0)?.videos[0];
  const [currentVideo, setCurrentVideo] = useState(firstVideo);

  if (!firstVideo) {
    return <p className={styles.noVideos}>No videos available.</p>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.courseLayout}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          {modules.map((module) => (
            <div key={module.id} className={styles.moduleGroup}>
              <h3 className={styles.moduleTitle}>{module.name}</h3>
              <ul className={styles.videoList}>
                {module.videos.map((video) => (
                  <li
                    key={video.id}
                    onClick={() => setCurrentVideo(video)}
                    className={
                      video.id === currentVideo?.id ? styles.activeVideo : styles.videoText
                    }
                  >
                    {video.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Video player */}
        <div className={styles.videoSection}>
          <div className={styles.videoPlayer}>
            <ReactPlayer
              url={currentVideo?.vimeo_url}
              controls
              width="100%"
              height="100%"
            />
          </div>
          <h2 className={styles.videoTitle}>{currentVideo?.name}</h2>
        </div>
      </div>
    </div>
  );
}
