import { ReactNode } from "react";
import { useDogCards } from "../providers/DogCardsProvider";

export const Section = ({
  label,
  children,
}: {
  // No more props than these two allowed
  label: string;
  children: ReactNode;
}) => {
  const { favoritedDogsCount, unfavoritedDogsCount, currentView, setCurrentView, handleActiveTab } = useDogCards();

  
  
  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${currentView === "favorite" ? "active" : ""}`}
            onClick={() => handleActiveTab("favorite")}
          >
            favorited ( {favoritedDogsCount} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${
              currentView === "unfavorite" ? "active" : ""
            }`}
            onClick={() => handleActiveTab("unfavorite")}
          >
            unfavorited ( {unfavoritedDogsCount} )
          </div>
          <div
            className={`selector ${
              currentView === "createDog" ? "active" : ""
            }`}
            onClick={() => handleActiveTab("createDog")}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};

