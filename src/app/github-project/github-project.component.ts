import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GHFilesService } from '../gh-files.service';

@Component({
  selector: 'app-github-project',
  templateUrl: './github-project.component.html',
  styleUrls: ['./github-project.component.css']
})
export class GithubProjectComponent implements OnInit {
  private username: string;
  private project: string;
  private files: any[];

  constructor(private route: ActivatedRoute, private filesService: GHFilesService) { }

  ngOnInit() {
    this.route.params.subscribe(obj => {
      this.username = obj["username"];
      this.project = obj["project"];
    });

    this.files = this.filesService.getFiles();
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
