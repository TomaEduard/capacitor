import { Component, OnInit } from '@angular/core';
import { LoginRequest } from 'src/app/backendapi/models';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
    const parametri: LoginRequest = {
      username: 'admin',
      password: 'password',
      codUnicBd: null,
      parolaNouaDacaCeaVecheEsteOk: null
    };

    window.alert(parametri);
  }


}
