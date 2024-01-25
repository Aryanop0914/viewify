import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import {
   ResizableHandle,
   ResizablePanel,
   ResizablePanelGroup,
} from '@/components/ui/resizable';
import Sidebar from './Sidebar';

const Home = () => {
   return (
      <div>
         <Navbar />
         <div className="max-md:hidden">
            <ResizablePanelGroup direction="horizontal">
               <ResizablePanel defaultSize={10} maxSize={15}>
                  <Sidebar />
               </ResizablePanel>
               <ResizableHandle />
               <ResizablePanel defaultSize={85} maxSize={90}>
                  <Outlet />
               </ResizablePanel>
            </ResizablePanelGroup>
         </div>
         <div className="md:hidden">
            <Outlet />
         </div>
      </div>
   );
};

export default Home;
