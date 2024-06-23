import Signup from "@/components/auth/SignUp";
import { redirect } from "next/navigation";
import { auth } from "../../../auth";

const SingupPage = async () => {
  const session = await auth();

  if(session && session?.user) {
    redirect('/dashboard')
  }
  return (
    <div className="">
      <Signup />
    </div>
  );
};

export default SingupPage;
