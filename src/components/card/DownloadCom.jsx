"use client";

import { checkPayment } from "@/app/actions";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { LiaSpinnerSolid } from "react-icons/lia";

const DownloadCom = ({ filePath, session, subtitleId }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const downloadFile = async () => {
    setLoading(true);
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "bangla-subtitle";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("There was an error downloading the file:", error);
    } finally {
      setLoading(false);
    }
  };

  const paymentCreate = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/payment", {
        method: "POST",
        body: JSON.stringify({ path: pathname, subtitleId }),
      });
      const result = await response.json();
      console.log(result);
      window.location.href = result.bkashURL;
      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const downloadMechanism = async () => {
    if (!session?.user?.email) {
      router.push("/login?back=true");
    } else {
      const paymentComplete = await checkPayment(subtitleId);
      if (paymentComplete) {
        downloadFile();
      } else {
        paymentCreate();
      }
    }
  };

  return (
    <button
      onClick={downloadMechanism}
      disabled={loading}
      className="flex gap-4 items-center justify-center m-4 disabled:bg-opacity-60 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded hover:bg-gradient-to-l duration-500"
    >
      <FaCloudDownloadAlt /> {loading && <LiaSpinnerSolid />} Download
    </button>
  );
};

export default DownloadCom;
