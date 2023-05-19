import { Input } from '../../components/input';
import { Select } from '../../components/select';

export function ServicesCreate() {
  const statesOptions = [
    { label: 'Masculino', value: 'M' },
    { label: 'Feminino', value: 'F' },
  ];

  return (
    <>
      <div className="relative top-[-1rem]  h-full  overflow-x-auto  ">
        <div className="  rounded">
          <div className="mb-4 mt-4 p-1   font-bold text-[#06afb1] ">Geral</div>

          <div className="mb-2 columns-1">
            <Input type="text" placeholder="Nome" />
          </div>

          <div className="mb-2 columns-1">
            <Input type="text" placeholder="Valor" />
          </div>
          <div className="mt-6 columns-2">
            <button
              type="button"
              className="mb-2 mr-2 rounded-lg bg-[#01d8da] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#06afb1] focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Salvar
            </button>
            <button
              type="button"
              className="mb-2 mr-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-[#06afb1] focus:z-10  focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
