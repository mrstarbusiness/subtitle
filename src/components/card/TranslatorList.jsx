
import { getUsersByType } from "@/app/actionfrons";
import Link from "next/link";
import PersonCard from "./PersonCard";

const TranslatorList = async () => {

  const {users} = await getUsersByType('top_translator');

  return (
    <div className="">
      <div className="p-4 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {users.map((user, index) => (
          <PersonCard
            key={index}
            imageUrl={user.image ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw-j9iqm1llPzKoL9ABERnDFko52GiSGcu82YUdKJaRD_FpAfZe2PwNTKm3qQXnB88Gw0&usqp=CAU'}
            name={user.name}
            email={user.email}
            followers={user.followers}
          />
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Link
          href={'/all-contributor'}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 focus:outline-none"
        >
          All Translator
        </Link>
      </div>
    </div>
  );
};

export default TranslatorList;
