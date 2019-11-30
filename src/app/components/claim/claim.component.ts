import { Component, OnInit } from '@angular/core';
import { Claim } from 'Models/Claim';
import { ClaimService } from 'Services/ClaimService';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.scss']
})
export class ClaimComponent implements OnInit {

  constructor(private cs : ClaimService) { }

  ngOnInit() {
  }
  listClaim : Claim []= [];

  
  claim :Claim = new Claim();

  getClaims(){
    this.cs.getClaims().subscribe(
result => {
  this.listClaim=result;
},
        e => { },

    ()=>{ this.listClaim.forEach(e=> 
      console.log(e.id)
      )});
    
  }
}
