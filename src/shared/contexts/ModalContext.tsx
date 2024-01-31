import { ReactNode, createContext, useMemo, useState } from 'react';

export const ModalContext = createContext<any>({
  showModal: false,
  setShowModal: () => {},
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const contextValue = useMemo(
    () => ({
      showModal,
      setShowModal,
    }),
    [showModal, setShowModal]
  );

  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
};
