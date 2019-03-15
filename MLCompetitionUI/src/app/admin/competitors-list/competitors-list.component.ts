import { AdminService } from './../shared/admin.service';
import { Component, OnInit } from '@angular/core';
import { CompetitionService } from 'src/app/shared/competition.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ICompetitor } from 'src/app/shared/competitor.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-competitors-list',
  templateUrl: './competitors-list.component.html',
  styleUrls: ['./competitors-list.component.css']
})
export class CompetitorsListComponent implements OnInit {

  public displayedColumns: string[];
  public competitors: ICompetitor[];
  public adminFormGroup: FormGroup;
  public numberScoringTestGroup: FormGroup;
  public userKeyForm: FormControl;
  public numberScoringTestControl: FormControl;

  public adminKey = 'keyforge';
  public userKey = '';
  public isCompEnabled = true;
  public numberOfScoringTests = 100;
  public environmentName: string;

  @BlockUI() private blockUI: NgBlockUI;

  constructor(
    public competitionService: CompetitionService,
    public adminService: AdminService) { }

  ngOnInit() {
    this.environmentName = environment.envName;
    this.displayedColumns = ['name', 'email', 'delete'];
    this.userKeyForm = new FormControl('');
    this.numberScoringTestControl = new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]+')
    ]);

    this.adminFormGroup = new FormGroup({
      userKey: this.userKeyForm
    });

    this.numberScoringTestGroup = new FormGroup({
      numberOfScoringTests: this.numberScoringTestControl
    });

    this.loadCompetitors();
    this.loadCompetitionFlag();
    this.loadNumberOfScoringTests();
  }

  delete(name: string) {
    this.blockUI.start('Deleting competitor');
    this.competitionService.deleteCompetitor(name).subscribe( (response) => {
      this.blockUI.stop();
      this.loadCompetitors();
    },
    () => this.blockUI.stop());
  }

  private loadCompetitors() {
    this.blockUI.start('Loading Competitors...');

    this.competitionService.getCompetitorsList().subscribe( (competitors) => {
      this.competitors = competitors;
      this.blockUI.stop();
    },
    () => this.blockUI.stop());
  }

  private loadCompetitionFlag() {
    this.adminService.getCompetitionEnable().subscribe( (response) => {
      this.isCompEnabled = response === 'true';
    });
  }

  private loadNumberOfScoringTests() {
    this.adminService.getNumberOfScoringTests().subscribe( (response) => {
      this.numberOfScoringTests = +response;
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

  public setNumberOfScoringTest(form) {
    if (this.numberScoringTestGroup.valid) {
      this.blockUI.start('Updating Competition...');

      this.adminService.setNumberOfScoringTests(form.numberOfScoringTests).subscribe((response) => {
        this.numberOfScoringTests = response;
        this.blockUI.stop();
      },
      () => this.blockUI.stop());
    }
  }
}
