import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'src/Services/article.service';
import { EventService } from 'src/Services/event.service';
import { MemberService } from 'src/Services/member.service';
import { ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {  
  // Dashboard metrics
  NbrMembers: number = 0;
  NbArticles: number = 0;
  NbTools: number = 0;
  NbEvents: number = 0;
  NbStudent: number = 0;
  NbTeacher: number = 0;

  NbLieu: number[] = [];
  
  NbSfax: number = 0;
  NbTunis: number = 0;
  NbSousse: number = 0;

  // Charts data

  //Chart Doughnut
  chartDataDoughnut: ChartDataset[] = [
    {
      label: 'Répartition des événements par lieu',
      data: []
    }
  ];
  chartLabelsDoughnut: string[] = ['Sfax', 'Tunis', 'Sousse'];
  chartOptions: ChartOptions = {};

  //Chart Pie
  chartDataPie: ChartDataset[] = [
    {
      label: 'Répartition des Professeurs et élèves',
      data: []
    }
  ];
  chartLabelsPie: string[] = ['student', 'teacher'];
  
  //Chart Bar 
  tab_lieu:String[] = [];
  chartDataBar: ChartDataset[] = [
    {
      label: 'Répartition des événements par lieu',
      data: []
    }
  ];
  chartLabelsBar: String[] = [];
  
  //Chart Line
  chartDataLine: ChartDataset[] = [
    {
      label: 'hhhhhhhhhhhhhhhh',
      data: []
    }
  ];
  chartLabelsLine: String[] = [];
  

  constructor(
    private MS: MemberService, 
    private ES: EventService, 
    private AS: ArticleService, 
    private router: Router
  ) {
    // Compter membres
    this.MS.GetAllMembers().subscribe((data => {
      this.NbrMembers = data.length;
      for (let i = 0; i < this.NbrMembers; i++) {
        if (data[i].type == 'student') {
          this.NbStudent++;
        } else {
          this.NbTeacher++;
        }
      }
      this.chartDataPie = [
        {
          label: 'Répartition des Professeurs et élèves',
          data: [this.NbStudent, this.NbTeacher]
        }
      ];
      this.chartLabelsLine = [...data.map(m=>m.name)];
      this.chartDataLine=[
        {
          label: 'hhhhhhhh',
          data : []
        }
      ]
    }));

    // Compter articles
    this.AS.getAllarticle().subscribe((data => {
      this.NbArticles = data.length;
    }));

    // Compter événements par lieu Statique
    this.ES.getAllEvent().subscribe((data => {
      this.NbEvents = data.length;
      for (let i = 0; i < this.NbEvents; i++) {
        if (data[i].lieu=='Sfax') {
          this.NbSfax++;
        } else if (data[i].lieu=='Tunis') {
          this.NbTunis++;
        } else if (data[i].lieu=='Sousse') {
          this.NbSousse++;
        }
      }
      this.chartDataDoughnut = [
        {
          label: 'Répartition des événements par lieu',
          data: [this.NbSfax, this.NbTunis, this.NbSousse]
        }
      ];

      // Compter événements par lieu Dynamique
      this.tab_lieu=[...new Set(data.map(m=>m.lieu))]
      this.chartLabelsBar=this.tab_lieu

      for(const iterator of this.tab_lieu)
      {
        const count = (data.filter(m=>m.lieu===iterator)).length
        this.NbLieu.push(count)
      }
      this.chartDataBar=[
        {
          label: 'NbEvents/Lieu',
          data: this.NbLieu
        }
      ]
    }));
  }
}
