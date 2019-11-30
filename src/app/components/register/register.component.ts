import { Component, OnInit } from '@angular/core';
import { Prospect } from 'Models/Prospect';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor() { }
  prospect : Prospect = new Prospect();

  ngOnInit() {
  }

}
