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

  setFiles(files: any[]): void {
    this.files = files
      .filter(file => file.type === 'blob')
      .map(file => {
        return { name: file.path, type: file.type };
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
