import { CompetitionService } from './../../shared/competition.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ICompetitor } from 'src/app/shared/competitor.model';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent implements OnInit {
  competitorFormGroup: FormGroup;
  name: FormControl;
  email: FormControl;
  apiAccessToken: FormControl;
  endpoint: FormControl;

  constructor(public competitionService: CompetitionService) { }

  ngOnInit() {
    this.name = new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z].*')
      ]
    );
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.apiAccessToken = new FormControl();
    this.endpoint = new FormControl();
    this.competitorFormGroup = new FormGroup({
      name: this.name,
      email: this.email,
      apiAccessToken: this.apiAccessToken,
      endpoint: this.endpoint
    });
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' : '';
  }

  registerCompetitor(competitor: ICompetitor) {
    this.competitionService.addCompetitor(competitor).subscribe((comp) => {
      console.log('Competitor saved' + comp);
    });
  }
}
