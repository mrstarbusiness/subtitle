import CardSingle from "@/components/card/CardSingle";
import DetailsCard from "@/components/card/DetailsCard";
import Banner from "@/components/common/Banner";
import Description from "@/components/common/Description";
import SidebarSection from "@/components/home/SidebarSection";

const cards = [
  {
    photo: "https://via.placeholder.com/100",
    title: "Card Title 1",
    subtitle: "Subtitle 1",
    author: "Author 1",
    authorPhoto: "https://via.placeholder.com/50",
    buttonLabel: "Download",
    buttonLink: "#",
  },
];

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
              <div className="mt-8 flex flex-col gap-6 shadow-lg rounded-md p-4">
                <DetailsCard />
                {cards.map((card, index) => (
                  <CardSingle
                    key={index}
                    photo={card.photo}
                    title={card.title}
                    subtitle={card.subtitle}
                    author={card.author}
                    authorPhoto={card.authorPhoto}
                    buttonLabel={card.buttonLabel}
                    buttonLink={card.buttonLink}
                  />
                ))}
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
