import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class GithubService {
  private files: any[];

  rawUrl: string = "https://raw.githubusercontent.com";
  apiUrl: string = "https://api.github.com";
  owner: string = "rajasharan";
  repo: string = "ng2-healthcheck";

  constructor(private http: Http) { }

  private trimUrl(url: string): string {
    return url.replace(/\/+$/, "");
  }

  getFiles$(
    apiUrl: string = this.apiUrl,
    owner: string = this.owner,
    repo: string = this.repo,
    sha: string = "master"
  ): Observable<any> {
      return this.http
        .get(`${this.trimUrl(apiUrl)}/repos/${owner}/${repo}/git/trees/${sha}?recursive=1`)
        .map(res => res.json().tree)
        .map(files => files.filter(f => f.size < 5000).filter(f => f.type === 'blob'))
        .map(files => files.map(f => f.path));
  }

  getFileContent$(
    filename: string,
    rawUrl: string = this.rawUrl,
    owner: string = this.owner,
    repo: string = this.repo,
    sha: string = "master"
  ): Observable<any> {
      return this.http
        .get(`${this.trimUrl(rawUrl)}/${owner}/${repo}/${sha}/${filename}`)
        .map(res => res.text());
  }

  getFileCommits$(
    filename: string,
    apiUrl: string = this.rawUrl,
    owner: string = this.owner,
    repo: string = this.repo
  ): Observable<string> {
      return this.http
        .get(`${this.trimUrl(apiUrl)}/repos/${owner}/${repo}/commits?path=${filename}`)
        .map(res => res.json())
        .map(arr => arr.map(obj => obj.sha));
  }

  setFiles(files: any[]): void {
    this.files = files
      .filter(file => file.type === 'blob')
      .filter(file => file.size <= 5000)
      .map(file => {
        return { name: file.path, type: file.type, size: file.size };
      })
  }

  getFiles(): any[] {
    return this.files;
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
