import { Input } from "../../components/input";
import { Select } from "../../components/select";


export function ServicesCreate() {
  const statesOptions = [
    { label: "Masculino", value: "M" },
    { label: "Feminino", value: "F" },
  ];

  return (
    <>


      <div className="relative overflow-x-auto  h-full  top-[-1rem]  ">
        <div className="  rounded">
          <div className="text-[#06afb1] font-bold p-1   mt-4 mb-4 ">Geral</div>

          <div className="columns-1 mb-2">
            <Input type="text" placeholder="Nome" />

          </div>

          <div className="columns-1 mb-2">
            <Input type="text" placeholder="Valor" />

          </div>

          <div className="columns-2 mt-6">
            <button
              type="button"
              className="text-white bg-[#01d8da] hover:bg-[#06afb1] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Salvar
            </button>
            <button
              type="button"
              className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-[#06afb1]  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
