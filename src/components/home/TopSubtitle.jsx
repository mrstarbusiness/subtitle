import { getSubtitle } from "@/app/actionfrons";
import CardList from "../card/CardList";

const TopSubtitle = async () => {
  const topSubtitles = await getSubtitle('top-subttile');
  return (
    <div className="p-2">
      <h3 className="ml-2 text-2xl font-semibold ">Top SubTitle</h3>
      <CardList subtitles={topSubtitles.subtitles ?? []}  type="top-subttile" />
    </div>
  );
};

export default TopSubtitle;
