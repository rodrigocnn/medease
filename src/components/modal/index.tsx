import { Dispatch, SetStateAction } from 'react';
import { Button } from '../button';

interface ModalProps {
  show: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  title: string;
  children: React.ReactNode;
  confirm(event: React.MouseEvent<HTMLElement>): Promise<void>;
}

export const Modal = ({ show, title, setShowModal, children, confirm }: ModalProps) => {
  const onConfirm = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    confirm(event);
  };

  return (
    <>
      {show ? (
        <>
          <div
            id="staticModal"
            data-modal-backdrop="static"
            aria-hidden="true"
            className="absolute right-0 z-50  flex h-[calc(100%-1rem)]  max-h-full justify-center overflow-y-auto overflow-x-hidden p-4 md:inset-0"
          >
            <div className="relative left-14 top-14 max-h-full w-full max-w-2xl">
              <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
                <div className="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
                  <button
                    onClick={() => setShowModal(false)}
                    type="button"
                    className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5
                    text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600
                    dark:hover:text-white"
                    data-modal-hide="staticModal"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293
                        4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1
                        1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="space-y-6 p-6">
                  <div className="relative h-full  overflow-x-auto   ">
                    <div className="rounded">
                      <div className="mb-2 columns-1">{children}</div>

                      <div className="mt-6 columns-2">
                        <Button onClick={onConfirm}>Atualizar</Button>
                        <button
                          onClick={() => setShowModal(false)}
                          type="button"
                          className="mb-2 mr-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5
                          text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-[#06afb1]
                          focus:z-10  focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600
                          dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white
                          dark:focus:ring-gray-700"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
