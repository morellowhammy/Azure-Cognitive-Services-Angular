import { Component } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'STW 2019 Workshop ';

  @BlockUI() private blockUI: NgBlockUI;

  constructor() {
    this.blockUI.start('Loading...'); // Start blocking
    document.title = this.title + environment.envName;

    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
    }, 2000);
  }
}
