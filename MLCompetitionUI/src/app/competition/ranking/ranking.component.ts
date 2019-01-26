import { CompetitionService } from './../../shared/competition.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  public displayedColumns: string[];
  public rankingRows;

  constructor(public competitionService: CompetitionService) { }

  ngOnInit() {
    this.displayedColumns = ['position', 'name', 'score', 'attempts'];
    this.competitionService.getRankingsList().subscribe( (rankingRows) => {
      this.rankingRows = rankingRows;
    });
  }

}
