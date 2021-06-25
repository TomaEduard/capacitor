/* tslint:disable */
import { SumarCopilPentruPlati } from './sumar-copil-pentru-plati';
import { DetaliiParinte } from './detalii-parinte';
import { ModelFisaCont } from './model-fisa-cont';
export interface ListaCopiiParintiResponse {
  listaCopii?: Array<SumarCopilPentruPlati>;
  listaParinti?: Array<DetaliiParinte>;
  sumarFiseDeCont?: Array<ModelFisaCont>;
  tokenRegenerat?: string;
}
