import { getRelatedSutitle } from "@/app/actionfrons";
import CardSingle from "./CardSingle";

const RelatedSubtitle = async ({subtitleId, subtitle}) => {
    const {subtitles} = await getRelatedSutitle(subtitleId, subtitle);


    return (
        <div className="py-8">
            <h4 className="text-xl font-semibold py-2">Related Subtitle</h4>

            {subtitles && subtitles.map((card, index) => (
                <CardSingle
                key={card?.id}
                data={card}
                />
            ))}
        </div>
    )
}

export default RelatedSubtitle;