import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Dog } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

export type TDogCardProvider = {
  isLoading: boolean;
  currentView: TActiveTab;
  favoritedDogsCount: number;
  unfavoritedDogsCount: number;
  handleActiveTab:(tab: TActiveTab) => void;
  setCurrentView: Dispatch<SetStateAction<TActiveTab>>;
  handleFavoriteDogs: (id: number, isFavorite: boolean) => void;
  handleDeleteDogs: (id: number) => void;
  handleCreateDogs: (dogs: Omit<Dog, "id">) => Promise<void>;
  dogsList: Record<TActiveTab, Dog[]>;
};

export type TActiveTab = "all" | "favorite" | "unfavorite" | "createDog";

const DogCardContext = createContext({} as TDogCardProvider);

export const DogCardsProvider = ({ children }: { children: ReactNode }) => {
  const [dogCard, setDogCard] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentView, setCurrentView] = useState<TActiveTab>("all");

  const favoriteDogs = dogCard.filter((dog) => dog.isFavorite);
  const unfavoriteDogs = dogCard.filter((dog) => !dog.isFavorite);

  const refetchData = () => {
    setIsLoading(true);
    Requests.getAllDogs()
      .then((dogs) => {
        setDogCard(dogs);
      })
      .catch(() => toast.error("Failed to refetch dogs!"))
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    refetchData();
  }, []);

  

  const handleFavoriteDogs = (id: number, isFavorite: boolean) => {
    setDogCard((preView) =>
      preView.map((dog) => (dog.id === id ? { ...dog, isFavorite } : dog))
    );
    return Requests.patchFavoriteForDog(id, {
      isFavorite,
    })
      .then(() => {
        toast.success("The dog card was updated!");
      })
      .catch(() => {
        setDogCard((prevDog) =>
          prevDog.map((dog) =>
            dog.id === id ? { ...dog, isFavorite: !isFavorite } : dog
          )
        );
        toast.error("Failed to update the dog card!");
      });
  };

  const handleDeleteDogs = (id: number) => {
    const prevDogs = [...dogCard];
    setDogCard((prevDogs) => prevDogs.filter((dog) => dog.id !== id));
    return Requests.deleteDogRequest(id)
      .then(() => {
        toast.success("The dog card was deleted!");
      })
      .catch(() => {
        setDogCard(prevDogs);
        toast.error("Fail to delete the dog card!");
      });
  };

  const handleCreateDogs = (dogs: Omit<Dog, "id">) => {
    setIsLoading(true);
    return Requests.postDog(dogs)
      .then(() => {
        toast.success("The dog was created successfully!");
        refetchData();
      })
      .catch(() => {
        toast.error("Failed to create the dog!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const dogsList: Record<TActiveTab, Dog[]> = {
    all: dogCard,
    favorite: favoriteDogs,
    unfavorite: unfavoriteDogs,
    createDog: [],
  };

  const handleActiveTab = (tab: TActiveTab)=>{
    const nextView = tab === currentView ? "all" : tab;
    setCurrentView(nextView)
  }

  const value = {
    isLoading,
    currentView,
    setCurrentView,
    handleActiveTab,
    favoritedDogsCount: favoriteDogs.length,
    unfavoritedDogsCount: unfavoriteDogs.length,
    handleFavoriteDogs,
    handleDeleteDogs,
    handleCreateDogs,
    dogsList,
  };
  return (
    <DogCardContext.Provider value={value}>{children}</DogCardContext.Provider>
  );
};

export const useDogCards = () => useContext(DogCardContext);
