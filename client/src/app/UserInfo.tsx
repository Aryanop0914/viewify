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
                        <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                        <AvatarFallback>Avatar</AvatarFallback>
                     </Avatar>
                     <div className="ml-4 space-y-2">
                        <h1 className="text-3xl text-primary max-[390px]:text-xl ">
                           Code With Aryan
                        </h1>
                        <div className="flex flex-row max-[390px]:text-sm">
                           <p className="text-muted-foreground text-md ">
                              {' '}
                              123k Subscribers
                           </p>
                           <Dot size={20} strokeWidth={3} className="m-1" />
                           <p className="text-muted-foreground">14 videos</p>
                        </div>
                     </div>
                  </div>
                  <div className="">
                     <Button className="m-5">Subscribe</Button>
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
