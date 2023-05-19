import { useEffect, useState } from 'react';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import api from '../../services/api';
import { Modal } from '../../components/modal';
import { ServicesCreate } from './create';

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
    const response = await api.index('professionals');
    setPatients(response.data);
  }

  return (
    <>
      <Modal title="Cadastrar Serviço" setShowModal={setShowModal} show={showModal}>
        <ServicesCreate />
      </Modal>

      <div className="h-24 bg-[#06afb1]">
        <div className="h-24 min-h-full p-5 font-semibold text-white">Serviços</div>
      </div>
      <div className="relative top-[-3rem]  h-full overflow-x-auto  p-5 ">
        <div className="rounded bg-white p-5">
          <button
            onClick={() => setShowModal(true)}
            type="button"
            className="mb-2 mr-2 rounded-lg bg-[#01d8da] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#06afb1] focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Novo
          </button>

          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
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
                  <tr key={patient.name} className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                    <td className="px-6 py-4">{patient.name}</td>
                    <td className="px-6 py-4">{patient.phone}</td>
                    <td className="px-6 py-4">{patient.role}</td>
                    <td className="px-6 py-4 pl-10 text-lg">
                      <FaRegEdit />
                    </td>
                    <td className="px-6 py-4 pl-10 text-lg">
                      <FaTrashAlt />
                    </td>
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
