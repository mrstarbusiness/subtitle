import { getUsersByType } from "@/app/actionfrons";
import TopContributor from "../card/TopContributor";

const Contributor = async () => {
  const {users} = await getUsersByType('top_five_uploaders');
  return (
    <div className="mt-8">
      <h2 className="flex items-center gap-4 justify-center text-2xl font-semibold text-center mb-4">
        Top 5 Contributor
      </h2>
      <div className="">
        <div className="p-4 space-y-4">
          {users && users.map((contributor, index) => (
            <TopContributor
              key={index}
              image={contributor.image}
              name={contributor.name}
              subs={contributor?.uploads}
              id={contributor?._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contributor;
