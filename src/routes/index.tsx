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

const router = [
  {
    path: '/login',
    element: <Login />,
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
  return (
    <Routes>
      {router.map(({ path, element }) => {
        return <Route key={element.key} path={path} element={element} />;
      })}
    </Routes>
  );
}

export default Links;
