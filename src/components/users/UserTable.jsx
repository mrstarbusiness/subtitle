import { statusToggle } from "@/app/actions";

const UserTable = ({ users, type }) => {
  const handleSubmit =  async (formData) => {
    "use server";
    const data = {
      status : formData.get('status'),
      id : formData.get('id'),
    }

    await statusToggle(data)
  }
    return (
      <div className="ml-8 p-4">
        <h4 className="p-2 text-2xl font-semibold">{type}</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">Name</th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">Email</th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">Image</th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">Status</th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">Total Uploads</th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">Total Downloads</th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b border-gray-200 text-sm">{user.name}</td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm">{user.email}</td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm">
                    <img src={user.image ?? "https://static.vecteezy.com/system/resources/previews/002/002/297/non_2x/beautiful-woman-avatar-character-icon-free-vector.jpg"} alt={user.name} className="w-10 h-10 rounded-full" />
                  </td>
                  <td className={`py-2 px-4 border-b border-gray-200 text-sm font-medium ${user.status === 1 ? 'text-green-600' : 'text-red-600'}`}>{user.status == 1 ? 'Active' : 'Inactive'}</td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm">{user.totalUploads ?? 0}</td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm">{user.totalDownloads ?? 0}</td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm">
                    <form action={handleSubmit}>
                      <input type="hidden" name="status" value={user.status} />
                      <input type="hidden" name="id" value={user.id} />
                      <button type="submit" className={`px-2 py-1  ${user.status === 1 ? 'bg-red-600' : 'bg-cyan-600'} rounded-md hover:bg-opacity-70 duration-500 text-white`}> {user.status == 2 ? 'Active' : 'Inactive'}</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default UserTable;
  