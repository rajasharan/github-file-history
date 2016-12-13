import { Component, OnInit, Input } from '@angular/core';

import { GithubService } from '../shared/gh-files.service';
import { Path } from '../shared/path'

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent implements OnInit {
  @Input() path: Path;

  constructor(private github: GithubService) { }

  ngOnInit() {
  }
  
}
