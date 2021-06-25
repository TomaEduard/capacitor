/* tslint:disable */
import { ModelPanouInformatiiDocument } from './model-panou-informatii-document';
import { SumarGrupa } from './sumar-grupa';
export interface DetaliiPanouDeInformatii {
  administratorulPoatePosta?: boolean;
  documentePanou?: Array<ModelPanouInformatiiDocument>;
  educatorulPoatePosta?: 0 | 1 | 2;
  felPanou?: 0 | 1;
  grupaId?: string;
  idPanouDeInformatii?: string;
  listaGrupe?: Array<SumarGrupa>;
  modCiclarePostari?: 0 | 1 | 2 | 3 | 4;
  poatePosta?: boolean;
  subtitlu?: string;
  titluPanou?: string;
}
