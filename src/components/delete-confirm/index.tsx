import { Dispatch, SetStateAction } from 'react';

interface ModalProps {
  show: boolean;
  deleteItem: () => void;
  setShowDeleteConfirm: Dispatch<SetStateAction<boolean>>;
  title: string;
}

export const DeleteConfirm = ({ show, title, deleteItem, setShowDeleteConfirm }: ModalProps) => {
  const confirm = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    deleteItem();
    setShowDeleteConfirm(false);
  };

  return (
    <>
      {show ? (
        <>
          <div
            id="staticModal"
            data-modal-backdrop="static"
            aria-hidden="true"
            className="absolute right-0 z-50  flex h-[calc(100%-1rem)]
            max-h-full justify-center overflow-y-auto overflow-x-hidden p-4 md:inset-0"
          >
            <div className="relative h-full w-full max-w-md p-4 md:h-auto">
              <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
                <div className="flex items-start justify-between rounded-t p-4 dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    type="button"
                    className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5
                    text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600
                     dark:hover:text-white"
                    data-modal-hide="staticModal"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414
                        10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586
                        10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="relative rounded-lg bg-white p-4 text-center shadow sm:p-5 dark:bg-gray-800">
                  <p className="mb-4 text-gray-500 dark:text-gray-300">
                    Você tem certeza que deseja realizar exclusão?{' '}
                  </p>
                  <div className="flex items-center justify-center space-x-4">
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      data-modal-toggle="deleteModal"
                      type="button"
                      className="focus:ring-primary-300 rounded-lg border border-gray-200 bg-white px-3
                       py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900
                       focus:z-10 focus:outline-none focus:ring-4 dark:border-gray-500 dark:bg-gray-700
                       dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
                    >
                      Não, Cancelar
                    </button>
                    <button
                      onClick={confirm}
                      type="submit"
                      className="rounded-lg bg-red-600 px-3 py-2 text-center text-sm font-medium
                      text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300
                      dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                    >
                      Sim, Cancelar
                    </button>
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
