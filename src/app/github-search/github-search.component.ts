import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

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

  constructor(private http: Http) { }

  ngOnInit() {
    this.apiUrl = this.API_URL;
  }

  private isButtonDisabled(): boolean {
    if (!this.username || !this.project || !this.apiUrl 
        || this.username.length === 0 || this.project.length === 0
        || this.apiUrl.length === 0) {
      return true;
    }
    else {
      return false;
    }
  }

}
