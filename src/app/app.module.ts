import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { GithubSearchComponent } from './github-search/github-search.component';
import { GithubProjectComponent } from './github-project/github-project.component';
import { GithubService } from './shared/gh-files.service';
import { GithubFileviewComponent } from './github-fileview/github-fileview.component';
import { FilenamePipe } from './shared/filename.pipe';
import { TreeViewComponent } from './tree-view/tree-view.component';

const appRoutes: Routes = [
  { path: '', component: GithubSearchComponent },
  { path: 'project/:owner/:repo',
    component: GithubProjectComponent,
    children: [
      { path: ':filename', component: GithubFileviewComponent },
      { path: '', redirectTo: 'README.md' }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    GithubSearchComponent,
    GithubProjectComponent,
    GithubFileviewComponent,
    FilenamePipe,
    TreeViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [GithubService],
  bootstrap: [AppComponent]
})
export class AppModule { }
