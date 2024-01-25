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
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

const Uploads = () => {
   const form = useForm();
   return (
      <Form {...form}>
         <form className="space-y-8">
            <FormField
               name="avatar"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel className="text-xl">
                        Upload Your Avatar
                     </FormLabel>
                     <FormControl>
                        <Input type="file" {...field} />
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
               render={({ field }) => (
                  <FormItem>
                     <FormLabel className="text-xl">
                        Upload Your Cover Image
                     </FormLabel>
                     <FormControl>
                        <Input type="file" {...field} />
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
