import { Route, Routes } from 'react-router-dom';

import { Professionals } from '../pages/professionals';
import { Patients } from '../pages/patients';
import { CreateProfessional } from '../pages/professionals/create';
import { PatientsCreate } from '../pages/patients/create';
import { Services } from '../pages/services';
import { Roles } from '../pages/roles';
import { PatientsEdit } from '../pages/patients/edit';
import { Appointments } from '../pages/appointments';
import { ProfessionalsEdit } from '../pages/professionals/edit';
import { Login } from '../pages/login';

import { useContext } from 'react';
import { AuthContext } from '../contexts/auth';

import { Dashboard } from '../pages/dashboard';
import { InsidePage } from '../components/inside-page';

import { Loading } from '../components/loading';
import { Admin } from '../components/admin';

const router = [
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/cargos',
    element: <Roles />,
  },

  {
    path: '/servicos',
    element: <Services />,
  },
  {
    path: '/profissionais',
    element: <Professionals />,
  },
  {
    path: '/profissionais/novo',
    element: <CreateProfessional />,
  },
  {
    path: '/profissionais/editar/:id',
    element: <ProfessionalsEdit />,
  },
  {
    path: '/pacientes',
    element: <Patients />,
  },
  {
    path: '/pacientes/novo',
    element: <PatientsCreate />,
  },
  {
    path: '/pacientes/editar/:id',
    element: <PatientsEdit />,
  },
  {
    path: '/agenda',
    element: <Appointments />,
  },
];

function Links(): JSX.Element {
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <Admin>
        <InsidePage title="MedEase">
          <Loading />
        </InsidePage>
      </Admin>
    );
  }

  return (
    <>
      {signed ? (
        <Admin>
          <Routes>
            {router.map(({ path, element }) => {
              return <Route key={element.key} path={path} element={element} />;
            })}
          </Routes>
        </Admin>
      ) : (
        <main>
          <Routes>
            <Route path={'/login'} element={<Login />} />;
            <Route path={'*'} element={<Login />} />;
          </Routes>
        </main>
      )}
    </>
  );
}

export default Links;
