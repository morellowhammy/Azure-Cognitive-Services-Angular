import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/shared/admin.service';

@Component({
  selector: 'app-mlstudio-exercise',
  templateUrl: './mlstudio-exercise.component.html',
  styleUrls: ['./mlstudio-exercise.component.css']
})
export class MlstudioExerciseComponent implements OnInit {

  public isCompetitionStarted = false;

  constructor(public adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getCompetitionEnable().subscribe( (response) => {
      this.isCompetitionStarted = (response === 'true');
    });
  }

}
