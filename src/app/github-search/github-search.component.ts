import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { GithubService } from '../gh-files.service';

@Component({
  selector: 'app-github-search',
  templateUrl: './github-search.component.html',
  styleUrls: ['./github-search.component.css']
})
export class GithubSearchComponent implements OnInit {

  constructor(private http: Http, private router: Router, private github: GithubService) { }

  ngOnInit() {
  }

  onClick(): void {
    this.http
      .get(`${this.github.apiUrl.replace(/\/+$/, "")}/repos/${this.github.owner}/${this.github.repo}/git/trees/master?recursive=1`)
      .map(res => res.json())
      .subscribe(
        (val) => { 
          console.log(val);
          this.github.setFiles(val.tree);
          this.router.navigate(['/project', this.github.owner, this.github.repo]);
        },
        (e) => console.log(e)
      );

  }
}
