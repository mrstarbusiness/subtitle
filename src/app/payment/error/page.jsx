"use client";

import { useRouter, useSearchParams } from "next/navigation";

const PaymentError = () => {
    const searchparams = useSearchParams();
    const router = useRouter();

    return (
        <div className='flex justify-center p-24 flex-col h-screen'>
      <div className="flex justify-center gap-4">
      <h2 className="capitalize">{searchparams.get("message")}</h2>
      <button className="underline"
        onClick={
          () => {
            router.push('/');
          }
        }
      >
        Try again got to home
      </button>
      </div>
    </div>
    )
}

export default PaymentError;