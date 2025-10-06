import { Evt } from './../../Models/Evt';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EventService } from 'src/Services/event.service';
import { ConfirmDialogueComponent } from '../confirm-dialogue/confirm-dialogue.component';
import { VisibilityEvtComponentComponent } from '../visibility-evt-component/visibility-evt-component.component';
import { ModalEventComponent } from '../modal-event/modal-event.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource: MatTableDataSource<Evt> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'titre', 'datedebut', 'datefin', 'lieu', 'action'];
  isLoading = false;

  constructor(private Es: EventService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchData(): void {
    this.isLoading = true;
    this.Es.getAllEvent().subscribe((response) => {
      this.dataSource.data = response;
      this.isLoading = false;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  open(): void {
    const dialogRef = this.dialog.open(ModalEventComponent);
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.Es.addEvent(data).subscribe(() => {
          this.fetchData();
        });
      }
    });
  }

  openEdit(id: string): void {
    this.Es.getEventById(id).subscribe((evtRecupere) => {
      const config = new MatDialogConfig();
      config.data = evtRecupere;
      const dialogRef = this.dialog.open(ModalEventComponent, config);
      dialogRef.afterClosed().subscribe((response) => {
        if (response) {
          this.Es.updateEvent(id, response).subscribe(() => {
            this.fetchData();
          });
        }
      });
    });
  }

  openDelete(id: string): void { // renommée pour correspondre au HTML
    const dialogRef = this.dialog.open(ConfirmDialogueComponent, {
      height: '300px',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.Es.deleteEvent(id).subscribe(() => {
          this.fetchData();
        });
      }
    });
  }

  openVisibility(id: string): void { // renommée pour correspondre au HTML
    const config = new MatDialogConfig();
    config.data = id;
    this.dialog.open(VisibilityEvtComponentComponent, config);
  }
}
