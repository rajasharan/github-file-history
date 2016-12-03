import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { GithubService } from '../gh-files.service';

@Component({
  selector: 'app-github-project',
  templateUrl: './github-project.component.html',
  styleUrls: ['./github-project.component.css']
})
export class GithubProjectComponent implements OnInit {
  private username: string;
  private project: string;
  private files: any[];
  private fileContents: string;

  constructor(
    private router: Router,
    
    private route: ActivatedRoute,
    private http: Http,
    private github: GithubService) { }

  ngOnInit() {
    this.route.params.subscribe(obj => {
      this.username = obj["username"];
      this.project = obj["project"];
    });

    this.files = this.github.getFiles();

    this.router.events
      .subscribe(
        (r: RoutesRecognized) => {
          if (r.state && r.state.root) {
            r.state.root.children.forEach(routeSnapshot => {
              if (routeSnapshot.component === GithubProjectComponent) {
                console.log(routeSnapshot.params);
              }
            });
          }
        },
        err => console.log(err)
      );
  }

  private isButtonDisabled(): boolean {
    if (!this.username || !this.project || this.username.length === 0 || this.project.length === 0) {
      return true;
    }
    else {
      return false;
    }
  }

  getFileContents(filename: string): void {
    this.http
      .get(`${this.github.rawUrl.replace(/\/+$/, "")}/${this.username}/${this.project}/master/${filename}`)
      .map(res => res.text())
      .subscribe(
        text => this.fileContents = text,
        err => console.log(err)
      );

  }
}
