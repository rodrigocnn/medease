import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/button';
import { InsidePage } from '../../components/insidePage';
import { Column, Table } from '../../components/table';
import IconButton from '../../components/buttonIcon';
import { DeleteConfirm } from '../../components/DeleteConfirm';
import api from '../../services/api';

interface Professional {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

const columns = [
  {
    caption: 'Nome',
  },

  {
    caption: 'Email',
  },

  {
    caption: 'Telefone',
  },
  {
    caption: 'Editar',
  },
  {
    caption: 'Excluir',
  },
];

export function Professionals() {
  const [professionals, setProfessionals] = useState<Professional[]>();
  const [rowIdSelected, setRowIdSelected] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getProfessionals();
  }, []);

  async function getProfessionals() {
    const response = await api.index('professionals');
    setProfessionals(response.data);
  }

  async function openDeleteConfirm(id: string) {
    setShowDeleteConfirm(true);
    setRowIdSelected(id);
  }

  async function deleteItem() {
    const response = await api.delete('professionals', rowIdSelected);
    if (response.data) {
      toast('Registro Excluído com Sucesso', { type: 'success' });
    } else {
      toast('Não foi possivel realizar operação', { type: 'error' });
    }
  }

  return (
    <>
      <DeleteConfirm
        title="Excluir Cargo"
        setShowDeleteConfirm={setShowDeleteConfirm}
        deleteItem={deleteItem}
        show={showDeleteConfirm}
      />

      <InsidePage title="Profissionais">
        <Button onClick={() => navigate('/profissionais/novo')} type="button">
          Novo
        </Button>

        <Table columns={columns}>
          {professionals?.map((professional: Professional) => {
            return (
              <tr key={professional.id} className="table-row-default">
                <Column caption={professional.name} />
                <Column caption={professional.email} />
                <Column caption={professional.phone} />
                <Column icon={<IconButton icon="edit" onClick={() => {}} />} />
                <Column icon={<IconButton icon="delete" onClick={() => openDeleteConfirm(professional.id)} />} />
              </tr>
            );
          })}
        </Table>
      </InsidePage>
    </>
  );
}
