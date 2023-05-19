import { Dispatch, SetStateAction } from "react";

interface ModalProps{
  show:boolean,
  setShowModal: Dispatch<SetStateAction<boolean>>
  children: React.ReactNode
  title:string
}


export const Modal = ({show, title, setShowModal, children}:ModalProps) => {


  return (
    <>
      {show ? (
        <>
          <div
            id="staticModal"
            data-modal-backdrop="static"
            aria-hidden="true"
            className="flex justify-center absolute  right-0 z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div className="relative left-14 top-14 w-full max-w-2xl max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{ title}</h3>
                  <button
                    onClick={() => setShowModal(false)}
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="staticModal"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  {children}
                </div>


              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
