interface Template {
  id: string;
  type: string;
  sa_idx: number;
  peak_amount: number[];
  pm?: number[];
  tl?: number[];
  ut_lead?: number[];
}

interface Produto {
  id: string;
  name: string;
  sa_date: string;
  npi_lead: string;
  template: Template;
}

const produtoList: Record<string, Produto> = {
  produto01: {
    id: 'ce9d0b3b-9389-4fab-90a9-f79725ad9ac7',
    name: 'Eclipse',
    sa_date: '10/2023',
    npi_lead: 'Name Lead',
    template: {
      id: '4a960b5f-4207-466a-a2cd-65bbf91023ce',
      type: 'High',
      sa_idx: 8,
      peak_amount: [0, 0.5, 1, 3, 4.2, 4.2, 4.2, 4.2, 4.2],
      // pm: [0, 0.5, 1, 3, 4.2, 4.2, 4.2, 4.2, 4.2],
      // tl: [0, 0.5, 1, 4, 4.2, 4.2, 4.2, 4.2, 4.2],
      // ut_lead: [0, 0, 0, 0, 1, 2, 2, 0, 0],
    },
  },
  produto02: {
    id: 'ce9d0b3b-9389-4fab-90a9-f79725ad9ac6',
    name: 'Beyond',
    sa_date: '11/2023',
    npi_lead: 'Name Lead',
    template: {
      id: '4a960b5f-4207-466a-a2cd-65bbf91023cd',
      type: 'Mid',
      sa_idx: 7,
      peak_amount: [0, 0.5, 1, 3, 4.2, 4.2, 4.2, 4.2, 4.2],
      // pm: [0, 0.5, 1, 3, 4.2, 4.2, 4.2, 4.2, 4.2],
      // tl: [0, 0.5, 1, 4, 4.2, 4.2, 4.2, 4.2, 4.2],
      // ut_lead: [0, 0, 0, 0, 1, 2, 2, 0, 0],
    },
  },
  produto03: {
    id: 'ce9d0b3b-9389-4fab-90a9-f79725ad9ac5',
    name: 'Lumar',
    sa_date: '12/2023',
    npi_lead: 'Name Lead',
    template: {
      id: '4a960b5f-4207-466a-a2cd-65bbf91023cf',
      type: 'Low',
      sa_idx: 6,
      peak_amount: [0, 0.5, 1, 3, 4.2, 4.2, 4.2, 4.2, 4.2],
      // pm: [0, 0.5, 1, 3, 4.2, 4.2, 4.2, 4.2, 4.2],
      // tl: [0, 0.5, 1, 4, 4.2, 4.2, 4.2, 4.2, 4.2],
      // ut_lead: [0, 0, 0, 0, 1, 2, 2, 0, 0],
    },
  },
  produto04: {
    id: 'ce9d0b3b-9389-4fab-90a9-f79725ad9ac3',
    name: 'Aurora',
    sa_date: '01/2024',
    npi_lead: 'Name Lead',
    template: {
      id: '4a960b5f-4207-466a-a2cd-65bbf91023cr',
      type: 'High',
      sa_idx: 0,
      peak_amount: [0, 0.5, 1, 3, 4.2, 4.2, 4.2, 4.2, 4.2],
      // pm: [0, 0.5, 1, 3, 4.2, 4.2, 4.2, 4.2, 4.2],
      // tl: [0, 0.5, 1, 4, 4.2, 4.2, 4.2, 4.2, 4.2],
      // ut_lead: [0, 0, 0, 0, 1, 2, 2, 0, 0],
    },
  },
  produto05: {
    id: 'ce9d0b3b-9389-4fab-90a9-f79725ad9ac0',
    name: 'Amanhecer',
    sa_date: '02/2024',
    npi_lead: 'Name Lead',
    template: {
      id: '4a960b5f-4207-466a-a2cd-65bbf91023ct',
      type: 'Mid',
      sa_idx: 1,
      peak_amount: [0, 0.5, 1, 3, 4.2, 4.2, 4.2, 4.2, 4.2],
      // pm: [0, 0.5, 1, 3, 4.2, 4.2, 4.2, 4.2, 4.2],
      // tl: [0, 0.5, 1, 4, 4.2, 4.2, 4.2, 4.2, 4.2],
      // ut_lead: [0, 0, 0, 0, 1, 2, 2, 0, 0],
    },
  },
  produto06: {
    id: 'ce9d0b3b-9389-4fab-90a9-f79725ad9ac1',
    name: 'Crepusculo',
    sa_date: '03/2024',
    npi_lead: 'Name Lead',
    template: {
      id: '4a960b5f-4207-466a-a2cd-65bbf91023cy',
      type: 'Low',
      sa_idx: 2,
      peak_amount: [0, 0.5, 1, 3, 4.2, 4.2, 4.2, 4.2, 4.2],
      // pm: [0, 0.5, 1, 3, 4.2, 4.2, 4.2, 4.2, 4.2],
      // tl: [0, 0.5, 1, 4, 4.2, 4.2, 4.2, 4.2, 4.2],
      // ut_lead: [0, 0, 0, 0, 1, 2, 2, 0, 0],
    },
  },
};

export default produtoList;
