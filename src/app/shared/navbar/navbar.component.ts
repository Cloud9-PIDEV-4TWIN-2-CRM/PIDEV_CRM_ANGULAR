import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import {Router} from "@angular/router";
import {GlobalBasket} from 'Services/GlobalBasket';
import { BasketData } from 'Models/BasketData';




@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;
    user ="";
    Basket:BasketData[]=[];
    
   /* pc  = new ProductComponent.msg;
    get pcM(){
        return this.pc;
    }*/

    constructor(public location: Location, private element : ElementRef,private router: Router) {
        this.sidebarVisible = false;
    }

    ngOnInit() {
        if(localStorage.getItem("user")!=""){
            this.user=localStorage.getItem("user")
            }else{
                this.user=""
            }
            const navbar: HTMLElement = this.element.nativeElement;
            this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        // console.log(toggleButton, 'toggle');

        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };
    
    logout(){
        localStorage.clear();
        this.user=""
        location.replace('');
        
    }
    getBasketData(){
        this.Basket=GlobalBasket.data;
    }
    removeFromBasket(){
        console.log("removed");
    }
    
}
