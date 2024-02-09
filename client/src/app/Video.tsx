// import { useParams } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dot, Heart, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/components/ui/card';
import arrUser from './data';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
const VideoSidebar = () => {
   const navigate = useNavigate();
   return (
      <div className="flex flex-col mt-4">
         {arrUser.map((video) => (
            <Card
               className="flex flex-row shadow-none p-2 border-0 w-full"
               key={video.id}
               onClick={() => {
                  navigate('/video/1234');
               }}
            >
               <CardContent className="flex-none p-1 h-full w-[230px]">
                  <img
                     src={video.image}
                     alt="Video Thumbnail"
                     className="rounded-md object-cover "
                  />
               </CardContent>
               <CardHeader>
                  <CardTitle className="text-lg text-wrap">
                     {video.title}
                  </CardTitle>
                  <div className="flex items-center ">
                     <CardDescription>{video.views} Views</CardDescription>
                     <Dot size={20} strokeWidth={3} className="m-1" />
                     <CardDescription> {video.published}</CardDescription>
                  </div>
               </CardHeader>
            </Card>
         ))}
      </div>
   );
};
const Video = () => {
   const { videoId } = useParams();
   const [video, setVideo] = useState<any>();
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
      axios
         .get(`http://localhost:8000/api/v1/videos/${videoId}`, config)
         .then((res) => {
            setVideo(res.data.data);
            console.log(res.data.data);
         });
   }, [videoId]);
   if (!video) {
      return <div>Loading...</div>; // or show a loader or handle the loading state
   }

   return (
      <>
         <div className="flex flex-row h-max">
            <div className="flex flex-col w-full lg:basis-3/5 border-0">
               <div className="m-4 md:m-8">
                  <iframe
                     src={video?.video.url}
                     className="rounded-lg object-cover w-[800px] h-[500px]"
                  />
               </div>
               <div className="mx-8 mb-2 lg:-mt-4 lg:mx-12">
                  <p className="text-xl">{video.title}</p>
               </div>
               <div className="mx-6 mt-4 px-4 flex flex-row flex-wrap justify-start items-center">
                  <Avatar
                     className="h-14 w-14"
                     onClick={() => {
                        navigate('/profile/1234');
                     }}
                  >
                     <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                     <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                     <p className="text-primary text-2xl ">Code With Aryan</p>
                     <div className="flex flex-row max-[390px]:text-sm">
                        <p className="text-muted-foreground text-md ">
                           {' '}
                           123k Subscribers
                        </p>
                        <Dot size={20} strokeWidth={3} className="m-1" />
                        <p className="text-muted-foreground">14 videos</p>
                     </div>
                  </div>
                  <div className="flex flex-row flex-1  justify-between ml-4 mt-8 min-[674px]:mt-0 ">
                     <Button variant="ghost" className="">
                        Subscribe
                     </Button>
                     <div className="flex justify-end">
                        <Button variant="ghost">
                           <div className="mr-2">Like </div>
                           <Heart />
                        </Button>
                        <Button variant="ghost">
                           <div className="mr-2">Share </div> <Share />
                        </Button>
                     </div>
                  </div>
               </div>
            </div>
            <div className="basis-2/5 border-0 hidden lg:block">
               <VideoSidebar />
            </div>
         </div>
      </>
   );
};

export default Video;
