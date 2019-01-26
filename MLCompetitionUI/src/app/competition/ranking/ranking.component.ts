import { Component, OnInit } from '@angular/core';

export interface CompetitorRank {
  nickname: string;
  position: number;
  score: number;
  attempts: number;
}

const ELEMENT_DATA: CompetitorRank[] = [
  {position: 1, nickname: 'Hydrogen', score: 1.0079, attempts: 3},
  {position: 2, nickname: 'Helium', score: 4.0026, attempts: 2},
  {position: 3, nickname: 'Lithium', score: 6.941, attempts: 1},
  {position: 4, nickname: 'Beryllium', score: 9.0122, attempts: 4},
  {position: 5, nickname: 'Boron', score: 10.811, attempts: 6},
  {position: 6, nickname: 'Carbon', score: 12.0107, attempts: 1},
  {position: 7, nickname: 'Nitrogen', score: 14.0067, attempts: 1},
  {position: 8, nickname: 'Oxygen', score: 15.9994, attempts: 1},
  {position: 9, nickname: 'Fluorine', score: 18.9984, attempts: 1},
  {position: 10, nickname: 'Neon', score: 20.1797, attempts: 2},
];

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  public displayedColumns: string[];
  public dataSource;

  constructor() { }

  ngOnInit() {
    this.displayedColumns = ['position', 'nickname', 'score', 'attempts'];
    this.dataSource = ELEMENT_DATA;
  }

}
