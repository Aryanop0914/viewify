import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Dot } from 'lucide-react';
import arrUser from './data';
const VideosCard = () => {
   return (
      <>
         <div className="grid grid-cols-1 min-[600px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {arrUser.map((video) => (
               <Card
                  className="border-0 shadow-none w-[365px] mx-auto mt-2 min-[600px]:w-[300px] md:w-[370px] lg:w-[350px] xl:w-[370px]"
                  key={video.id}
               >
                  <CardContent className="mt-6">
                     <AspectRatio ratio={16 / 9} className="bg-muted">
                        <img
                           src={video.image}
                           alt="Photo by Drew Beamer"
                           className="rounded-md object-cover"
                        />
                     </AspectRatio>
                  </CardContent>
                  <div className="flex p-6 items-center">
                     <img
                        className="h-12 w-12 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                     />
                     <CardHeader>
                        <CardTitle className="text-xl">{video.title}</CardTitle>
                        <CardDescription>{video.channelName}</CardDescription>
                        <CardDescription>
                           <div className="flex items-center ">
                              <h1>{video.views} Views </h1>
                              <Dot size={20} strokeWidth={3} className="m-1" />
                              <h1> {video.published}</h1>
                           </div>
                        </CardDescription>
                     </CardHeader>
                  </div>
               </Card>
            ))}
         </div>
      </>
   );
};

export default VideosCard;
