import { FaUserMd, FaUserPlus, FaRegCalendar, FaRegCalendarCheck } from 'react-icons/fa';
import ReactApexChart from 'react-apexcharts';

import { chartCallServices, chartData } from './charts';
import { BoxInfo } from '../../components/box-info';

export function Dashboard() {
  return (
    <div className="p-5">
      <div className="flex flex-col gap-3  lg:flex-row">
        <BoxInfo title="Profissionais" number="10" color="bg-blue-400">
          <FaUserMd />
        </BoxInfo>
        <BoxInfo title="Clientes" number="100" color="bg-green-400">
          <FaUserPlus />
        </BoxInfo>
        <BoxInfo title="Agendados" number="100" color="bg-yellow-400">
          <FaRegCalendar />
        </BoxInfo>
        <BoxInfo title="Atendimentos" number="10" color="bg-gray-400">
          <FaRegCalendarCheck />
        </BoxInfo>
      </div>
      <div className="mt-5 hidden   lg:flex  lg:gap-3 ">
        <div className="w-1/2 bg-white">
          <h2 className="m-3 font-semibold">Atendimentos</h2>
          <ReactApexChart
            options={chartCallServices}
            type="bar"
            series={chartCallServices.series}
          />
        </div>
        <div className="w-1/2 bg-white">
          <h2 className="m-3 font-semibold">Novos Pacientes</h2>
          <ReactApexChart options={chartData} series={chartData.series} />
        </div>
      </div>
    </div>
  );
}
