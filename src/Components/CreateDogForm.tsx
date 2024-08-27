import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { useDogCards } from "../providers/DogCardsProvider";
import toast from "react-hot-toast";

export const CreateDogForm = () =>
  // no props allowed
  {
    const [selectedImage, setSelectedImage] = useState(dogPictures.BlueHeeler);

    const [dogName, setDogName] = useState<string>("");
    const [dogPicture, setDogPicture] = useState<string>(selectedImage);
    const [dogDescription, setDogDescription] = useState<string>("");

    const { isLoading, createDog } = useDogCards();

    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
          createDog({
            name: dogName,
            image: dogPicture,
            description: dogDescription,
            isFavorite: false,
          })
            .then(() => {
              setDogName("");
              setDogDescription("");
              setDogPicture(selectedImage);
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
          onChange={() => {
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
