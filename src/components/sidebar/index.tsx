import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MdDashboard } from 'react-icons/md';
import { AiFillSchedule } from 'react-icons/ai';
import { FaUserNurse } from 'react-icons/fa';
import { FaHospitalUser } from 'react-icons/fa';
import { MdMedicalServices } from 'react-icons/md';
import { BsFillPersonBadgeFill } from 'react-icons/bs';
import { RiLogoutBoxFill } from 'react-icons/ri';

import logo from './../../assets/logo.png';

import { AuthContext } from '../../contexts/auth';

export function Sidebar() {
  const { signOut } = useContext(AuthContext);

  const handleLogout = () => {
    signOut();
  };

  return (
    <>
      <button
        type="button"
        className="ml-3 mt-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500
        hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 sm:hidden
        dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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

      <aside className="z-40 h-screen" aria-label="Sidebar">
        <div className="h-full  bg-lime-950 lg:bg-white dark:bg-gray-800">
          <div>
            <img alt="logo" width={'200px'} src={logo} />
          </div>

          <ul className="  space-y-2 font-medium lg:ml-4">
            <li className="flex justify-center lg:block">
              <Link
                className="lg: flex items-center rounded-lg p-2 lg:hover:bg-gray-100"
                to="/dashboard"
              >
                <MdDashboard
                  title="Dashboard"
                  className="h-6 w-6 flex-shrink-0 text-slate-400  transition lg:text-gray-500 "
                />
                <span className="ml-3 hidden lg:block">Dashboard</span>
              </Link>
            </li>

            <li className="flex justify-center lg:block">
              <Link
                className="lg: flex items-center rounded-lg p-2 lg:hover:bg-gray-100"
                to="/cargos"
              >
                <BsFillPersonBadgeFill
                  title="Cargos"
                  className="h-6 w-6 flex-shrink-0 text-slate-400  transition lg:text-gray-500 "
                />
                <span className="ml-3 hidden hidden flex-1 whitespace-nowrap lg:block lg:block">
                  Cargos
                </span>
              </Link>
            </li>

            <li className="flex justify-center lg:block">
              <Link
                className="lg: flex items-center rounded-lg p-2 lg:hover:bg-gray-100"
                to="/servicos"
              >
                <MdMedicalServices
                  title="Serviços"
                  className="h-6 w-6 flex-shrink-0 text-slate-400  transition lg:text-gray-500 "
                />
                <span className="ml-3 hidden flex-1 whitespace-nowrap lg:block">Serviços</span>
              </Link>
            </li>

            <li className="flex justify-center lg:block">
              <Link
                className="lg: flex items-center rounded-lg p-2 lg:hover:bg-gray-100"
                to="/profissionais"
              >
                <FaUserNurse
                  title="Profissionais"
                  className="h-6 w-6 flex-shrink-0 text-slate-400  transition lg:text-gray-500"
                />
                <span className="ml-3 hidden flex-1 whitespace-nowrap lg:block">Profissionais</span>
              </Link>
            </li>
            <li className="flex justify-center lg:block">
              <Link
                className="lg: flex items-center rounded-lg p-2 lg:hover:bg-gray-100"
                to="/pacientes"
              >
                <FaHospitalUser
                  title="Pacientes"
                  className="h-6 w-6 flex-shrink-0 text-slate-400  transition lg:text-gray-500 "
                />
                <span className="ml-3 hidden flex-1 whitespace-nowrap lg:block">Pacientes</span>
              </Link>
            </li>

            <li className="flex justify-center lg:block">
              <Link
                className="lg: flex items-center rounded-lg p-2 lg:hover:bg-gray-100"
                to="/agenda"
              >
                <AiFillSchedule
                  title="Agenda"
                  className="h-6 w-6 flex-shrink-0 text-slate-400  transition lg:text-gray-500 "
                />
                <span className="ml-3 hidden flex-1 whitespace-nowrap lg:block">Agenda</span>
              </Link>
            </li>

            <li className="flex justify-center lg:block">
              <a
                onClick={handleLogout}
                className="lg: flex items-center rounded-lg p-2 lg:hover:bg-gray-100"
                href="/"
              >
                <RiLogoutBoxFill
                  title="Sair"
                  className="h-6 w-6 flex-shrink-0 text-slate-400  transition lg:text-gray-500 "
                />
                <span className="ml-3 hidden flex-1 whitespace-nowrap lg:block">Sair</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
