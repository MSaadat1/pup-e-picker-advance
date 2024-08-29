import { useDogCards } from "../providers/DogCardsProvider";
import { Dog } from "../types";
import { DogCard } from "./DogCard";

export const Dogs = () =>
  // no props allowed
  {
    const {
      dogsList,
      isLoading,
      currentView,
      handleFavoriteDogs,
      handleDeleteDogs,
    } = useDogCards();

    return (
      //  the "<> </>"" are called react fragments, it's like adding all the html inside
      // without adding an actual html element
      <>
        {dogsList[currentView].map((dog: Dog) => {
          const { id, isFavorite } = dog;
          return (
            <DogCard
              dog={dog}
              key={dog.id}
              onTrashIconClick={() => handleDeleteDogs(id)}
              onEmptyHeartClick={() => handleFavoriteDogs(id, !isFavorite)}
              onHeartClick={() => handleFavoriteDogs(id, !isFavorite)}
              isLoading={isLoading}
            />
          );
        })}
      </>
    );
  };
