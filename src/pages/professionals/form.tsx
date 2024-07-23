import MaskedInput from 'react-text-mask';
import DatePicker, { registerLocale } from 'react-datepicker';
import { useNavigate } from 'react-router-dom';

import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { Button } from '../../components/Button';
import { Loading } from '../../components/Loading';
import { useProfessionalForm } from '../../modules/professionals/hooks/useProfessionalForm';
import { StatesBR } from '../../constants/StatesBR';
import { DivisorTitleForm } from '../../components/DivisorTitleForm';
import ptBR from 'date-fns/locale/pt-BR';
import Masks from '../../shared/utils/Masks';

registerLocale('ptBR', ptBR);

interface ProfessionalFormProps {
  action?: 'create' | 'edit';
}

export function ProfessionalForm({ action = 'create' }: ProfessionalFormProps) {
  const { professional, roles, loading, validations, handleChange, handleDate, onSubmit } = useProfessionalForm(action);
  const navigate = useNavigate();

  console.log('ofessional?.birth', professional?.birth);

  return (
    <form onSubmit={onSubmit}>
      {loading && <Loading />}

      <DivisorTitleForm>Dados Pessoais</DivisorTitleForm>

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
        <div className="container-datepicker">
          <DatePicker
            placeholderText="Data de Nascimento"
            locale="ptBR"
            dateFormat="dd/MM/yyyy"
            className="input-default w-full"
            selected={professional?.birth ? new Date(professional.birth) : null}
            onChange={date => handleDate(date, 'birth')}
          />
        </div>
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

      <DivisorTitleForm>Endereço</DivisorTitleForm>

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
        <Select value={professional?.state} onChange={handleChange} name="state" options={StatesBR} />
      </div>
      <div className="mt-6 columns-2">
        <Button onClick={onSubmit}>Salvar</Button>
        <button onClick={() => navigate('/profissionais')} type="button" className="btn-secondary ">
          Cancelar
        </button>
      </div>
    </form>
  );
}
