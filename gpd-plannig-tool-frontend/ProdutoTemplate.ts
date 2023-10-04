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
      sa_idx: 6,
      peak_amount: [0.5, 1, 3, 4.2, 5, 5, 5.2, 5.2, 5],
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
      sa_idx: 4,
      peak_amount: [0, 0.5, 1, 3, 4.2, 4.2, 5, 5, 4.2],
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
      sa_idx: 2,
      peak_amount: [0, 0, 0.5, 0.5, 1, 1, 3, 3, 3],
    },
  },
};

export default produtoList;
export type { Produto, Template };
