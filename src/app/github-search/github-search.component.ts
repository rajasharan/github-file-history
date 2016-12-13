import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { GithubService } from '../shared/gh-files.service';

@Component({
  selector: 'app-github-search',
  templateUrl: './github-search.component.html',
  styleUrls: ['./github-search.component.css']
})
export class GithubSearchComponent implements OnInit {

  constructor(private router: Router, private github: GithubService) { }

  ngOnInit() {
  }
}
