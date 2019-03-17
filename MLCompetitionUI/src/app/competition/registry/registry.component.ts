import { AdminService } from 'src/app/admin/shared/admin.service';
import { CompetitionService } from './../../shared/competition.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ICompetitor } from 'src/app/shared/competitor.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent implements OnInit {
  public competitorFormGroup: FormGroup;
  public name: FormControl;
  public email: FormControl;
  public apiAccessToken: FormControl;
  public endpoint: FormControl;
  public isCompetitionStarted = false;

  public endpointFormat = `
  {
    "GlobalParameters": {},
    "Inputs": {
        "input1": [
            {
                "alcohol": "1",
                "chlorides": "1",
                "citric acid": "1",
                "density": "1",
                "fixed acidity": "1",
                "free sulfur dioxide": "1",
                "pH": "1",
                "residual sugar": "1",
                "sulphates": "1",
                "total sulfur dioxide": "1",
                "volatile acidity": "1"
            }
        ]
    }
  }
  `;

  @BlockUI() private blockUI: NgBlockUI;

  constructor(
    private competitionService: CompetitionService,
    private router: Router,
    private toastr: ToastrService,
    private adminService: AdminService) { }

  ngOnInit() {
    this.name = new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z].*')
      ]
    );
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.apiAccessToken = new FormControl('', [Validators.required]);
    this.endpoint = new FormControl('', [Validators.required]);
    this.competitorFormGroup = new FormGroup({
      name: this.name,
      email: this.email,
      apiAccessToken: this.apiAccessToken,
      endpoint: this.endpoint
    });

    this.adminService.getCompetitionEnable().subscribe( (response) => {
      this.isCompetitionStarted = (response === 'true');
    });
  }

  registerCompetitor(competitor: ICompetitor) {
    if (!this.isCompetitionStarted) {
      this.toastr.warning('Sorry, there is no competition in progress!');
      return;
    }

    if (this.competitorFormGroup.valid) {
      this.blockUI.start('Registering competitor...');
      this.competitionService.addCompetitor(competitor).subscribe((comp: ICompetitor) => {
        if (comp) {
          this.toastr.success(comp.name + ' has completed the registration!');
          this.router.navigate(['competition/ranking']);
        }
      },
      () => this.blockUI.stop(),
      () => this.blockUI.stop());
    } else {
      this.blockUI.stop();
      this.toastr.error('There are some errors in the form');
    }
  }

  getErrorMessage(field: string) {
    switch (field) {
      case 'name': {
        return this.name.hasError('required') ? 'You must enter a value' :
          this.name.hasError('pattern') ? 'Not a valid name' : '';
      }
      case 'email': {
        return this.email.hasError('required') ? 'You must enter a value' :
          this.email.hasError('email') ? 'Not a valid email' : '';
      }
      case 'apiAccessToken': {
        return this.apiAccessToken.hasError('required') ? 'You must enter a value' : '';
      }
      case 'endpoint': {
        return this.endpoint.hasError('required') ? 'You must enter a value' : '';
      }
      default: return '';
    }
  }
}
