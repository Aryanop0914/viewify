import { Button } from '@/components/ui/button';
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import BeatLoader from 'react-spinners/BeatLoader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Uploads = () => {
   const [loading, setLoading] = useState(false);
   const [files, setFiles] = useState({ avatar: '', coverImage: '' });
   const form = useForm();
   const { register, handleSubmit } = useForm();

   const handleFileChange = (fieldName: any, e: any) => {
      setFiles({
         ...files,
         [fieldName]: e.target.files[0], // Assuming only one file is selected
      });
   };
   const onSubmitUpload = () => {
      const fd = new FormData();
      fd.append('avatar', files.avatar);
      fd.append('coverImage', files.coverImage);
      const config = {
         withCredentials: true,
      };
      setLoading(true);
      axios
         .post('http://localhost:8000/api/v1/users/uploads', fd, config)
         .then((res) => {
            if (res.status === 200) {
               setLoading(false);
               successToast(res.data.message);
            }
         })
         .catch((error) => {
            errorToast(error.response.data.message);
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
      <Form {...form}>
         <form className="space-y-8" onSubmit={handleSubmit(onSubmitUpload)}>
            <FormField
               name="avatar"
               render={() => (
                  <FormItem>
                     <FormLabel className="text-xl">
                        Upload Your Avatar
                     </FormLabel>
                     <FormControl>
                        <Input
                           type="file"
                           {...register('avatar')}
                           onChange={(e) => handleFileChange('avatar', e)}
                        />
                     </FormControl>
                     <FormDescription>
                        This image will be used as Channels Avatar.
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               name="coverImage"
               render={() => (
                  <FormItem>
                     <FormLabel className="text-xl">
                        Upload Your Cover Image
                     </FormLabel>
                     <FormControl>
                        <Input
                           type="file"
                           {...register('coverImage')}
                           onChange={(e) => handleFileChange('coverImage', e)}
                        />
                     </FormControl>
                     <FormDescription>
                        This image will be used as CoverImage.
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button type="submit">
               {loading ? <BeatLoader color="#05313d" /> : 'Submit'}
            </Button>
         </form>
      </Form>
   );
};

export default Uploads;
