import React from "react";

const ContestCard = ({ title, venue, imgSrc, description }) => {
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden w-full md:w-1/2 lg:w-1/3 m-4">
      {/* Image Placeholder */}
      <div className="h-48 bg-gray-300">
        <img
          src={imgSrc}
          alt={title}
          className="object-cover h-full w-full"
        />
      </div>
      
      {/* Contest Content */}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-500 italic mb-2">Venue: {venue}</p>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

const ContestList = () => {
  const contests = [
    {
      title: "Treasure Hunt - Chitkara Adventure",
      venue: "Chitkara University",
      imgSrc: "https://via.placeholder.com/400x300",
      description: "Join the treasure hunt at Chitkara University and solve exciting challenges!",
    },
    {
      title: "Treasure Hunt - Mansa Expedition",
      venue: "Mansa",
      imgSrc: "https://via.placeholder.com/400x300",
      description: "Explore Mansa in search of hidden treasures and tackle mind-bending puzzles!",
    },
    {
      title: "Treasure Hunt - Shimla Mountain Quest",
      venue: "Shimla",
      imgSrc: "https://via.placeholder.com/400x300",
      description: "Uncover the mysteries of Shimla with this adventurous treasure hunt.",
    },
    {
      title: "Treasure Hunt - Kurukshetra Legends",
      venue: "Kurukshetra",
      imgSrc: "https://via.placeholder.com/400x300",
      description: "Discover Kurukshetra's hidden history through a thrilling treasure hunt.",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center">
      {contests.map((contest, index) => (
        <ContestCard
          key={index}
          title={contest.title}
          venue={contest.venue}
          imgSrc={contest.imgSrc}
          description={contest.description}
        />
      ))}
    </div>
  );
};

export default ContestList;
