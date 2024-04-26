import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form';
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
// import { toast } from '@/registry/new-york/ui/use-toast';
import BeatLoader from 'react-spinners/BeatLoader';
import axios from 'axios';

const profileFormSchema = z.object({
   channelName: z
      .string()
      .min(2, {
         message: 'Username must be at least 2 characters.',
      })
      .max(30, {
         message: 'Username must not be longer than 30 characters.',
      }),
   bio: z.string().max(160).min(4),
   dob: z.date({
      required_error: 'A date of birth is required.',
   }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
   channelName: '',
   bio: 'I own a computer.',
   dob: new Date(),
};

const UpdateProfile = () => {
   const [userinfo, setUserInfo] = useState({
      channelName: '',
      dob: '',
      bio: '',
   });
   const [loading, setLoading] = useState(false);
   const form = useForm<ProfileFormValues>({
      resolver: zodResolver(profileFormSchema),
      defaultValues,
      mode: 'onChange',
   });

   const config = {
      withCredentials: true,
   };
   const onSubmit = async (data: ProfileFormValues) => {
      setLoading(true);
      axios
         .patch(
            'http://localhost:8000/api/v1/users/update-account',
            data,
            config
         )
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
   const getUserinfo = async () => {
      try {
         const info = await axios.get(
            'http://localhost:8000/api/v1/users/current-user',
            config
         );
         setUserInfo(info.data.data);
      } catch (error) {
         console.log(error);
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
   useEffect(() => {
      getUserinfo();
   }, []);
   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
               control={form.control}
               name="channelName"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel className="text-xl">Channel Name</FormLabel>
                     <FormControl>
                        <Input placeholder={userinfo.channelName} {...field} />
                     </FormControl>
                     <FormDescription>
                        This is your public Channel name. It can be your real
                        name or a pseudonym. You can only change this once every
                        30 days.
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="bio"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel className="text-xl">Bio</FormLabel>
                     <FormControl>
                        <Textarea
                           placeholder={
                              userinfo.bio || 'Tell us about Yourself'
                           }
                           className="resize-none"
                           {...field}
                        />
                     </FormControl>
                     <FormDescription>
                        You can <span>@mention</span> other users and
                        organizations to NavLink to them.
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="dob"
               render={({ field }) => (
                  <FormItem className="flex flex-col">
                     <FormLabel className="text-xl">Date of birth</FormLabel>
                     <Popover>
                        <PopoverTrigger asChild>
                           <FormControl>
                              <Button
                                 variant={'outline'}
                                 className={cn(
                                    'w-[240px] pl-3 text-left font-normal',
                                    !field.value && 'text-muted-foreground'
                                 )}
                              >
                                 {field.value ? (
                                    format(field.value, 'PPP')
                                 ) : (
                                    <span>Pick a date</span>
                                 )}
                                 <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                           </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                           <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                 date > new Date() ||
                                 date < new Date('1900-01-01')
                              }
                              initialFocus
                           />
                        </PopoverContent>
                     </Popover>
                     <FormDescription>
                        Your date of birth is used to calculate your age.
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

export default UpdateProfile;
