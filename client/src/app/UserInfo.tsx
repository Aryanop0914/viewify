import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
   ResizableHandle,
   ResizablePanel,
   ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dot, Share } from 'lucide-react';
import arrUser from './data';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import axios from 'axios';
const VideoCardHorizontal = () => {
   return (
      <ScrollArea className="w-full whitespace-nowrap rounded-md border-0">
         <div className="flex w-max space-x-4">
            {arrUser.map((video) => (
               <Card
                  className="border-0 shadow-none p-2 mx-auto w-[300px]"
                  key={video.id}
               >
                  <CardContent className="p-1">
                     <AspectRatio ratio={16 / 9} className="bg-muted">
                        <img
                           src={video.image}
                           alt="Photo by Drew Beamer"
                           className="rounded-md object-cover w-full"
                        />
                     </AspectRatio>
                  </CardContent>
                  <div className="flex mt-4 p-1 items-center">
                     <CardHeader>
                        <CardTitle className="text-lg text-wrap">
                           {video.title}
                        </CardTitle>
                        <div className="flex items-center ">
                           <CardDescription>
                              {video.views} Views
                           </CardDescription>
                           <Dot size={20} strokeWidth={3} className="m-1" />
                           <CardDescription> {video.published}</CardDescription>
                        </div>
                     </CardHeader>
                  </div>
               </Card>
            ))}
         </div>
         <ScrollBar orientation="horizontal" />
      </ScrollArea>
   );
};

const UserInfo = () => {
   const { profileId } = useParams();
   const [user, setUser] = useState<any>();
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
      // setLoading(true);
      axios
         .get(`http://localhost:8000/api/v1/users/channel/${profileId}`, config)
         .then((res: any) => {
            if (res.status === 200) {
               // setLoading(false);
               setUser(res.data.data);
               console.log(res.data.data);
            } else {
               console.log('Something Went Wrong');
            }
         })
         .catch((error) => {
            console.error('Error fetching user data:', error);
         });
   }, []);

   const Subscribe = () => {
      axios
         .get(`http://localhost:8000/api/v1/users/channel/${profileId}`, config)
         .then((res: any) => {
            if (res.status === 200) {
               // setLoading(false);
               setUser(res.data.data);
               console.log(res.data.data);
            } else {
               console.log('Something Went Wrong');
            }
         })
         .catch((error) => {
            console.error('Error fetching user data:', error);
         });
   };

   return (
      <div className="w-full h-screen overflow-y-auto flex justify-center">
         <ResizablePanelGroup
            direction="vertical"
            className="w-full rounded-lg mx-2"
         >
            <ResizablePanel defaultSize={35} minSize={35} maxSize={40}>
               <div className="flex items-center justify-center p-4">
                  <AspectRatio ratio={21 / 9}>
                     <img
                        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                        alt="Image"
                        className="rounded-md w-full h-[220px]"
                     />
                  </AspectRatio>
               </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={65}>
               <div className="flex flex-wrap justify-between items-center ">
                  <div className="m-8 flex flex-row justify-start items-center">
                     <Avatar className="h-20 w-20">
                        <AvatarImage
                           src={user?.avatar?.url || 'default-avatar-url'}
                        />
                        <AvatarFallback>Avatar</AvatarFallback>
                     </Avatar>
                     <div className="ml-4 space-y-2">
                        <h1 className="text-3xl text-primary max-[390px]:text-xl ">
                           {user?.channelName}
                        </h1>
                        <div className="flex flex-row max-[390px]:text-sm">
                           <p className="text-muted-foreground text-md ">
                              {' '}
                              {user?.subscribersCount} Subscribers
                           </p>
                           <Dot size={20} strokeWidth={3} className="m-1" />
                           <p className="text-muted-foreground">14 videos</p>
                        </div>
                     </div>
                  </div>
                  <div className="">
                     <Button className="m-5" onClick={Subscribe()}>
                        Subscribe
                     </Button>
                     <Button variant="ghost">
                        <div className="mr-2">Share </div> <Share />
                     </Button>
                  </div>
               </div>
               <VideoCardHorizontal />
            </ResizablePanel>
         </ResizablePanelGroup>
      </div>
   );
};

export default UserInfo;
