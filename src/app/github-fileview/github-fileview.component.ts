import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GithubService } from '../gh-files.service';

@Component({
  selector: 'app-github-fileview',
  templateUrl: './github-fileview.component.html',
  styleUrls: ['./github-fileview.component.css']
})
export class GithubFileviewComponent implements OnInit {
  private filename: string;
  private text: string;
  private commits: { [name: string]: string[] };
  private index: number;

  constructor(private router: ActivatedRoute, private github: GithubService) {
    this.commits = {};
    this.index = -1;
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.setFilename(params['filename']);
      this.resetIndex();
      this.displayFileContents();
      this.setCommits();
    });
  }

  private displayFileContents(sha: string = "master"): void {
    this.github.getFileContent$(this.filename, sha)
      .subscribe(
        text => this.text = text,
        err => console.log(err)
      );
  }

  private setFilename(filename: string): void {
    this.filename = filename;
    console.log(this.filename);
  }

  private resetIndex(): void {
    this.index = 0;
  }

  private setCommits(): void {
    if (!this.commits[this.filename]) {
      this.github.getFileCommits$(this.filename)
        .subscribe(
          sha => {
            this.commits[this.filename] = sha;
            console.log(sha);
          },
          err => console.log(err)
        );
    }
  }

  private prevCommit(): void {
    if (this.index < this.commits[this.filename].length - 1) {
      this.index++;
      this.displayFileContents(this.commits[this.filename][this.index]);
    }
  }

  private nextCommit(): void {
    if (this.index > 0) {
      this.index--;
      this.displayFileContents(this.commits[this.filename][this.index]);
    }
  }
}
