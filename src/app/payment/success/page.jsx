"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

const PaymentSuccess = () => {
  const searchparams = useSearchParams();
  const router = useRouter();

  let redirectUrl = searchparams.get("redirectUrl");

  setTimeout(() => {
    if(redirectUrl) {
      router.push(redirectUrl);
    }else {
      router.push('/');
    }
  }, 2000);

  return (
    <div className="flex justify-center p-24 flex-col h-screen">
      <div className="flex justify-center">
        <div className="">
          <Image src={'/assets/congratulations.gif'} height={400} width={400} alt="Congratulation subtitle" />
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
