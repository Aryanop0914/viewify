import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
   email: z.string().email({
      message: 'Email is not valid',
   }),
   password: z
      .string()
      .min(8, { message: 'Your Password Has atleast 8 characters' }),
});

const Login = () => {
   const navigate = useNavigate();
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         email: '',
         password: '',
      },
   });
   const onSubmit = (values: z.infer<typeof formSchema>) => {
      console.table(values);
   };

   return (
      <Form {...form}>
         <div className="w-full h-screen flex items-center justify-center">
            <div className="w-[360px] min-[470px]:w-[450px] border-2 p-8 space-y-4 rounded-xl shadow-sm">
               <div className="flex justify-end ">
                  <Button
                     variant="outline"
                     onClick={() => {
                        navigate('/register');
                     }}
                  >
                     Signup
                  </Button>
               </div>
               <form className="space-y-4 mb-4">
                  <header className="text-center text-3xl pb-2 font-semibold">
                     <p>Login</p>
                  </header>
                  <FormField
                     control={form.control}
                     name="email"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel className="text-lg">Email</FormLabel>
                           <FormControl>
                              <Input type="email" {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="password"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel className="text-lg">Password</FormLabel>
                           <FormControl>
                              <Input type="password" {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <Button
                     onClick={form.handleSubmit(onSubmit)}
                     className="w-full"
                  >
                     Submit
                  </Button>
               </form>
               <div className="flex justify-between items-center">
                  <Separator className="w-1/4 " />
                  <p className="text-muted-foreground">OR CONTINUE WITH</p>
                  <Separator className="w-1/4" />
               </div>
               <Button onClick={() => navigate('/')} className="w-full">
                  Log in with Google
               </Button>
            </div>
         </div>
      </Form>
   );
};

export default Login;
