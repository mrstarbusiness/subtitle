
import Banner from "@/components/common/Banner";
import Description from "@/components/common/Description";
import InfiniteListMovies from "@/components/common/InfiniteListMovies";
import SidebarSection from "@/components/home/SidebarSection";

const AllMovies = () => {
  return (
    <div className="">
      <div className="mx-auto">
        <Banner
          imageUrl="https://via.placeholder.com/800x200"
          title={"All Subtitle"}
          description={"Some content of all description"}
        />
        <div className="container mx-auto">
          <div className="flex gap-4">
            <div className="w-3/4">
              <Description
                title="About Our Platform"
                description="This platform is designed for everyone in Pakundia Upazila. Our goal is to help each other by providing useful information and services."
              />
              <div className="mt-8">
              <InfiniteListMovies type={"all"} />
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

export default AllMovies;
