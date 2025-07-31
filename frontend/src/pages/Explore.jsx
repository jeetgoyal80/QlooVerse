import React from "react";
import ExploreCard from "../components/Explorecard";

const exploreData = [
  {
    category: "Travel",
    title: "Hidden Gems in Bali",
    description: "Discover untouched beaches, cliff cafés, and cultural spots in Bali.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT26sCSFCBRiss1aCY7ZtH6WVmNevSoG31JoA&s",
  },
  {
    category: "Travel",
    title: "Himalayan Monsoon Escapes",
    description: "Rainy-season hideouts from tea valleys to foggy peaks.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR9uoNNRdGyPLv6ThLkMEbeS3DHr0CtyktaA&s",
  },
  {
    category: "Food",
    title: "Top Ramen Spots in Tokyo",
    description: "A bowl-by-bowl trip across Tokyo’s best ramen bars.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxexEueSKoBqNn016Cbj2F5vkw61JumZONUA&s",
  },
  {
    category: "Movies",
    title: "Mind-Bending Thrillers",
    description: "Films like Inception, Interstellar, and beyond—picked by users like you.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXr4ZIvm9bFKcAvph4SSnJDjXPAujRVCdPpA&s",
  },
];

export default function Explore() {
  return (
   <div className="w-full min-h-screen px-6 py-10 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
  {/* Your content goes here */}
      <h1 className="text-4xl font-bold mb-4 text-center text-gray-900 dark:text-white">
        Explore Recommendations 🌍
      </h1>
      <p className="text-center mb-10 text-gray-600 dark:text-gray-400">
        Community-curated suggestions tailored by AI.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {exploreData.map((item, index) => (
          <ExploreCard
            key={index}
            image={item.image}
            title={item.title}
            category={item.category}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}
