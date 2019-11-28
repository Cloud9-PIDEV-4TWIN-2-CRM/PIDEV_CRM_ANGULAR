import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import { NavbarComponent } from 'app/shared/navbar/navbar.component';
import { UserService } from 'Services/UserService';

import { analyzeAndValidateNgModules } from '@angular/compiler';
import { from } from 'rxjs';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user:any;

  

  test : Date = new Date();

    focus;
    focus1;
  constructor(private router: Router,private userServ :UserService) { }

  ngOnInit() {
  }
  resolveAfter2Seconds(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, 2000);
    });
  }

  login(email,pwd){
    this.userServ.tryLogin(email.value,pwd.value).subscribe(result=>{this.user=result},
      e => {},
      () => {
       
        if(this.userServ.tryLogin(email.value,pwd.value)!=null){
          localStorage.setItem('user',this.user.email);
          localStorage.setItem('id',this.user.id);
          localStorage.setItem('User',JSON.stringify(this.user));
          location.replace('');
         }
        else if(this.user===null) {
          console.log('invalide')
        }
      });
    /*this.resolveAfter2Seconds(20).then(value => {
      console.log(`promise result: `);
     
    });*/
    
    
    

    
    
    
  }
}
