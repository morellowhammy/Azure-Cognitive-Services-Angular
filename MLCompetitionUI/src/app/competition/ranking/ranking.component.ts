import { CompetitionService } from './../../shared/competition.service';
import { Component, OnInit } from '@angular/core';
import { IRankingRow } from 'src/app/shared/ranking-row.model';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  public displayedColumns: string[];
  public rankingRows: IRankingRow[];

  @BlockUI() private blockUI: NgBlockUI;

  constructor(public competitionService: CompetitionService) { }

  ngOnInit() {
    this.displayedColumns = ['position', 'name', 'score', 'attempts'];
    this.blockUI.start('Loading Rankings...');

    this.competitionService.getRankingsList().subscribe( (rankingRows) => {
      this.rankingRows = this.sortRankingList(rankingRows);
      this.blockUI.stop();
    },
    () => this.blockUI.stop());
  }

  private sortRankingList(rankingRows: IRankingRow[]): IRankingRow[] {
    rankingRows.sort((row1, row2) => this.compareRankingRows(row1, row2));

      let position = 1;
      rankingRows.forEach((row) => {
        row.position = position;
        position++;
      });
      return rankingRows;
  }

  private compareRankingRows(ranking1: IRankingRow, ranking2: IRankingRow) {
    return ranking1.score - ranking2.score;
  }

}
