import { ReactNode, createContext, useMemo, useState } from 'react';

export const ModalContext = createContext<any>({
  showModal: false,
  setShowModal: () => {},
  showModalEdit: false,
  setShowModalEdit: () => {},
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalEdit, setShowModalEdit] = useState<boolean>(false);

  const contextValue = useMemo(
    () => ({
      showModal,
      setShowModal,
      showModalEdit,
      setShowModalEdit,
    }),
    [showModal, setShowModal, showModalEdit, setShowModalEdit]
  );

  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
};
