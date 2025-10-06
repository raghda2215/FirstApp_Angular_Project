import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from 'src/Services/member.service';

@Component({
  selector: 'app-member-forme',
  templateUrl: './member-forme.component.html',
  styleUrls: ['./member-forme.component.css']
})
export class MemberFormeComponent  implements OnInit
{
  constructor(private MS:MemberService, private router:Router, private activatedRoute:ActivatedRoute){}
  form !: FormGroup;
  ngOnInit()
  { 
    //recuperer la route active
    const idCourant = this.activatedRoute.snapshot.params['id']
    //checher id dans la route
    console.log('idcourant ', idCourant)
    if(idCourant)
    {
      //si id existe et a une valeur => je suis dans edit
      this.MS.getMemberById(idCourant).subscribe((a)=>{
        this.form = new FormGroup({
          cin : new FormControl(a.cin,[Validators.required]),
          name : new FormControl(a.name,[Validators.required]),
          type : new FormControl(a.type),
          createdDate : new FormControl(a.createdDate),
        })
      })
    } 
    else 
    {
      //sinon je suis dans create
      this.form = new FormGroup({
        cin : new FormControl(null,[Validators.required]),
        name : new FormControl(null,[Validators.required]),
        type : new FormControl(null),
        createdDate : new FormControl(null),
      })
    }
    
    
  }

  sub():void
  {
    const idcourant =  this.activatedRoute.snapshot.params['id']
    if(idcourant)
    {
      this.MS.updateMember(idcourant,this.form.value).subscribe(()=>{
        this.router.navigate(['/member'])
      })
    }
    else
    {
      this.MS.addMember(this.form.value).subscribe(()=>{
        this.router.navigate(['/member'])
      })
    }
  }
  
}
