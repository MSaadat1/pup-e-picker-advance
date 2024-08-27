//import { useContext } from "react";
import { Section } from "./Components/Section";
import { useDogCards } from "./providers/DogCardsProvider";
import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";

export function App() {

  const{currentView} = useDogCards();
  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <Section label={"Dogs: "} >{currentView === "createDog" ? (<CreateDogForm/>) : (<Dogs/>)}

      </Section>
    </div>
  );
}
