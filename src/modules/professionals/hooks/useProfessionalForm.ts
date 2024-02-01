import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { Options, Professional, Role } from '../../../interfaces';
import useApi from '../../../hooks/useApi';
import ProfessionalMap from '../../../mappers/ProfessionalMap';
import api from '../../../services/api';

export function useProfessionalForm(action: string) {
  const [professional, setProfessional] = useState<Professional>();
  const [roles, setRoles] = useState<Options[]>([]);
  const { loading, fetchDataShow, sendDataPost } = useApi();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (action === 'edit') {
      async function getProfessional() {
        const response = await fetchDataShow('professionals', id as string);
        setProfessional(response.data);
      }
      getProfessional();
    }
  }, []);

  useEffect(() => {
    getRoles();
  }, []);

  async function getRoles() {
    const response = await api.index('roles');
    const optionsRole = [{ label: 'Selecione um Cargo', value: '0' }];
    const updatedOptionsRole = response.data.map((item: Role) => ({
      label: item.name,
      value: item.id,
    }));
    setRoles([...optionsRole, ...updatedOptionsRole]);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const fieldName = event.target.name;
    const value = event.target.value;
    setProfessional({ ...professional, [fieldName]: value });
  };

  const onSubmit = async (event: React.FormEvent<EventTarget | HTMLFormElement>) => {
    event.preventDefault();
    if (professional) {
      if (action === 'edit') {
        const response = await api.update('professionals', id as string, ProfessionalMap.toPersistent(professional));
        if (response.data) {
          toast('Registro Atualizado com Sucesso', { type: 'success' });
          navigate('/profissionais');
        } else {
          toast('Não foi possivel realizar operação', { type: 'error' });
        }
      } else {
        const response = await sendDataPost('professionals', ProfessionalMap.toPersistent(professional));
        if (response.data) {
          toast('Registro Inserido com Sucesso', { type: 'success' });
          navigate('/profissionais');
        } else {
          toast('Não foi possivel realizar operação', { type: 'error' });
        }
      }
    }
  };

  return {
    professional,
    roles,
    loading,
    handleChange,
    onSubmit,
  };
}
