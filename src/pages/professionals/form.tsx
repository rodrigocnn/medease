import MaskedInput from 'react-text-mask';
import { useNavigate } from 'react-router-dom';

import Masks from '../../shared/utils/Masks';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { Button } from '../../components/Button';
import { Loading } from '../../components/Loading';
import { useProfessionalForm } from '../../modules/professionals/hooks/useProfessionalForm';
import { StatesBR } from '../../constants/StatesBR';

interface ProfessionalFormProps {
  action?: 'create' | 'edit';
}

export function ProfessionalForm({ action = 'create' }: ProfessionalFormProps) {
  const { professional, roles, loading, validations, handleChange, onSubmit } = useProfessionalForm(action);
  const navigate = useNavigate();

  return (
    <form onSubmit={onSubmit}>
      {loading && <Loading />}

      <div className="mb-4 mt-4 p-1   font-bold text-[#06afb1] ">Dados Pessoais</div>

      <div className="mb-2 columns-2">
        <Input
          error={validations?.fieldName === 'name' && !validations.validate}
          value={professional?.name}
          name="name"
          onChange={handleChange}
          type="text"
          placeholder="Nome"
        />
        <Input
          error={validations?.fieldName === 'email' && !validations.validate}
          value={professional?.email}
          name="email"
          onChange={handleChange}
          type="text"
          placeholder="Email"
        />
      </div>

      <div className="mb-2 columns-2">
        <Input
          error={validations?.fieldName === 'birth' && !validations.validate}
          value={professional?.birth}
          name="birth"
          onChange={handleChange}
          type="text"
          placeholder="Data de Nascimento"
        />
        <MaskedInput
          value={professional?.phone}
          mask={Masks.celular}
          name="phone"
          onChange={handleChange}
          type="text"
          placeholder="Telefone"
          className="input-default"
        />
      </div>

      <div className="mb-2 columns-3">
        <MaskedInput
          className="input-default"
          mask={Masks.cpf}
          value={professional?.cpf}
          name="cpf"
          onChange={handleChange}
          type="text"
          placeholder="CPF"
        />
        <Input value={professional?.rg} name="rg" onChange={handleChange} type="text" placeholder="RG" />
        <Select onChange={handleChange} value={professional?.roleId} name="roleId" options={roles} />
      </div>

      <div className="mb-4 mt-4 p-1   font-bold text-[#06afb1] ">Endereço</div>

      <div className="mb-2 columns-1">
        <Input
          error={validations?.fieldName === 'address' && !validations.validate}
          value={professional?.address}
          name="address"
          onChange={handleChange}
          type="text"
          placeholder="Endereço"
        />
      </div>

      <div className="mb-2 columns-3">
        <Input
          error={validations?.fieldName === 'district' && !validations.validate}
          value={professional?.district}
          name="district"
          onChange={handleChange}
          type="text"
          placeholder="Bairro"
        />
        <Input
          error={validations?.fieldName === 'city' && !validations.validate}
          value={professional?.city}
          name="city"
          onChange={handleChange}
          type="text"
          placeholder="Cidade"
        />
        <Select onChange={handleChange} name="state" options={StatesBR} />
      </div>
      <div className="mt-6 columns-2">
        <Button onClick={onSubmit}>Salvar</Button>

        <button
          onClick={() => navigate('/profissionais')}
          type="button"
          className="mb-2 mr-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5
                text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-[#06afb1] focus:z-10
                focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800
                dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
