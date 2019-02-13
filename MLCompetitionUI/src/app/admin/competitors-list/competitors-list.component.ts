import { AdminService } from './../shared/admin.service';
import { Component, OnInit } from '@angular/core';
import { CompetitionService } from 'src/app/shared/competition.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ICompetitor } from 'src/app/shared/competitor.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-competitors-list',
  templateUrl: './competitors-list.component.html',
  styleUrls: ['./competitors-list.component.css']
})
export class CompetitorsListComponent implements OnInit {

  public displayedColumns: string[];
  public competitors: ICompetitor[];
  public adminFormGroup: FormGroup;
  public userKeyForm: FormControl;
  public adminKey = 'keyforge';
  public userKey = '';
  public isCompEnabled = true;

  @BlockUI() private blockUI: NgBlockUI;

  constructor(
    public competitionService: CompetitionService,
    public adminService: AdminService) { }

  ngOnInit() {
    this.displayedColumns = ['name', 'email', 'delete'];
    this.userKeyForm = new FormControl('');
    this.adminFormGroup = new FormGroup({
      userKey: this.userKeyForm
    });
    this.loadCompetitors();
    this.loadCompetitionFlag();
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

  loadCompetitionFlag() {
    this.adminService.getCompetitionEnable().subscribe( (response) => {
      this.isCompEnabled = response === 'true';
    });
  }

  setUserKey(form) {
    this.userKey = form.userKey;
  }

  public setCompetitionEnable(enabled) {
    this.blockUI.start('Updating Competition...');

    this.adminService.setCompetitionEnable(enabled).subscribe((response) => {
      this.isCompEnabled = response;
      this.blockUI.stop();
    },
    () => this.blockUI.stop());
  }
}
