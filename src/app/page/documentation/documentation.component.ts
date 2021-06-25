import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.css']
})
export class DocumentationComponent implements OnInit {

  ua = navigator.userAgent;

  username: string;
  password: string;

  constructor(public utilsService: UtilsService) { }

  ngOnInit(): void {
  }
  
  windowsAlert(value: string) {
    window.alert(value);
  }

  auth() {
    const parametri: any = {
      username: 'admin',
      password: 'password',
      codUnicBd: null,
      parolaNouaDacaCeaVecheEsteOk: null
    };

    window.alert(parametri);
  }

}
