import { useEffect, useState } from "react";
import { FaRegEdit , FaTrashAlt} from 'react-icons/fa';
import api from "../../services/api";
import { Modal } from "../../components/modal";
import { ServicesCreate } from "./create";

interface Patient {
  name: string;
  phone: string;
  role: string;
}

export function Services() {
  const [patients, setPatients] = useState<Patient[]>();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    const response = await api.index("professionals");
    setPatients(response.data);
  }

  return (
    <>

    <Modal title="Cadastrar Serviço" setShowModal={setShowModal} show={showModal}>
        <ServicesCreate/>
    </Modal>

      <div className="h-24 bg-[#06afb1]">
        <div className="h-24 min-h-full p-5 text-white font-semibold">
         Serviços
        </div>
      </div>
      <div className="relative overflow-x-auto  h-full p-5  top-[-3rem] ">
        <div className="bg-white p-5 rounded">

        <button   onClick={() => setShowModal(true)}
              type="button"
              className="text-white bg-[#01d8da] hover:bg-[#06afb1] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
             Novo
            </button>

          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nome
                </th>

                <th scope="col" className="px-6 py-3">
                  Telefone
                </th>
                <th scope="col" className="px-6 py-3">
                  Cargo
                </th>

                <th scope="col" className="px-6 py-3">
                  Editar
                </th>
                <th scope="col" className="px-6 py-3">
                  Excluir
                </th>
                </tr>
            </thead>
            <tbody>
              {patients?.map((patient: Patient) => {
                return (
                  <tr key={patient.name} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4">{patient.name}</td>
                    <td className="px-6 py-4">{patient.phone}</td>
                    <td className="px-6 py-4">{patient.role}</td>
                    <td className="px-6 py-4 text-lg pl-10"><FaRegEdit/></td>
                    <td className="px-6 py-4 text-lg pl-10"><FaTrashAlt/></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
