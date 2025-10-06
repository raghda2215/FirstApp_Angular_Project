import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-modal-article',
  templateUrl: './modal-article.component.html',
  styleUrls: ['./modal-article.component.css']
})
export class ModalArticleComponent {
  form: FormGroup;
  foods: Food[] = [
    {value: 'conf', viewValue: 'Conference'},
    {value: 'journal', viewValue: 'Journal'},
    {value: 'mag', viewValue: 'Magazine'},
  ];

  constructor(private dialogRef: MatDialogRef<ModalArticleComponent>) {
    this.form = new FormGroup({
      titre: new FormControl(null),
      type: new FormControl(null),
      lien: new FormControl(null),
      date: new FormControl(null),
      sourcepdf: new FormControl(null)
    });
  }

  trackByFn(index: number, item: Food): string {
    return item.value;
  }

  save(): void {
    this.dialogRef.close(this.form.value);
  }

  close(): void {
    this.dialogRef.close();
  }
}
