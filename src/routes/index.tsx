import { Route,  Routes } from "react-router-dom";

import { Professionals } from "../pages/professionals";
import { Patients } from "../pages/patients";
import { ProfessionalsCreate } from "../pages/professionals/create";
import { PatientsCreate } from "../pages/patients/create";
import { Services } from "../pages/services";
import { Roles } from "../pages/roles";


  const router = [


  {
    path: "/cargos",
    element:  <Roles/>,
  },

    {
      path: "/serviços",
      element:  <Services/>,
    },
    {
      path: "/profissionais",
      element:  <Professionals/>,
    },
    {
      path: "/profissionais/novo",
      element:  <ProfessionalsCreate/>,
    },
    {
      path: "/pacientes",
      element:  <Patients/>,
    },
    {
      path: "/pacientes/novo",
      element:  <PatientsCreate/>,
    },

  ];

 function Links () : JSX.Element{
      return <Routes>{
        router.map(({path, element})=>{
          return(
            <Route key={element.key} path={path} element={element}/>
          )
      })
      }</Routes>
  }



  export default Links
