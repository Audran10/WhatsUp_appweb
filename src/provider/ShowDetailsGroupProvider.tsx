import { createContext, useState } from 'react';

type ContainerProps = {
  children: React.ReactNode;
};

type ShowDetailsGroupContextType = {
  showDetailsGroup: boolean;
  setShowDetailsGroup: React.Dispatch<React.SetStateAction<boolean>>;
};

const showExDetailsGroup = {
  showDetailsGroup: false,
  setShowDetailsGroup: () => {},
};

const ShowDetailsGroupContext =
  createContext<ShowDetailsGroupContextType>(showExDetailsGroup);

const ShowDetailsGroupProvider = (props: ContainerProps) => {
  const [showDetailsGroup, setShowDetailsGroup] = useState<boolean>(false);

  return (
    <ShowDetailsGroupContext.Provider 
      value={{ showDetailsGroup, setShowDetailsGroup }}>
      {props.children}
    </ShowDetailsGroupContext.Provider>
  );
};

export { ShowDetailsGroupContext, ShowDetailsGroupProvider };
