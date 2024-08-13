import DatePicker, { registerLocale } from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import ptBR from 'date-fns/locale/pt-BR';

import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { Button } from '../../components/Button';
import { Loading } from '../../components/Loading';
import { usePatientForm } from '../../modules/patients/hooks/usePatientForm';
import { StatesBR } from '../../constants/StatesBR';
import Masks from '../../shared/utils/Masks';

registerLocale('ptBR', ptBR);

interface PatientFormProps {
  action?: 'create' | 'edit';
}

export function PatientForm({ action = 'create' }: PatientFormProps) {
  const actionForm = action;
  const { patient, loading, validations, handleChange, handleDate, onSubmit } =
    usePatientForm(actionForm);
  const navigate = useNavigate();

  return (
    <>
      {loading && <Loading />}

      <div className="relative top-[-3rem]  h-full overflow-x-auto p-5  ">
        <div className="rounded bg-white p-5">
          <div className="mb-4 mt-4 p-1   font-bold text-[#06afb1] ">Geral</div>
          <form onSubmit={onSubmit}>
            <div className="mb-2 columns-1">
              <Input
                value={patient?.name}
                name="name"
                error={validations?.fieldName === 'name' && !validations.validate}
                onChange={handleChange}
                type="text"
                placeholder="Nome"
              />
            </div>
            <div className="mb-2 columns-2">
              <Input
                value={patient?.email}
                name="email"
                error={validations?.fieldName === 'email' && !validations.validate}
                onChange={handleChange}
                type="text"
                placeholder="Email"
              />
              <MaskedInput
                mask={Masks.celular}
                value={patient?.phone}
                name="phone"
                onChange={handleChange}
                type="text"
                placeholder="Telefone"
                className="btn-mask"
              />
            </div>

            <div className=" mb-2  columns-3">
              <div className="container-datepicker">
                <DatePicker
                  placeholderText="Data de Nascimento"
                  locale="ptBR"
                  name="birth"
                  dateFormat="dd/MM/yyyy"
                  className="input-default w-full"
                  selected={patient?.birth ? new Date(patient?.birth) : null}
                  onChange={date => handleDate(date, 'birth')}
                />
              </div>
              <MaskedInput
                mask={Masks.cpf}
                value={patient?.cpf}
                name="cpf"
                onChange={handleChange}
                type="text"
                placeholder="CPF"
                className="btn-mask"
              />

              <Input
                value={patient?.rg}
                name="rg"
                onChange={handleChange}
                type="text"
                placeholder="RG"
              />
            </div>

            <div className="mb-4 mt-4 p-1   font-bold text-[#06afb1] ">Endereço</div>

            <div className="mb-2 columns-1">
              <Input
                value={patient?.address}
                name="address"
                onChange={handleChange}
                type="text"
                placeholder="Endereço"
              />
            </div>

            <div className="mb-2 columns-3">
              <Input
                value={patient?.district}
                name="district"
                error={validations?.fieldName === 'district' && !validations.validate}
                onChange={handleChange}
                type="text"
                placeholder="Bairro"
              />
              <Input
                value={patient?.city}
                name="city"
                error={validations?.fieldName === 'city' && !validations.validate}
                onChange={handleChange}
                type="text"
                placeholder="Cidade"
              />
              <Select
                value={patient?.state}
                onChange={handleChange}
                name="state"
                error={validations?.fieldName === 'state' && !validations.validate}
                options={StatesBR}
              />
            </div>
            <div className="mt-6 columns-2">
              <Button onClick={onSubmit}>Salvar</Button>
              <Button type="cancel" onClick={() => navigate('/pacientes')}>
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
