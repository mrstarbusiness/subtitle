"use client";
import { getRatingSubtitle, ratingSubmit } from "@/app/actions";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import { SlActionRedo } from "react-icons/sl";

const RatingFeedback = ({ subtitle }) => {
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [comments, setComments] = useState([]);

  const getComments = async () => {
    const response = await fetch(`/api/comment?subtitleId=${subtitle._id}`, {
      method: "GET",
    });
    const result = await response.json();
    setComments(result?.comments);
  };

  const getRating = async () => {
    const rating = await getRatingSubtitle(subtitle?._id);
    setRating(rating);
  }

  useEffect(() => {
    getComments();
    getRating();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (feedback) {
      try {
        setLoading(true);
        const data = {
          comment: feedback,
          subtitleId: subtitle._id,
        };
        const response = await fetch("/api/comment", {
          method: "POST",
          body: JSON.stringify(data),
        });
        const result = await response.json();

        if (result?.success) {
          // toast message
          setFeedback("");
          console.log(result);
          getComments();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRating = async (value) => {
    let previousRating = rating;
    setRating(value);
    try {
      const response = await ratingSubmit(subtitle?._id, value);
      console.log(response);
      if(response?.success ) {
        setRating(value);
      }else {
        setRating(previousRating);
      }
    } catch (error) {
      console.log(error);
      console.log(error?.message);
      setRating(previousRating)
    }
  };

  return (
    <div className="w-[500px] pl-8">
      <h2 className="text-xl font-semibold mb-4">Rate and Give Feedback</h2>

      <div className="flex items-center mb-4">
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;
          return (
            <label key={index}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => handleRating(ratingValue)}
                className="hidden"
              />
              <FaStar
                className={`cursor-pointer text-3xl ${
                  ratingValue <= (hover || rating)
                    ? "text-purple-500"
                    : "text-gray-300"
                }`}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border rounded mb-4"
          rows="3"
          placeholder="Leave your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex gap-2 items-center justify-center disabled:bg-opacity-60 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded hover:bg-gradient-to-l duration-500"
          >
            <SlActionRedo /> {loading && <ImSpinner9 />} Comment
          </button>
        </div>
      </form>
      <h3 className="text-lg font-semibold mt-6 mb-4">
        Comments ({comments?.length})
      </h3>
      <ul className="space-y-4">
        {comments.map((comment) => (
          <li
            key={comment._id}
            className="border-b pb-4 flex items-center gap-4"
          >
            {/* <img
              src={comment.imageUrl}
              alt={comment.author}
              className="w-8 h-8 rounded-full mr-4"
            /> */}

            <div className="h-8 w-8 bg-gray-400 text-red-500 capitalize rounded-full flex justify-center items-center">
              {" "}
              {comment?.user?.name[0]}
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-900 capitalize">
                {comment.user?.name}
              </p>
              <p className="text-xs">{comment.comment}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RatingFeedback;
