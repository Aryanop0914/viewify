import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Dot, Trash2 } from 'lucide-react';
import arrUser from './data';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import { string } from 'zod';
const DeleteVideo = () => {
   const [videos, setVideos] = useState([]);
   const { isLoggedIn } = useAuthStore();
   const navigate = useNavigate();
   const accessToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('accessToken='))
      ?.split('=')[1];

   const config = {
      headers: {
         Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
   };
   useEffect(() => {
      const fetchVideos = async (userId: string) => {
         const videosRes = await axios.get(
            `http://localhost:8000/api/v1/videos/getvideo/${userId}`,
            config
         );
         setVideos(videosRes.data.data);
      };
      if (isLoggedIn) {
         const fetchData = async () => {
            try {
               const user = await axios.get(
                  `http://localhost:8000/api/v1/users/current-user`,
                  config
               );
               const userid = user.data.data._id;
               fetchVideos(userid);
            } catch (error) {
               console.error('Error fetching user data:', error);
            }
         };
         fetchData();
      } else {
         setVideos([]);
      }
   }, [isLoggedIn]);
   return (
      <>
         <div className="grid grid-cols-1 min-[600px]:grid-cols-2 lg:grid-cols-3">
            {videos.map((video: any) => (
               <Card
                  className="border-0 shadow-none mx-auto mt-2 max-[470px]:w-full max-[600px]:w-[430px] min-[600px]:w-full"
                  key={video._id}
                  onClick={() => navigate('/video/1234')}
               >
                  <CardContent className="mt-6">
                     <AspectRatio ratio={16 / 9} className="bg-muted">
                        <img
                           src={video.thumbnail.url}
                           alt="Photo by Drew Beamer"
                           className="rounded-md object-cover"
                        />
                     </AspectRatio>
                  </CardContent>
                  <div className="flex p-3 items-center">
                     <CardHeader>
                        <CardTitle className="text-lg">{video.title}</CardTitle>
                        <div className="flex items-center">
                           <div className="basis-4/5 flex items-center ">
                              <CardDescription>
                                 {video.views} Views
                              </CardDescription>
                              <Dot size={20} strokeWidth={3} className="m-1" />
                              <CardDescription>
                                 {' '}
                                 {video.createdAt.slice(0, 10)}
                              </CardDescription>
                           </div>
                           <div className="basis-1/5">
                              <Trash2
                                 strokeWidth={2}
                                 color="#ff4d4d"
                                 className="ml-3"
                              />
                           </div>
                        </div>
                     </CardHeader>
                  </div>
               </Card>
            ))}
         </div>
      </>
   );
};

export default DeleteVideo;
