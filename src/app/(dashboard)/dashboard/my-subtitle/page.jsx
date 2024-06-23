/* eslint-disable @next/next/no-img-element */
import { getSubtitles, statusToggle } from "@/app/actions";

const MySubtitle = async () => {
  const {subtitles} = await getSubtitles('my-subtile');

  const handleSubmit = async (formData) => {
    "use server";
    const data = {
      status: formData.get("status"),
      id: formData.get("id"),
    };

    await statusToggle(data, 'my-subtitle');
  };


  return (
    <div className="">
      <div className="ml-8 p-4">
        <h4 className="p-2 text-2xl font-semibold">Subtitle</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
                  Title
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
                  Run Time
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
                  Release Name
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
                  Status
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
                  Total Downloads
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {subtitles && subtitles.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b border-gray-200 text-sm">
                    {item.title}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm">
                    {item.runtime}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm">
                    {item.releaseName}
                  </td>
                  
                  <td
                    className={`py-2 px-4 border-b border-gray-200 text-sm font-medium ${
                      item.status === 1 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {item.status == 1 ? "Active" : "Inactive"}
                  </td>
                 
                  <td className="py-2 px-4 border-b border-gray-200 text-sm">
                    {item.totalDownloads ?? 0}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm">
                    <form action={handleSubmit}>
                      <input type="hidden" name="status" value={item.status} />
                      <input type="hidden" name="id" value={item.id} />
                      <button
                        type="submit"
                        className={`px-2 py-1  ${
                          item.status === 1 ? "bg-red-600" : "bg-cyan-600"
                        } rounded-md hover:bg-opacity-70 duration-500 text-white`}
                      >
                         {item.status == 2 ? "Active" : "Inactive"}
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {subtitles && subtitles.length == 0 && <tr>
                <td colSpan={6} className="text-center p-2">No Subtitle Found</td>
                </tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MySubtitle;
