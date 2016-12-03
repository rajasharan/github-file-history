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
  constructor(private router: ActivatedRoute, private github: GithubService) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.setFilename(params['filename']);
      this.displayFileContents();
    });
  }

  private displayFileContents(): void {
    this.github.getFileContent$(this.filename)
      .subscribe(
        text => this.text = text,
        err => console.log(err)
      );
  }

  private setFilename(filename: string): void {
    this.filename = filename;
  }
}
