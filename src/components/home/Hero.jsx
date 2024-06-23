import { getConfigurationByType } from "@/app/actionfrons";
import HeroHeader from "./HeroHeader";
import Search from "./Search";

const Hero = async () => {
  const genres = await getConfigurationByType("GENRES");
  const genresList = genres?.configuration?.value ? genres?.configuration?.value.split(",") : [];

  // const industries = await getConfigurationByType("INDUSTRIES");
  // const industriesList = industries?.configuration?.value ? industries?.configuration?.value.split(",") : [];

  const languageList = ["English", "Hindi", "Tamil", "Spanis"];

  return (
    <section className="bg-[#F6F3E9] max-h-[80vh] relative grid place-items-center  bg-cover bg-no-repeat bg-center">
      <div className="container items-center p-12 ">
        <div className="col-span-7">
          <HeroHeader />
          <p className="my-2 text-[#5f5e5e] text-center">
            We have 459k subtitle spread throuout Indonesia with room standards
            equivalent to 5 star rating.
          </p>
          <Search genresList={genresList} industriesList={languageList} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
