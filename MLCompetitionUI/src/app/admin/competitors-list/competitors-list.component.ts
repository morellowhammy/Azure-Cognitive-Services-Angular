import { Component, OnInit } from '@angular/core';
import { CompetitionService } from 'src/app/shared/competition.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ICompetitor } from 'src/app/shared/competitor.model';

@Component({
  selector: 'app-competitors-list',
  templateUrl: './competitors-list.component.html',
  styleUrls: ['./competitors-list.component.css']
})
export class CompetitorsListComponent implements OnInit {

  public displayedColumns: string[];
  public competitors: ICompetitor[];

  @BlockUI() private blockUI: NgBlockUI;

  constructor(public competitionService: CompetitionService) { }

  ngOnInit() {
    this.displayedColumns = ['name', 'email', 'delete'];
    this.loadCompetitors();
  }

  delete(name: string) {
    this.blockUI.start('Deleting competitor');
    this.competitionService.deleteCompetitor(name).subscribe( (response) => {
      this.blockUI.stop();
      this.loadCompetitors();
    },
    () => this.blockUI.stop());
  }

  loadCompetitors() {
    this.blockUI.start('Loading Competitors...');

    this.competitionService.getCompetitorsList().subscribe( (competitors) => {
      this.competitors = competitors;
      this.blockUI.stop();
    },
    () => this.blockUI.stop());
  }
}
