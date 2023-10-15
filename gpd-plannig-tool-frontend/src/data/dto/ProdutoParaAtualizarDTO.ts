import { TemplateDTO } from './TemplateDTO';

type ProdutoParaAtualizarDTO = {
  id: string;
  nome: string;
  data_sa: string;
  lider_npi: string;
  template: TemplateDTO;
};

export { ProdutoParaAtualizarDTO };
