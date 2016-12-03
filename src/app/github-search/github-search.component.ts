import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { GHFilesService } from '../gh-files.service';

@Component({
  selector: 'app-github-search',
  templateUrl: './github-search.component.html',
  styleUrls: ['./github-search.component.css']
})
export class GithubSearchComponent implements OnInit {
  private API_URL:string = "https://api.github.com/";
  private apiUrl: string;

  private username: string;
  private project: string;

  constructor(private http: Http, private router: Router, private filesService: GHFilesService) { }

  ngOnInit() {
    this.apiUrl = this.API_URL;
    this.username = "rajasharan";
    this.project = "github-file-history";
  }

  private isInputInvalid(): boolean {
    if (!this.username || !this.project || !this.apiUrl 
        || this.username.length === 0 || this.project.length === 0
        || this.apiUrl.length === 0) {
      return true;
    }
    else {
      return false;
    }
  }

  onClick(): void {
    this.http
      .get(`${this.apiUrl.replace(/\/+$/, "")}/repos/${this.username}/${this.project}/git/trees/master?recursive=1`)
      .map(res => res.json())
      .subscribe(
        (val) => { 
          console.log(val);
          this.filesService.setFiles(val.tree);
          this.router.navigate(['/project', this.username, this.project]);
        },
        (e) => console.log(e)
      );

  }
}
