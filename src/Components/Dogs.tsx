import { useDogCards } from "../providers/DogCardsProvider";
import { Dog } from "../types";
import { DogCard } from "./DogCard";

// Right now these dogs are constant, but in reality we should be getting these from our server
// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)
// const handleTrashClick = (dogId: number) => {
//   alert("hi");
// };

// const handleHeartClick = (dogId: number) => {
//   alert("hi");
// };

// const handleEmptyHeartClick = (dogId: number) => {
//   alert("hi");
// };
export const Dogs = () =>
  // no props allowed
  {
    const { dogsList, isLoading, currentView, handleFavoriteDogs, handleDeleteDogs } =
      useDogCards();

    return (
      //  the "<> </>"" are called react fragments, it's like adding all the html inside
      // without adding an actual html element
      <>
        {dogsList[currentView].map((dog: Dog) => {
          const{id, name, description, isFavorite,image} = dog;
          return(
          <DogCard
            dog={{id, image, description, isFavorite, name}}
            key={dog.id}
            onTrashIconClick={()=> handleDeleteDogs(id)}
            onEmptyHeartClick={()=> handleFavoriteDogs(id, !isFavorite)}
            onHeartClick={()=> handleFavoriteDogs(id, isFavorite)}
            isLoading={isLoading}
          />
          );
        })}
      </>
    );
  };
