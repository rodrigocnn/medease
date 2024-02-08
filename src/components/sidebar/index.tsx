import { Link } from 'react-router-dom';
import { MdDashboard } from 'react-icons/md';
import { AiFillSchedule } from 'react-icons/ai';
import { FaUserNurse } from 'react-icons/fa';
import { FaHospitalUser } from 'react-icons/fa';
import { MdMedicalServices } from 'react-icons/md';
import { BsFillPersonBadgeFill } from 'react-icons/bs';
import { RiLogoutBoxFill } from 'react-icons/ri';

import logo from './../../assets/logo.png';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

export function Sidebar() {
  const { signOut } = useContext(AuthContext);

  const handleLogout = () => {
    signOut();
  };

  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="ml-3 mt-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500
        hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400
        dark:hover:bg-gray-700 dark:focus:ring-gray-600 sm:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="h-6 w-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <aside
        id="default-sidebar"
        className=" left-0 top-0 z-40  h-screen -translate-x-full transition-transform sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full  bg-white dark:bg-gray-800">
          <div>
            <img alt="logo" width={'200px'} src={logo} />
          </div>

          <ul className="ml-4 space-y-2 font-medium">
            <li>
              <Link
                className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                to="/dashboard"
              >
                <MdDashboard className="h-6 w-6 flex-shrink-0 text-gray-500 transition " />

                <span className="ml-3">Dashboard</span>
              </Link>
            </li>

            <li>
              <Link
                className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                to="/cargos"
              >
                <BsFillPersonBadgeFill className="h-6 w-6 flex-shrink-0 text-gray-500 transition " />
                <span className="ml-3 flex-1 whitespace-nowrap">Cargos</span>
              </Link>
            </li>

            <li>
              <Link
                className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                to="/servicos"
              >
                <MdMedicalServices className="h-6 w-6 flex-shrink-0 text-gray-500 transition " />
                <span className="ml-3 flex-1 whitespace-nowrap">Serviços</span>
              </Link>
            </li>

            <li>
              <Link
                className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                to="/agenda"
              >
                <AiFillSchedule className="h-6 w-6 flex-shrink-0 text-gray-500 transition " />
                <span className="ml-3 flex-1 whitespace-nowrap">Agenda</span>
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                to="/profissionais"
              >
                <FaUserNurse className="h-6 w-6 flex-shrink-0 text-gray-500 transition " />
                <span className="ml-3 flex-1 whitespace-nowrap">Profissionais</span>
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                to="/pacientes"
              >
                <FaHospitalUser className="h-6 w-6 flex-shrink-0 text-gray-500 transition " />
                <span className="ml-3 flex-1 whitespace-nowrap">Pacientes</span>
              </Link>
            </li>

            <li>
              <a
                onClick={handleLogout}
                className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                href="/"
              >
                <RiLogoutBoxFill className="h-6 w-6 flex-shrink-0 text-gray-500 transition " />
                <span className="ml-3 flex-1 whitespace-nowrap">Sair</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
