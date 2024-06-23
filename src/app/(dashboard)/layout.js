import Navbar from "@/components/dashboard/Navbar";
import { redirect } from "next/navigation";
import { auth } from "../../auth";

export default async function Layout({ children }) {
  const session = await auth();

  if(!session?.user?.email) {
    redirect('/login')
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
