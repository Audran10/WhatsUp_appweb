import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const HomePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.value);

  return <h1 className="text-4xl text-center">Accueil</h1>;
};

export default HomePage;
