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
    this.apiAccessToken = new FormControl('', [Validators.required]);
    this.endpoint = new FormControl('', [Validators.required]);
    this.competitorFormGroup = new FormGroup({
      name: this.name,
      email: this.email,
      apiAccessToken: this.apiAccessToken,
      endpoint: this.endpoint
    });
  }

  registerCompetitor(competitor: ICompetitor) {
    this.competitionService.addCompetitor(competitor).subscribe((comp) => {
      console.log('Competitor saved' + comp);
    });
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
