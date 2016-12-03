import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-github-project',
  templateUrl: './github-project.component.html',
  styleUrls: ['./github-project.component.css']
})
export class GithubProjectComponent implements OnInit {
  private username: string;
  private project: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(obj => {
      this.username = obj["username"];
      this.project = obj["project"];
    });
  }

  private isButtonDisabled(): boolean {
    if (!this.username || !this.project || this.username.length === 0 || this.project.length === 0) {
      return true;
    }
    else {
      return false;
    }
  }
}
