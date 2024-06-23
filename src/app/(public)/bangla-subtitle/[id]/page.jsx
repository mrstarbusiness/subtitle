import { getSubtitleById } from "@/app/actionfrons";
import CardDetail from "@/components/card/CardDetail";
import RatingFeedback from "@/components/card/RatingFeedback";
import RelatedSubtitle from "@/components/card/RelatedSubtitle";

const page = async ({ params }) => {
  const { id } = params;
  const [subtitleId] = id.split("-");

  const response = await getSubtitleById(subtitleId);

  return (
    <div className="container mx-auto h-auto p-10 mt-4 flex justify-center">
      <div className="">
        <CardDetail subtitle={response?.subtitle} />
        <RelatedSubtitle subtitleId={subtitleId} subtitle={response?.subtitle} />
      </div>
      <RatingFeedback subtitle={response?.subtitle} />
    </div>
  );
};

export default page;
