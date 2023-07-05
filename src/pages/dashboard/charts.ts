import { ApexOptions } from 'apexcharts';

export const chartData: ApexOptions = {
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

export const chartCallServices: ApexOptions = {
  series: [
    {
      name: 'Atendimentos',
      data: [400, 430, 448, 470, 540, 580, 690],
    },
  ],

  chart: {
    type: 'bar',
    height: 350,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      borderRadius: 0,
      horizontal: true,
    },
  },

  dataLabels: {
    enabled: false,
  },
  colors: [
    '#01d8da',
    '#546E7A',
    '#d4526e',
    '#13d8aa',
    '#A5978B',
    '#2b908f',
    '#f9a3a4',
    '#90ee7e',
    '#f48024',
    '#69d2e7',
  ],
  xaxis: {
    categories: [
      'Limpeza de Pele',
      'Massagem Relaxante',
      'Drenagem Linfática',
      'Massagem Modeladora',
      'Depilação com Cera',
      'Botox',
      'Bronze',
    ],
  },
};
