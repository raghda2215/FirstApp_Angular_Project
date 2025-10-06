import { Component, Inject} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-event',
  templateUrl: './modal-event.component.html',
  styleUrls: ['./modal-event.component.css']
})

export class ModalEventComponent  {
   constructor(public dialogRef: MatDialogRef<ModalEventComponent> , private dialog :MatDialog ,@Inject(MAT_DIALOG_DATA) data: any) {
    if(data){
      console.log("donnes recus ", data)
      this.form = new FormGroup(
        {
          titre:new FormControl(data.titre),
          datedebut:new FormControl(data. datedebut),
          datefin:new FormControl(data.datefin),
          lieu:new FormControl(data.lieu)

        }
      )
    }
    else{
      this.form = new FormGroup(
        {
          titre:new FormControl(null),
          datedebut:new FormControl(null),
          datefin:new FormControl(null),
          lieu:new FormControl(null)
        }
      )
    }
   } 
   
   form !:FormGroup 
   
   save() {
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }
}
