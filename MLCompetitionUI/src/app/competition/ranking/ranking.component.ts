import { CompetitionService } from './../../shared/competition.service';
import { Component, OnInit } from '@angular/core';
import { IRankingRow } from 'src/app/shared/ranking-row.model';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  public displayedColumns: string[];
  public rankingRows: IRankingRow[];
  public version: string;

  constructor(public competitionService: CompetitionService) { }

  ngOnInit() {
    this.displayedColumns = ['position', 'name', 'score', 'attempts'];

    this.competitionService.getVersion().subscribe((version) => {
      this.version = version;
    });

    this.competitionService.getRankingsList().subscribe( (rankingRows) => {
      this.rankingRows = rankingRows;
    });
  }

}
