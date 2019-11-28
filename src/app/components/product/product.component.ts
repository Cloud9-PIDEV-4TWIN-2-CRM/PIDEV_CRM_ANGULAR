import { Component, OnInit } from '@angular/core';
import{ProductService} from 'Services/ProductService';
import{BasketService} from 'Services/BasketService';
import {GlobalBasket} from 'Services/GlobalBasket';
import {BasketData} from 'Models/BasketData';
import {NotificationsService} from 'angular2-notifications';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  res:any[]=[];
  products:any[]=[];
  msgResultAdd:any;
  constructor(private prodserv:ProductService,private basketserv:BasketService,private notifserv:NotificationsService) { }

  ngOnInit() {
    
    this.prodserv.getProduct().subscribe(data => {
      this.res.push(data);},
      e=>{},
      ()=>{
       this.res.forEach(element => {
        for (var i = 0; i <= (Object.keys(this.res).length); i++) {
          this.products.push(element[i]);
        }

    });
    
  });
  }
  

  addToBasket(name:any,id:any){
    //console.log(localStorage.getItem('id'));
    //this.basketserv.addProductToBasket(localStorage.getItem('id'),id);
    this.basketserv.addProductToBasket(localStorage.getItem('id'),id).subscribe(result=>{this.msgResultAdd=result},
      e=>{},
      ()=>{
        console.log('adddd')
        if(this.msgResultAdd==='added successfully'){
          console.log('adddd1')
          let bd:BasketData=new BasketData;
          let qte=1;
          let equal="no";
          
          if(GlobalBasket.data.length===0){
            bd.name=name;
          bd.qte=qte;
          GlobalBasket.data.push(bd);
          }
          else{
            for(let j=0;j<GlobalBasket.data.length;j++){
              if(GlobalBasket.data[j].name===name){
                equal="yes";
                GlobalBasket.data[j].qte+=1;
              }
            }
            if(equal==='no'){
              bd.name=name;
              bd.qte=qte;
              GlobalBasket.data.push(bd);
            }
          }
          this.notifserv.success('Success','Product added successfully',{
            position : ['bottom','right'],
            timeOut : 2000,
            animate : 'fade',
            showProgressBar : true
          });
        }
        else if(this.msgResultAdd==='You have a reservation in progress') {
          
          this.notifserv.error('Sorry','You have already a reservation',{
            position : ['bottom','right'],
            timeOut : 2000,
            animate : 'fade',
            showProgressBar : true
          });
        }
      });
   /* let bd:BasketData=new BasketData;
    let qte=1;
    let equal="no";
    
    if(GlobalBasket.data.length===0){
      bd.name=name;
    bd.qte=qte;
    GlobalBasket.data.push(bd);
    }
    else{
      for(let j=0;j<GlobalBasket.data.length;j++){
        if(GlobalBasket.data[j].name===name){
          equal="yes";
          GlobalBasket.data[j].qte+=1;
        }
      }
      if(equal==='no'){
        bd.name=name;
        bd.qte=qte;
        GlobalBasket.data.push(bd);
      }
    }*/
   
    
    

  
}
}
