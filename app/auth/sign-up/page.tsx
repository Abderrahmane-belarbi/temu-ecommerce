import { getCurrentSession, loginUser, registerUser } from "@/actions/auth";
import SignUp from "@/app/components/auth/SignUp";
import { redirect } from "next/navigation";
import zod, { object } from 'zod';

const SignUpSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(5)
})

export default async function SignupPage() {
  const { user } = await getCurrentSession();
  if(user) { // if the user is already logged in
    return redirect('/');
  }

  const action = async (prevState: any, formData: FormData) => {
    'use server';
    const parsed = SignUpSchema.safeParse(Object.fromEntries(formData));
    if(!parsed.success) {
      return {
        message: 'Invalid form data'
      }
    }
    const { email, password } = parsed.data;
    const { user, error } = await registerUser(email, password);
    if(error) {
       return { message: error };
    } else if (user) {
      await loginUser(email, password);
      await redirect('/');
    }
  }

  return <SignUp />
}