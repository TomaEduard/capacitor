import { Router, ActivatedRoute } from '@angular/router';

export interface DetaliiEntitate{
  initialObject: any;
  router: Router;
  route: ActivatedRoute;
  working: boolean;
 
  preiaDetaliiForm();
}