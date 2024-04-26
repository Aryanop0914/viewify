import { useEffect, useState } from 'react';
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useSearchStore from '@/store/searchStore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthStore } from '@/store/authStore';
const VideosCard = () => {
   const { searchQuery } = useSearchStore();
   const navigate = useNavigate();
   const { email } = useAuthStore();
   const [videos, setVideos] = useState([]);
   useEffect(() => {
      const getallVideos = async () => {
         try {
            const res = await axios.get(
               'http://localhost:8000/api/v1/videos/getallvideo'
            );
            setVideos(res.data.data);
         } catch (error: any) {
            errorToast(error.response.data.message);
         }
      };
      getallVideos();
   }, []);
   const errorToast = (message: any) =>
      toast.error(`${message}`, {
         position: 'bottom-center',
         theme: 'colored',
      });
   const addViewsandWatchHistory = async (videoId: string) => {
      try {
         await axios.post(
            `http://localhost:8000/api/v1/videos/addviews/${videoId}`
         );
         await axios.post(
            `http://localhost:8000/api/v1/videos/watchHistory/${videoId}`,
            { email }
         );
      } catch (error: any) {
         errorToast(error.response.data.message);
      }
   };
   return (
      <>
         <div className="grid grid-cols-1 min-[600px]:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {videos
               .filter((video: any) => {
                  return searchQuery.toLowerCase() === ''
                     ? video
                     : video.title.toLowerCase().includes(searchQuery);
               })
               .map((video: any) => (
                  <Card
                     className="border-0 shadow-none mx-auto mt-4 max-[470px]:w-full max-[600px]:w-[430px] min-[600px]:w-full"
                     key={video?._id}
                  >
                     <CardContent
                        className="mt-6"
                        onClick={() => navigate(`/video/${video?._id}`)}
                     >
                        <AspectRatio ratio={16 / 9} className=" w-full h-60">
                           <img
                              src={video.thumbnail.url}
                              alt="Photo by Drew Beamer"
                              className="rounded-md object-cover h-full"
                              onClick={() => {
                                 addViewsandWatchHistory(video._id);
                              }}
                           />
                        </AspectRatio>
                     </CardContent>
                     <div className="flex px-6 items-center">
                        <Avatar
                           onClick={() => {
                              navigate(`/profile/${video.owner}`);
                           }}
                        >
                           <AvatarImage src={video.ownerDetails.avatar.url} />
                           <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <CardHeader>
                           <CardTitle className="text-lg">
                              {video.title}
                           </CardTitle>
                           <CardDescription className="text-primary text-lg">
                              {video.ownerDetails.channelName}
                           </CardDescription>
                           <div className="flex items-center ">
                              <CardDescription>
                                 {video.views} Views
                              </CardDescription>
                              <Dot size={20} strokeWidth={3} className="m-1" />
                              <CardDescription>
                                 {' '}
                                 {video.createdAt.slice(0, 10)}
                              </CardDescription>
                           </div>
                        </CardHeader>
                     </div>
                  </Card>
               ))}
         </div>
      </>
   );
};

export default VideosCard;
