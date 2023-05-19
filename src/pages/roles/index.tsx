import { useEffect, useState } from "react";

import { Column, Table } from "../../components/table";
import { Button } from "../../components/button";
import { Modal } from "../../components/modal";
import { RolesCreate } from "./create";
import { RoleEdit } from "./edit";
import IconButton from "../../components/buttonIcon";
import api from "../../services/api";
import { DeleteConfirm } from "../../components/DeleteConfirm";
import { toast } from "react-toastify";

interface Role {
  id: string;
  name: string;
}

const columns = [
  {
    caption: "Nome",
  },
  {
    caption: "Editar",
  },
  {
    caption: "Excluir",
  },
];

export function Roles() {
  const [roles, setRoles] = useState<Role[]>();
  const [role, setRole] = useState<Role>();
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [rowIdSelected, setRowIdSelected] = useState("");

  useEffect(() => {
    getRoles();
  }, [showDeleteConfirm, showModal]);

  async function getRoles() {
    const response = await api.index("roles");
    setRoles(response.data);
  }

  async function editRole(id: string) {
    const response = await api.show("roles", id);
    setShowModalEdit(true);
    setRole(response.data);
  }

  async function openDeleteConfirm(id: string) {
    setShowDeleteConfirm(true);
    setRowIdSelected(id);
  }

  async function deleteItem() {
    const response = await api.delete("roles", rowIdSelected);
    if (response.data) {
      toast("Registro Excluído com Sucesso", { type: "success" });
    } else {
      toast("Não foi possivel realizar operação", { type: "error" });
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

      <Modal
        title="Cadastrar Cargo"
        setShowModal={setShowModal}
        show={showModal}
      >
        <RolesCreate />
      </Modal>

      <Modal
        title="Editar Cargo"
        setShowModal={setShowModalEdit}
        show={showModalEdit}
      >
        {role && <RoleEdit role={role} />}
      </Modal>

      <div className="h-24 bg-[#06afb1]">
        <div className="h-24 min-h-full p-5 text-white font-semibold">
          Cargos
        </div>
      </div>
      <div className="relative overflow-x-auto  h-full p-5  top-[-3rem] ">
        <div className="bg-white p-5 rounded">
          <Button onClick={() => setShowModal(true)} type="button">
            Novo
          </Button>

          <Table columns={columns}>
            {roles?.map((role: Role) => {
              return (
                <tr
                  key={role.id}
                  className="bg-white border-b  dark:bg-gray-800 dark:border-gray-700"
                >
                  <Column caption={role.name} />
                  <Column
                    icon={
                      <IconButton
                        icon="edit"
                        onClick={() => editRole(role.id)}
                      />
                    }
                  />
                  <Column
                    icon={
                      <IconButton
                        icon="delete"
                        onClick={() => openDeleteConfirm(role.id)}
                      />
                    }
                  />
                </tr>
              );
            })}
          </Table>
        </div>
      </div>
    </>
  );
}
