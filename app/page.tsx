import { getCurrentSession } from "@/actions/auth";

export default async function Home() {
  const { user } = await getCurrentSession();
  return (
    <div className="h-[200vh]">
      {user?.id} <br/>
      {user?.email} <br/>
      
    </div>
  );
}
