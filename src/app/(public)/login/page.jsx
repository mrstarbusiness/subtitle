import Login from "@/components/auth/Login";
import { redirect } from "next/navigation";
import { auth } from "../../../auth";
const LoginPage = async () => {
  const session = await auth();

  console.log("login session ", session);
  if(session?.user?.email) {
    redirect('/dashboard');
  }
  return (
    <div className="">
      <Login />
    </div>
  );
};

export default LoginPage;
