import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { useDogCards } from "../providers/DogCardsProvider";
import toast from "react-hot-toast";

export const CreateDogForm = () =>
  // no props allowed
  {
    const [selectedImage, setSelectedImage] = useState(dogPictures.BlueHeeler);
    const [dogName, setDogName] = useState("");
    const [dogDescription, setDogDescription] = useState("");

    const { isLoading, handleCreateDogs } = useDogCards();

    const reset = () => {
      setDogName("");
      setDogDescription("");
      setSelectedImage(dogPictures.BlueHeeler);
    };

    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateDogs({
            name: dogName,
            image: selectedImage,
            description: dogDescription,
            isFavorite: false,
          })
            .then(() => {
              reset();
            })
            .catch(() => toast.error("Could not create new Dog!"));
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          disabled={isLoading}
          value={dogName}
          onChange={(e) => {
            setDogName(e.target.value);
          }}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name=""
          id=""
          cols={80}
          rows={10}
          disabled={isLoading}
          value={dogDescription}
          onChange={(e) => {
            setDogDescription(e.target.value);
          }}
        ></textarea>
        <label htmlFor="picture">Select an Image</label>
        <select
          id=""
          onChange={(e) => {
            setSelectedImage(e.target.value);
          }}
          value={selectedImage}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" disabled={isLoading} />
      </form>
    );
  };
