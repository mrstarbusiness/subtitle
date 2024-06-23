"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const UploadForm = ({basicData}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const  jsonToFormData = (json) => {
    const formData = new FormData();
  
    for (const key in json) {
      if (json.hasOwnProperty(key)) {
        formData.append(key, json[key]);
      }
    }
  
    return formData;
  }

  async function onHandleSubmit(data) {

    const formData = jsonToFormData({...data, ...basicData});

    formData.append("file", data.filePath[0] );
    formData.append("allowedMimeTypes", [
      "application/x-subrip"
    ]);
    formData.append("fileSizeLimit", "1048576");
    
    try {
      setLoading(true);
      const res = await fetch("/api/subtitle", {
        method: "POST",
        body: formData
      });
      if (res.status === 201) {
        reset();
        router.push('/dashboard/my-subtitle')
      }
    } catch (error) {
      setError(error.message);
    } finally{
      setLoading(false);
    }
  }

  const onSubmit = (data) => {
    onHandleSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          File [only .srt file support]
        </label>
        <input
        type="file"
          {...register("filePath", { required: "File Path is required" })}
          className={`w-full px-3 py-2 border ${
            errors.filePath ? "border-red-500" : "border-gray-300"
          } rounded-md`}
          placeholder="File Path"
        />
        {errors.filePath && (
          <p className="text-red-500 text-sm mt-1">{errors.filePath.message}</p>
        )}
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Release Name
        </label>
        <input
          {...register("releaseName", { required: "Release Name is required" })}
          className={`w-full px-3 py-2 border ${
            errors.releaseName ? "border-red-500" : "border-gray-300"
          } rounded-md`}
          placeholder="Release Name"
        />
        {errors.releaseName && (
          <p className="text-red-500 text-sm mt-1">
            {errors.releaseName.message}
          </p>
        )}
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Release Info
        </label>
        <textarea
          {...register("releaseInfo", { required: "Release Info is required" })}
          className={`w-full px-3 py-2 border ${
            errors.releaseInfo ? "border-red-500" : "border-gray-300"
          } rounded-md`}
          placeholder="Release Info"
        />
        {errors.releaseInfo && (
          <p className="text-red-500 text-sm mt-1">
            {errors.releaseInfo.message}
          </p>
        )}
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Runtime
        </label>
        <input
          {...register("runtime", { required: "Runtime is required" })}
          className={`w-full px-3 py-2 border ${
            errors.runtime ? "border-red-500" : "border-gray-300"
          } rounded-md`}
          placeholder="Runtime"
        />
        {errors.runtime && (
          <p className="text-red-500 text-sm mt-1">{errors.runtime.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Select Production Type
        </label>
        <select
          {...register("productionType", {
            required: "productionType is required",
          })}
          className={`w-full px-3 py-2 border ${
            errors.productionType ? "border-red-500" : "border-gray-300"
          } rounded-md`}
        >
          <option value="">Select Production Type</option>
          <option value="transcript">Transcript</option>
          <option value="translated">Translated</option>
          <option value="improved">Improved</option>
          <option value="machine_translated">Machine translated</option>
        </select>
        {errors.productionType && (
          <p className="text-red-500 text-sm mt-1">
            {errors.productionType.message}
          </p>
        )}
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Release Type
        </label>
        <select
          {...register("releaseType", { required: "releaseType is required" })}
          className={`w-full px-3 py-2 border ${
            errors.releaseType ? "border-red-500" : "border-gray-300"
          } rounded-md`}
        >
          <option value="">Select Release Type</option>
          <option value="Don't know">Don&apos;t Know</option>
          <option value="Blu-Ray">BDRip</option>
          <option value="Blu-Ray">Blu-Ray</option>
          <option value="BrRip">BrRip</option>
          <option value="CDRip">CDRip</option>
          <option value="DVD">DVD</option>
          <option value="DVDRip">DVDRip</option>
          <option value="DVDScr">DVDScr</option>
          <option value="CamRip">CamRip</option>
          <option value="HDRip">HDRip</option>
          <option value="HDTV">HDTV</option>
          <option value="PreDVD">PreDVD</option>
          <option value="RayRip">RayRip</option>
          <option value="WEB-DL">WEB-DL</option>
          <option value="WEBHD">WEBHD</option>
          <option value="WEBRip">WEBRip</option>
        </select>
        {errors.framerate && (
          <p className="text-red-500 text-sm mt-1">
            {errors.framerate.message}
          </p>
        )}
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Select Framerate
        </label>
        <select
          {...register("framerate", { required: "Framerate is required" })}
          className={`w-full px-3 py-2 border ${
            errors.framerate ? "border-red-500" : "border-gray-300"
          } rounded-md`}
        >
          <option value="">Select Framerate</option>
          <option value="23.976">23.976</option>
          <option value="23.980">23.980</option>
          <option value="24.000">24.000</option>
          <option value="25.000">25.000</option>
          <option value="29.970">29.970</option>
          <option value="30.000">30.000</option>
        </select>
        {errors.framerate && (
          <p className="text-red-500 text-sm mt-1">
            {errors.framerate.message}
          </p>
        )}
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Select Movie Type
        </label>
        <select
          {...register("titleType", { required: "Type is required" })}
          className={`w-full px-3 py-2 border ${
            errors.framerate ? "border-red-500" : "border-gray-300"
          } rounded-md`}
        >
          <option value="">Select Title Type</option>
          <option value="Movie">Movie</option>
          <option value="Tv Series">Tv Series</option>
        </select>
        {errors.titleType && (
          <p className="text-red-500 text-sm mt-1">
            {errors.title_type.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-md"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
};

export default UploadForm;
