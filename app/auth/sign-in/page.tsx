import { getCurrentSession, loginUser } from "@/actions/auth";
import SignIn from "@/app/components/auth/SignIn";
import { redirect } from "next/navigation";
import zod from 'zod';

const SignInSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(5)
})

export default async function SignInPage() {
  const { user } = await getCurrentSession();
  if(user) { // if the user is already logged in
    return redirect('/');
  }

  const action = async (prevState: any, formData: FormData) => {
    'use server';
    const parsed = SignInSchema.safeParse(Object.fromEntries(formData));
    if(!parsed.success) {
      return {
        message: 'Invalid form data'
      }
    }
    const { email, password } = parsed.data;
    const { user, error } = await loginUser(email, password);
    if(error) {
       return { message: error };
    } else if (user) {
      return redirect('/');
    }
  }

  return <SignIn action={action} />
}