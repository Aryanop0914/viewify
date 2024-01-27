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
const DeleteVideo = () => {
   const navigate = useNavigate();
   return (
      <>
         <div className="grid grid-cols-1 min-[600px]:grid-cols-2 lg:grid-cols-3">
            {arrUser.map((video) => (
               <Card
                  className="border-0 shadow-none mx-auto mt-2 max-[470px]:w-full max-[600px]:w-[430px] min-[600px]:w-full"
                  key={video.id}
                  onClick={() => navigate('/video/1234')}
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
                                 {video.published}
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
