import { Evt } from './../../Models/Evt';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'src/Services/event.service';

@Component({
  selector: 'app-visibility-evt-component',
  templateUrl: './visibility-evt-component.component.html',
  styleUrls: ['./visibility-evt-component.component.css']
})
export class VisibilityEvtComponentComponent {
  evt!:Evt 
  constructor(public dialogRef: MatDialogRef<VisibilityEvtComponentComponent> , @Inject(MAT_DIALOG_DATA) data: any ,private Es : EventService){
    console.log("dataRecuperer",data)
    this.Es.getEventById(data).subscribe((EvtRecu)=>{
      this.evt=EvtRecu
    })
  }
  close() {
    this.dialogRef.close();
  }
}
