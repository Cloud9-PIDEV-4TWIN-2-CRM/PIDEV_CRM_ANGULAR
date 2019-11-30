import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { NavbarComponent } from 'app/shared/navbar/navbar.component';
import { UserService } from 'Services/UserService';

import { analyzeAndValidateNgModules } from '@angular/compiler';
import { from } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { Prospect } from 'Models/Prospect';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: Prospect;
  message = "";



  test: Date = new Date();

  focus;
  focus1;
  constructor(private router: Router, private userServ: UserService) { }

  ngOnInit() {
  }
  resolveAfter2Seconds(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, 2000);
    });
  }

  login(email, pwd) {
    this.userServ.tryLogin(email.value, pwd.value).subscribe(result => { this.user = JSON.parse(JSON.stringify(result)) },
      e => { },
      () => {

        if (this.user != null) {
          if (this.user.confirmed == false) {
            this.message = "You need to confirm your registration first"
          } else
            if (this.user.disabled == true) {
              this.message = "This account is disabled you need to enable it first"
            } else {
              localStorage.setItem('user', this.user.email);
              localStorage.setItem('id', this.user.id.toString());
              localStorage.setItem('User', JSON.stringify(this.user));
              location.replace('');
            }
        }
        else {
          this.message = "Please verify your email or password";
          console.log('invalide')
        }
      });

  }
}
