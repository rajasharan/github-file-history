import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class GithubService {
  rawUrl: string = "https://raw.githubusercontent.com";
  apiUrl: string = "https://api.github.com";
  owner: string = "rajasharan";
  repo: string = "github-file-history";

  constructor(private http: Http) { }

  private trimUrl(url: string): string {
    return url.replace(/\/+$/, "");
  }

  getFiles$(
    owner: string = this.owner,
    repo: string = this.repo,
    apiUrl: string = this.apiUrl,
    sha: string = "master"
  ): Observable<string[]> {
      return this.http
        .get(`${this.trimUrl(apiUrl)}/repos/${owner}/${repo}/git/trees/${sha}?recursive=1`)
        .map(res => res.json().tree)
        .map(files => files.filter(f => f.size < 5000).filter(f => f.type === 'blob'))
        .map(files => files.map(f => f.path));
  }

  getFileContent$(
    filename: string,
    sha: string = "master",
    owner: string = this.owner,
    repo: string = this.repo,
    rawUrl: string = this.rawUrl
  ): Observable<string> {
      return this.http
        .get(`${this.trimUrl(rawUrl)}/${owner}/${repo}/${sha}/${filename}`)
        .map(res => res.text());
  }

  getFileCommits$(
    filename: string,
    apiUrl: string = this.apiUrl,
    owner: string = this.owner,
    repo: string = this.repo
  ): Observable<string[]> {
      return this.http
        .get(`${this.trimUrl(apiUrl)}/repos/${owner}/${repo}/commits?path=${filename}`)
        .map(res => res.json())
        .map(arr => arr.map(obj => obj.sha));
  }

  isInvalid(): boolean {
    if (!this.owner || !this.repo || !this.apiUrl 
        || this.owner.length === 0 || this.repo.length === 0
        || this.apiUrl.length === 0) {
      return true;
    }
    else {
      return false;
    }
  }
}
