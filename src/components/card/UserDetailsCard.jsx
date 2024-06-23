
const UserDetailsCard = ({ user }) => {
  return (
    <div className="max-w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-8">
      <div className="flex justify-center mt-4">
        <img 
          className="w-24 h-24 rounded-full" 
          src={user.image ?? 'https://i.pngimg.me/thumb/f/720/m2H7K9A0b1d3b1m2.jpg'} 
          alt="User Profile" 
        />
      </div>
      <div className="text-center mt-4">
        <h2 className="text-2xl font-semibold">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
      </div>
      <div className="text-center mt-4">
        <p className="text-gray-600">Total Upload: {user?.uploads?.length}</p>
      </div>
      <div className="text-center my-4">
        {/* <button className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-4 py-2 rounded-full shadow-md">
          Follow
        </button> */}
      </div>
    </div>
  );
};

export default UserDetailsCard;
