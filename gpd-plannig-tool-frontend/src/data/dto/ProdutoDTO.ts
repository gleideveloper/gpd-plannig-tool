import { TemplateDTO } from './TemplateDTO';

type ProdutoDTO = {
  id: string;
  nome: string;
  data_sa: string;
  lider_npi: string;
  template: TemplateDTO;
  hr_json:string;
};

export { ProdutoDTO };
