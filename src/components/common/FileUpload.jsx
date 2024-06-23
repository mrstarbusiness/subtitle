import Link from "next/link";
import { FaFileArrowUp } from "react-icons/fa6";

const FileUpload = () => {
  return (
    <div className="max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex justify-center mt-8">
        <FaFileArrowUp className="w-12 h-12" />
      </div>
      <div className="text-center mt-2">
        <h3 className="text-gray-900 text-2xl font-semibold">
          Upload Subtitle
        </h3>
      </div>
      <div className="text-center mt-2">
        <p className="text-gray-600 p-4">
          Dear Author/Contributor, Please upload your translated subtitles from
          here
        </p>
      </div>
      <div className="flex justify-center mt-4 mb-8">
        <Link href="/dashboard/upload-subtitle"><label
          htmlFor="file-upload"
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded hover:opacity-90 cursor-pointer"
        >
          Upload
          {/* <input id="file-upload" type="file" className="hidden" /> */}
        </label></Link>
      </div>
    </div>
  );
};

export default FileUpload;
