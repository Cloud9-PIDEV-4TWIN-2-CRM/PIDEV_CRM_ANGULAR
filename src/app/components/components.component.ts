import { Component, OnInit, Renderer } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import {BasketService}from'Services/BasketService';
import { GlobalBasket } from 'Services/GlobalBasket';

@Component({
    selector: 'app-components',
    templateUrl: './components.component.html',
    styles: [`
    ngb-progressbar {
        margin-top: 5rem;
    }
    `]
})

export class ComponentsComponent implements OnInit {
    page = 4;
    page1 = 5;
    focus;
    focus1;
    focus2;
    user ;
    date: {year: number, month: number};
    model: NgbDateStruct;
    loadComponent="";
    res:any[]=[];
    basket:any[]=[];
    constructor( private renderer : Renderer,private basetserv:BasketService) {
       
    }
    isWeekend(date: NgbDateStruct) {
        const d = new Date(date.year, date.month - 1, date.day);
        return d.getDay() === 0 || d.getDay() === 6;
    }

    isDisabled(date: NgbDateStruct, current: {month: number}) {
        return date.month !== current.month;
    }
    
    ngOnInit() {
        this.user=localStorage.getItem('user');
        console.log("zzzz"+this.user);
        let input_group_focus = document.getElementsByClassName('form-control');
        let input_group = document.getElementsByClassName('input-group');
        for (let i = 0; i < input_group.length; i++) {
            input_group[i].children[0].addEventListener('focus', function (){
                input_group[i].classList.add('input-group-focus');
            });
            input_group[i].children[0].addEventListener('blur', function (){
                input_group[i].classList.remove('input-group-focus');
            });
        }
        if(localStorage.getItem('id')!=null){
            this.basetserv.getBasket(localStorage.getItem('id')).subscribe(data => {
                this.res.push(data);},
                e=>{},
                ()=>{
                 this.res.forEach(element => {
                  for (var i = 0; i <= (Object.keys(this.res).length); i++) {
                    this.basket.push(element[i]);
                  }
                  GlobalBasket.data=this.basket;
               });
              
            });
        }
        
    }


    
  addToBasket(idProduct:any){
    console.log(idProduct);
}

    


}
