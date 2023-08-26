"use client";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { toastError, toastSuccess } from "../lib/toasts";

export interface FeedBackInput {
  name?: string;
  rating?: number;
  email: string;
  comment: string;
}

interface StarRatingProps {
  rating: number;
  handleSetRating: (rating: number) => void;
}

const StarRating = (props: StarRatingProps) => {
  const { rating, handleSetRating } = props;
  const [hover, setHover] = useState(0);
  return (
    <div className="flex flex-row">
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            <input
              hidden
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleSetRating(ratingValue)}
            />
            <FaStar
              className="cursor-pointer"
              size={24}
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            />
          </label>
        );
      })}
    </div>
  );
};

const FeedbackButton = () => {
  const [showFeedback, setShowFeedback] = useState(false);
  const defaultFeedbackInput = {
    comment: "",
    email: "",
    name: undefined,
    rating: undefined,
  };
  const [feedbackInput, setFeedbackInput] = useState<FeedBackInput>({
    ...defaultFeedbackInput,
  });

  const handleSubmit = async () => {
    if (!feedbackInput.comment) {
      toastError("Please enter a comment");
      return;
    }
    if (!validateEmailInput(feedbackInput.email)) {
      toastError("Please enter a valid email address");
      return;
    }
    const res: any = await fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(feedbackInput),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      toastSuccess("Feedback submitted successfully");
    } else {
      toastError("Something went wrong");
    }
  };

  const handleCancel = () => {
    setFeedbackInput({
      ...defaultFeedbackInput,
    });
    setShowFeedback(false);
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFeedbackInput({ ...feedbackInput, [e.target.name]: e.target.value });
  };

  const validateEmailInput = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <div
      className={`fixed flex w-[600px] items-center flex-row bottom-0 -right-[512px] ease-in-out duration-300 
    ${showFeedback ? "-translate-x-[512px]" : "translate-x-0"}`}
    >
      <button
        className={`text-gray-500 shadow-lg rounded-md p-2 transform -rotate-90 translate-x-8 text-sm ${
          showFeedback
            ? " bg-primary-button text-white"
            : "bg-white hover:bg-primary-button hover:text-white"
        }`}
        onClick={() => setShowFeedback(!showFeedback)}
      >
        FEEDBACK
      </button>
      <div className="flex flex-col text-sm bg-white w-full h-48 shadow-md rounded-md px-4 py-2">
        <div className="flex flex-row items-center w-full gap-2">
          <div className="flex flex-col w-1/2">
            <label className="text-gray-500">Name</label>
            <input
              name="name"
              onChange={handleChange}
              value={feedbackInput.name}
              className="border border-gray-300 p-2 rounded-md grow"
              type="text"
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label className="text-gray-500">E-Mail Adress</label>
            <input
              name="email"
              value={feedbackInput.email}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md grow"
              type="text"
            />
          </div>
        </div>

        <div className="flex flex-col items-start">
          <label className="text-gray-500 after:content-['*'] after:text-red-500">
            Comment
          </label>
          <textarea
            name="comment"
            onChange={handleChange}
            className="w-full rounded-md p-2 border resize-none"
            value={feedbackInput.comment}
            rows={2}
          />
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="flex flex-row items-center gap-2">
            <label className="text-gray-500">Overall rating</label>
            <StarRating
              rating={feedbackInput.rating || 0}
              handleSetRating={(rating: number) => {
                setFeedbackInput({ ...feedbackInput, rating: rating });
              }}
            />
          </div>
          <div className="flex-grow" />
          <button
            className="bg-cancel-button text-white rounded-md p-2 mt-2 transition hover:bg-cancel-button-hover"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="bg-primary-button text-white rounded-md p-2 mt-2 transition hover:bg-primary-button-hover"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackButton;
