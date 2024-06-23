/* eslint-disable @next/next/no-img-element */
import { auth } from "../../auth";
import DownloadCom from "./DownloadCom";


const CardDetail = async ({ subtitle }) => {
  const session = await auth();
  return (
    <div className="flex w-full h-[500px] border border-gray-300 rounded-lg shadow overflow-hidden">
      <div className="w-3/5 h-full">
        <img
          src={subtitle?.thumbnail}
          alt="Card"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-2/5 p-6 flex flex-col justify-between">
        <div className="text-sm">
          <h2 className="text-2xl font-bold mb-2">{subtitle?.title}</h2>
          <h2 className="text-md font-semibold mb-2 capitalize">
            {" "}
            Uploader : {subtitle?.author?.name}
          </h2>
          <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
            <div className="text-gray-600">Year</div>
            <div className="capitalize">: &nbsp; &nbsp;{subtitle?.year}</div>
            <div className="text-gray-600">Industry</div>
            <div className="capitalize">: &nbsp; &nbsp;{subtitle?.language}</div>
            <div className="text-gray-600">Release Name</div>
            <div className="capitalize">: &nbsp; &nbsp;{subtitle?.releaseName}</div>
            <div className="text-gray-600">Release Type</div>
            <div className="capitalize">: &nbsp; &nbsp;{subtitle?.releaseType}</div>
            <div className="text-gray-600">Production Type</div>
            <div className="capitalize">: &nbsp; &nbsp;{subtitle?.productionType}</div>
            <div className="text-gray-600">Run Time</div>
            <div className="capitalize">: &nbsp; &nbsp;{subtitle?.runtime}</div>
            <div className="text-gray-600">Framerate</div>
            <div className="capitalize">: &nbsp; &nbsp;{subtitle?.framerate}</div>
            <div className="text-gray-600">Rating of User</div>
            <div className="capitalize">: &nbsp; &nbsp; 4.7</div>
            <div className="text-gray-600">Genre</div>
            <div className="capitalize">: &nbsp; &nbsp;{subtitle?.genre}</div>
            <div className="text-gray-600">Release Info</div>
            <div className="capitalize">: &nbsp; &nbsp;{subtitle?.releaseInfo}</div>
          </div>
        </div>
        <DownloadCom filePath={subtitle?.filePath} session={session} subtitleId={subtitle?._id} />
      </div>
    </div>
  );
};

export default CardDetail;
