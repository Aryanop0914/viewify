import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
   ResizableHandle,
   ResizablePanel,
   ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dot, Share } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@/components/ui/button';
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/components/ui/card';
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTrigger,
} from '@/components/ui/dialog';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table';
import formatTimestamp from '@/components/dateConvert';

function VideoTable(props: any) {
   const [likes, setLikes] = useState([]);
   const videos = props.videos;
   const navigate = useNavigate();
   const getLikesofVideo = async (videoId: String) => {
      const res = await axios.get(
         `http://localhost:8000/api/v1/likes/videos/${videoId}`
      );
      setLikes(res.data.data.likedBy);
   };
   return (
      <Card>
         <CardHeader>
            <CardTitle>Your Videos</CardTitle>
            <CardDescription>Manage your videos.</CardDescription>
         </CardHeader>
         <CardContent>
            <Table>
               <TableHeader>
                  <TableRow>
                     <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">img</span>
                     </TableHead>
                     <TableHead>Title</TableHead>
                     <TableHead>Views</TableHead>
                     <TableHead className="hidden md:table-cell">
                        Likes
                     </TableHead>
                     <TableHead className="hidden md:table-cell">
                        Posted on
                     </TableHead>
                     <TableHead>
                        <span className="sr-only">Actions</span>
                     </TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {videos.map((video: any) => (
                     <TableRow key={video._id}>
                        <TableCell className="hidden sm:table-cell">
                           <img
                              alt="Product img"
                              className="aspect-square rounded-md object-cover"
                              height="64"
                              src={video.thumbnail.url}
                              width="64"
                              onClick={() => {
                                 navigate(`/video/${video._id}`);
                              }}
                           />
                        </TableCell>
                        <TableCell className="font-medium">
                           {video.title}
                        </TableCell>
                        <TableCell>{video.views}</TableCell>
                        <TableCell className="hidden md:table-cell">
                           {video.noOfLikes}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                           {formatTimestamp(video.createdAt)}
                        </TableCell>
                        <TableCell>
                           <Dialog>
                              <DialogTrigger
                                 onClick={() => {
                                    getLikesofVideo(video._id);
                                 }}
                              >
                                 View Likes
                              </DialogTrigger>
                              <DialogContent>
                                 <DialogHeader>
                                    <Card className="h-full">
                                       <CardHeader>
                                          <CardTitle>Likes</CardTitle>
                                       </CardHeader>
                                       <CardContent className="grid gap-8 mt-2">
                                          {likes.map((like: any) => (
                                             <div
                                                className="flex items-center gap-4"
                                                key={like._id}
                                             >
                                                <Avatar className="hidden h-9 w-9 sm:flex">
                                                   <AvatarImage
                                                      src={like.avatar.url}
                                                      alt="Avatar"
                                                   />
                                                   <AvatarFallback>
                                                      JL
                                                   </AvatarFallback>
                                                </Avatar>
                                                <div className="grid gap-1">
                                                   <p className="text-sm font-medium leading-none">
                                                      {like.channelName}
                                                   </p>
                                                </div>
                                                <div className="ml-auto font-medium">
                                                   +1
                                                </div>
                                             </div>
                                          ))}
                                       </CardContent>
                                    </Card>
                                 </DialogHeader>
                              </DialogContent>
                           </Dialog>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </CardContent>
      </Card>
   );
}

const Subscribers = (props: any) => {
   const subscribers = props.subscribers;
   return (
      <Card className="h-full">
         <CardHeader>
            <CardTitle>Recent Subscribers</CardTitle>
         </CardHeader>
         <CardContent className="grid gap-8 mt-2">
            {subscribers.map((subscriber: any) => (
               <div className="flex items-center gap-4" key={subscriber._id}>
                  <Avatar className="hidden h-9 w-9 sm:flex">
                     <AvatarImage src={subscriber.avatar.url} alt="Avatar" />
                     <AvatarFallback>JL</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                     <p className="text-sm font-medium leading-none">
                        {subscriber.channelName}
                     </p>
                  </div>
                  <div className="ml-auto font-medium">+1</div>
               </div>
            ))}
         </CardContent>
      </Card>
   );
};

const UserInfo = () => {
   const { profileId } = useParams();
   const [user, setUser] = useState<any>();
   const [videos, setVideos] = useState([]);
   const [subscribed, setSubscribed] = useState<boolean | null>(null);
   const [subscribers, setSubscribers] = useState([]);
   const config = {
      withCredentials: true,
   };
   useEffect(() => {
      const fetchUserData = async () => {
         try {
            const res = await axios.get(
               `http://localhost:8000/api/v1/users/channel/${profileId}`,
               config
            );
            setUser(res.data.data);

            const subscribedRes = await axios.get(
               `http://localhost:8000/api/v1/subscriptions/subscribed/${res.data.data._id}`,
               config
            );
            setSubscribed(subscribedRes.data.data === 'true');

            const videosRes = await axios.get(
               `http://localhost:8000/api/v1/videos/getvideo/${res.data.data._id}`,
               config
            );
            setVideos(videosRes.data.data);
            const subscriber = await axios.get(
               `http://localhost:8000/api/v1/subscriptions/subscribe/${profileId}`,
               config
            );
            setSubscribers(subscriber.data.data.subscriber);
         } catch (error: any) {
            errorToast(error.response.data.message);
         }
      };

      fetchUserData();
   }, [profileId, subscribed]);

   const handleSubscribe = async () => {
      try {
         const res = await axios.post(
            `http://localhost:8000/api/v1/subscriptions/subscribe/${user._id}`,
            {},
            config
         );
         if (res.status === 200) {
            setSubscribed(!subscribed);
            successToast(res.data.message);
         }
      } catch (error: any) {
         console.error('Error subscribing:', error);
         errorToast(error.response.data.message);
      }
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
      <div className="w-full h-[1000px] overflow-y-auto flex justify-center">
         <ResizablePanelGroup
            direction="vertical"
            className="w-full rounded-lg mx-2"
         >
            <ResizablePanel defaultSize={35} minSize={35} maxSize={40}>
               <div className="flex items-center justify-center p-4">
                  <AspectRatio ratio={21 / 9}>
                     <img
                        src={user?.coverImage?.url || 'default-avatar-url'}
                        alt="img"
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
                           <p className="text-muted-foreground">
                              {user?.totalVideos} videos
                           </p>
                        </div>
                     </div>
                  </div>
                  <div className="">
                     <Button
                        className="m-5"
                        onClick={() => {
                           handleSubscribe();
                        }}
                     >
                        {subscribed ? 'Unsubscribe' : 'Subscribe'}
                     </Button>
                     <Button variant="ghost">
                        <div className="mr-2">Share </div> <Share />
                     </Button>
                  </div>
               </div>
               <div className="flex flex-row justify-between h-full w-full">
                  <div className="basis-2/3 mr-4 ">
                     <VideoTable videos={videos} className="w-full" />
                  </div>
                  <div className="basis-1/3">
                     <Subscribers subscribers={subscribers} />
                  </div>
               </div>
            </ResizablePanel>
         </ResizablePanelGroup>
      </div>
   );
};

export default UserInfo;
