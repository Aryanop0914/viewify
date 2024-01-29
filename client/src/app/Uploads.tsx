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

const Uploads = () => {
   const [files, setFiles] = useState({ avatar: '', coverImage: '' });
   const form = useForm();
   const { register, handleSubmit } = useForm();

   const handleFileChange = (fieldName: any, e: any) => {
      setFiles({
         ...files,
         [fieldName]: e.target.files[0], // Assuming only one file is selected
      });
   };
   const fd = new FormData();
   fd.append('avatar', files.avatar);
   fd.append('coverImage', files.coverImage);
   const onSubmitUpload = () => {
      const accessToken = document.cookie
         .split('; ')
         .find((row) => row.startsWith('accessToken='))
         ?.split('=')[1];
      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
         },
         withCredentials: true,
      };

      axios
         .post('http://localhost:8000/api/v1/users/uploads', fd, config)
         .then((res) => {
            console.log(res);
         })
         .catch((error) => {
            console.error('Error fetching user data:', error);
         });
   };

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
            <Button type="submit">Upload</Button>
         </form>
      </Form>
   );
};

export default Uploads;
