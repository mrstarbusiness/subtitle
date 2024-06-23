import TabSubTitle from "../tabcontent/TabSubTitle";
import LatestTVSeries from "./LatestTVSeries";
import SidebarSection from "./SidebarSection";
import TopMovies from "./TopMovies";
import TopSubtitle from "./TopSubtitle";
import TopTranslator from "./TopTranslator";

export default function MainContent() {
  return (
    <div className="container p-4 flex ">
      <div className="w-3/4">
        <TabSubTitle />
        <TopSubtitle />
        <TopMovies />
        <LatestTVSeries />
        <TopTranslator />
      </div>
      <div className="w-1/4">
        <section>
          <SidebarSection />
        </section>
      </div>
    </div>
  );
}
