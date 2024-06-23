import SeeMoreBtn from "../common/SeeMoreBtn";
import CardSingle from "./CardSingle";


const CardList = ({subtitles, type}) => {
  console.log("type", type);
  return (
    <div className="p-4">
      {subtitles && subtitles.map((card, index) => (
        <CardSingle
          key={card?.id}
          data={card}
        />
      ))}
      <div className="flex justify-center mt-8">
        <SeeMoreBtn  type={type} />
      </div>
    </div>
  );
};

export default CardList;
