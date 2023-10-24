interface Template {
  id: string;
  type: string;
  sa_idx: number;
  peak_amount: number[];
  pm?: number[];
  tl?: number[];
  ut_lead?: number[];
  length: number;
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
      length: 10,
    },
  },
  produto02: {
    id: 'ce9d0b3b-9389-4fab-90a9-f79725ad9ac6',
    name: 'Beyond',
    sa_date: '09/2023',
    npi_lead: 'Name Lead',
    template: {
      id: '4a960b5f-4207-466a-a2cd-65bbf91023cd',
      type: 'Mid',
      sa_idx: 4,
      peak_amount: [0, 0.5, 1, 3, 4.2, 4.2, 5, 5, 4.2],
      length: 8,
    },
  },
  produto03: {
    id: 'ce9d0b3b-9389-4fab-90a9-f79725ad9ac5',
    name: 'Lumar',
    sa_date: '04/2023',
    npi_lead: 'Name Lead',
    template: {
      id: '4a960b5f-4207-466a-a2cd-65bbf91023cf',
      type: 'Low',
      sa_idx: 2,
      peak_amount: [0, 0, 0.5, 0.5, 1, 1, 3, 3, 3],
      length: 6,
    },
  },
  produto04: {
    id: 'ce9d0b3b-9389-4fab-90a9-f79725ad9ac1',
    name: 'Venus',
    sa_date: '04/2024',
    npi_lead: 'Name Lead',
    template: {
      id: '4a960b5f-4207-466a-a2cd-65bbf91023cf',
      type: 'Low',
      sa_idx: 2,
      peak_amount: [0, 0, 0.5, 0.5, 1, 1, 3, 3, 3],
      length: 6,
    },
  },
  produto05: {
    id: 'ce9d0b3b-9389-4fab-90a9-f79725ad9ac2',
    name: 'Marte',
    sa_date: '02/2022',
    npi_lead: 'Name Lead',
    template: {
      id: '4a960b5f-4207-466a-a2cd-65bbf91023cf',
      type: 'High',
      sa_idx: 6,
      peak_amount: [0.5, 1, 3, 4.2, 5, 5, 5.2, 5.2, 5],
      length: 10,
    },
  },
  produto06: {
    id: 'ce9d0b3b-9389-4fab-90a9-f79725ad9a32',
    name: 'Earth',
    sa_date: '03/2022',
    npi_lead: 'Name Lead',
    template: {
      id: '4a960b5f-4207-466a-a2cd-65bbf91023cd',
      type: 'Mid',
      sa_idx: 4,
      peak_amount: [0, 0.5, 1, 3, 4.2, 4.2, 5, 5, 4.2],
      length: 8,
    },
  },
  produto07: {
    id: 'ce9d0b3b-9389-4fab-90a9-f79725ad9a12',
    name: 'Stelar',
    sa_date: '10/2021',
    npi_lead: 'Name Lead',
    template: {
      id: '4a960b5f-4207-466a-a2cd-65bbf91023cf',
      type: 'Low',
      sa_idx: 2,
      peak_amount: [0, 0, 0.5, 0.5, 1, 1, 3, 3, 3],
      length: 6,
    },
  },
  // produto08: {
  //   id: 'ce9d0b3b-9389-4fab-90a9-f79725ad9a09',
  //   name: 'Lactea',
  //   sa_date: '08/2022',
  //   npi_lead: 'Name Lead',
  //   template: {
  //     id: '4a960b5f-4207-466a-a2cd-65bbf91023cf',
  //     type: 'High',
  //     sa_idx: 6,
  //     peak_amount: [0, 0, 0.5, 0.5, 1, 1, 3, 3, 3],
  //     length: 10,
  //   },
  // },
  // produto09: {
  //   id: 'ce9d0b3b-9389-4fab-90a9-f79725ad9111',
  //   name: 'Sky',
  //   sa_date: '11/2021',
  //   npi_lead: 'Name Lead',
  //   template: {
  //     id: '4a960b5f-4207-466a-a2cd-65bbf91023cf',
  //     type: 'Low',
  //     sa_idx: 2,
  //     peak_amount: [0.5, 1, 3, 4.2, 5, 5, 5.2, 5.2, 5],
  //     length: 6,
  //   },
  // },
  // produto10: {
  //   id: 'ce9d0b3b-9389-4fab-90a9-f79725ad9112',
  //   name: 'Darker',
  //   sa_date: '01/2023',
  //   npi_lead: 'Name Lead',
  //   template: {
  //     id: '4a960b5f-4207-466a-a2cd-65bbf91023cf',
  //     type: 'Low',
  //     sa_idx: 2,
  //     peak_amount: [0.5, 1, 3, 4.2, 5, 5, 5.2, 5.2, 5],
  //     length: 6,
  //   },
  // },
};

export default produtoList;
export type { Produto, Template };
