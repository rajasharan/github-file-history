import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { GithubService } from '../shared/gh-files.service';
import { Path } from '../shared/path';

@Component({
  selector: 'app-github-project',
  templateUrl: './github-project.component.html',
  styleUrls: ['./github-project.component.css']
})
export class GithubProjectComponent implements OnInit {
  private fileContent$: Observable<string>;
  private rootFs: Path = new Path("/", null);

  constructor(
    private route: ActivatedRoute,
    private github: GithubService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(obj => {
      this.routeParamsChanged(obj);
      this.listFiles();
    });
  }

  private routeParamsChanged(params): void {
    this.github.owner = params["owner"];
    this.github.repo = params["repo"];
  }

  private listFiles(): void {
    this.github.getFiles$(this.github.owner, this.github.repo)
      .subscribe(
        filenames => {
          filenames.forEach(file => this.rootFs.add(file));
          //console.log(this.rootFs);
        },
        err => console.log(err)
      );
  }
}
