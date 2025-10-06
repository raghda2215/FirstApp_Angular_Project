import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ModalArticleComponent } from '../modal-article/modal-article.component';
import { MatDialog } from '@angular/material/dialog';
import { ArticleService } from 'src/Services/article.service';
import { Article } from 'src/Models/Pub';

@Component({
  selector: 'app-articles',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {
  displayedColumns: string[] = ['id', 'type', 'titre', 'lien', 'date', 'sourcepdf'];
  dataSource: MatTableDataSource<Article>;

  constructor(private art: ArticleService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
    this.art.getAllarticle().subscribe((res) => {
      this.dataSource.data = res;
    });
  }

  open() {
    const DialogRef = this.dialog.open(ModalArticleComponent);
    DialogRef.afterClosed().subscribe((res) => {
      if (res) {
        // Ajout de l'article après la fermeture de la modal
        this.art.addarticle(res).subscribe(() => {
          this.art.getAllarticle().subscribe((response) => {
            this.dataSource.data = response;  // Mise à jour des articles
          });
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
