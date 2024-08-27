import { ReactNode } from "react";
//import { Dog } from "../types";
import { useDogCards } from "../providers/DogCardsProvider";

// type SectionContextType = {
//   dogsList: TDogList[];
//   currentView: TActiveTab;
//   handleFavoriteDogs: (id: number, isFavorite: boolean) => void;
//   handleCreateDogs: (dogs: Omit<Dog, "id">) => void;
//    children: React.ReactNode;
//   label: string;
// };

export const Section = ({
  label,
  children,
}: {
  // No more props than these two allowed
  label: string;
  children: ReactNode;
}) => {
  const { dogsList, currentView, setCurrentView } =
    useDogCards();
  const favoritedDogsCount = dogsList["favorite"].length;
  const unfavoritedDogsCount = dogsList["unfavorite"].length;
  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${currentView === "favorite" ? "active" : ""}`}
            onClick={() => setCurrentView("favorite")}
          >
            favorited ( {favoritedDogsCount} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${
              currentView === "unfavorite" ? "active" : ""
            }`}
            onClick={() => setCurrentView("unfavorite")}
          >
            unfavorited ( {unfavoritedDogsCount} )
          </div>
          <div
            className={`selector ${
              currentView === "createDog" ? "active" : ""
            }`}
            onClick={() => setCurrentView("createDog")}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};


//: React.FC<SectionContextType>