import { getUserById } from "@/app/actionfrons";
import UserDetailsCard from "@/components/card/UserDetailsCard";
import Banner from "@/components/common/Banner";
import Description from "@/components/common/Description";
import SidebarSection from "@/components/home/SidebarSection";

const user = {
    imageUrl: 'https://via.placeholder.com/150',
    name: 'John Doe',
    email: 'john.doe@example.com',
    followers: 1200,
  };

const Contributor = async ({params}) => {

  const contributor = await getUserById(params.id);

  return (
    <div className="">
      <div className="mx-auto">
        <Banner
          imageUrl="https://via.placeholder.com/800x200"
          title={"Contributor"}
          description={"Some content of all description"}
        />
        <div className="container mx-auto">
          <div className="flex gap-4">
            <div className="w-3/4">
              <Description
                title="About Our Platform"
                description="This platform is designed for everyone in Pakundia Upazila. Our goal is to help each other by providing useful information and services."
              />
              <div className="mt-8 flex flex-col gap-6 shadow-lg rounded-md p-4">
              <UserDetailsCard user={contributor} />
              </div>
            </div>
            <div className="w-1/4">
              <SidebarSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contributor;
