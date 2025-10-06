import { Component, OnInit } from '@angular/core';
import { Member } from 'src/Models/Member';
import { MemberService } from 'src/Services/member.service';
import { ConfirmDialogueComponent } from '../confirm-dialogue/confirm-dialogue.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})

export class MemberComponent implements OnInit{
  dataSource : Member[]=[]

  //injection des dépendances : mecanisme qui permet d'appeler (injecter) le service dans le composant
  constructor(private MS:MemberService, private dialog:MatDialog){}
  ngOnInit(): void
  {
    this.MS.GetAllMembers().subscribe((data)=>{
      //action
      this.dataSource=data
    })
  }

  delete(id:String):void
  {
    //1. ouvrir la boite(ConfirmDialogueComponent)
    let dialogRef = this.dialog.open(ConfirmDialogueComponent, {
      height: '200px',
      width: '300px',
    });
    //2.attendre le resultat de click de user
    //3. si click = confirm => effacer
    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        this.MS.deleteMember(id).subscribe(()=>{
          this.MS.GetAllMembers().subscribe((data)=>{
            //action
            this.dataSource=data
          })
        })
      }
    });
    
    
  }

  displayedColumns: string[] = ['id', 'cin', 'name', 'type', 'createdDate', 'icones'];

}
