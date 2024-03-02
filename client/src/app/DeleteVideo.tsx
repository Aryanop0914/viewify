import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Dot, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const DeleteVideo = () => {
   const [videos, setVideos] = useState([]);
   const { isLoggedIn } = useAuthStore();
   const navigate = useNavigate();
   const config = {
      withCredentials: true,
   };
   useEffect(() => {
      const fetchVideos = async (userId: string) => {
         try {
            const videosRes = await axios.get(
               `http://localhost:8000/api/v1/videos/getvideo/${userId}`,
               config
            );
            setVideos(videosRes.data.data);
         } catch (error: any) {
            errorToast(error.response.data.message);
         }
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
            } catch (error: any) {
               errorToast(error.response.data.message);
            }
         };
         fetchData();
      } else {
         setVideos([]);
      }
   }, [isLoggedIn]);
   const deleteVideo = async (videoId: string) => {
      console.log('hello');

      await axios
         .delete(`http://localhost:8000/api/v1/videos/${videoId}`)
         .then((res) => {
            successToast(res.data.message);
         })
         .catch((error) => {
            errorToast(error?.response.data.message);
         });
   };
   const errorToast = (message: any) =>
      toast.error(`${message}`, {
         position: 'bottom-center',
         theme: 'colored',
      });
   const successToast = (message: any) =>
      toast.success(`${message}`, {
         position: 'bottom-center',
         theme: 'colored',
      });
   return (
      <>
         <div className="grid grid-cols-1 min-[600px]:grid-cols-2 lg:grid-cols-3">
            <ToastContainer />
            {videos.map((video: any) => (
               <Card
                  className="border-0 shadow-none mx-auto mt-2 max-[470px]:w-full max-[600px]:w-[430px] min-[600px]:w-full"
                  key={video._id}
               >
                  <CardContent className="mt-6">
                     <AspectRatio ratio={16 / 9} className="bg-muted">
                        <img
                           src={video.thumbnail.url}
                           alt="Photo by Drew Beamer"
                           className="rounded-md object-cover"
                           onClick={() => {
                              navigate(`/video/${video._id}`);
                           }}
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
                                 onClick={() => deleteVideo(video._id)}
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
