import { CompetitionService } from './../../shared/competition.service';
import { Component, OnInit } from '@angular/core';
import { IRankingRow } from 'src/app/shared/ranking-row.model';

const ELEMENT_DATA: IRankingRow[] = [
  {position: 1, name: 'Hydrogen', score: 1.0079, attempts: 3},
  {position: 2, name: 'Helium', score: 4.0026, attempts: 2},
  {position: 3, name: 'Lithium', score: 6.941, attempts: 1},
  {position: 4, name: 'Beryllium', score: 9.0122, attempts: 4},
  {position: 5, name: 'Boron', score: 10.811, attempts: 6},
  {position: 6, name: 'Carbon', score: 12.0107, attempts: 1},
  {position: 7, name: 'Nitrogen', score: 14.0067, attempts: 1},
  {position: 8, name: 'Oxygen', score: 15.9994, attempts: 1},
  {position: 9, name: 'Fluorine', score: 18.9984, attempts: 1},
  {position: 10, name: 'Neon', score: 20.1797, attempts: 2},
];

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  public displayedColumns: string[];
  public dataSource;

  constructor(public competitionService: CompetitionService) { }

  ngOnInit() {
    this.displayedColumns = ['position', 'name', 'score', 'attempts'];
    this.dataSource = ELEMENT_DATA;
  }

}
