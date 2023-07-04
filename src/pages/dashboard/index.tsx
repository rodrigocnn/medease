import { FaUserMd, FaUserPlus, FaRegCalendar, FaRegCalendarCheck } from 'react-icons/fa';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

import { BoxInfo } from '../../components/BoxInfo';

export function Dashboard() {
  const chartData: ApexOptions = {
    chart: {
      zoom: {
        enabled: false,
      },

      toolbar: {
        show: false,
      },

      foreColor: '#008FFB',
      type: 'line',
    },
    stroke: {
      show: false,
      width: 0,
    },
    xaxis: {
      categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    },
    fill: {
      type: 'solid',
    },
    legend: {
      width: 400,
    },
    series: [
      {
        name: 'Novos Clientes',
        type: 'column',
        data: [440, 505, 414, 571, 227, 413, 201, 352, 652, 320, 257, 160],
      },
    ],
  };

  return (
    <div className="p-5">
      <div className="flex gap-3">
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
      <div className="mt-5 flex gap-3">
        <div className="w-1/2 bg-white">
          <h2 className="m-3 font-semibold">Novos Pacientes</h2>
          <ReactApexChart options={chartData} series={chartData.series} />
        </div>
        <div className="w-1/2 bg-white">
          <h2 className="m-3 font-semibold">Atendimentos</h2>
          <ReactApexChart options={chartData} series={chartData.series} />
        </div>
      </div>
    </div>
  );
}
