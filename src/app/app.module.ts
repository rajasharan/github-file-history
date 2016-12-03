import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { GithubSearchComponent } from './github-search/github-search.component';
import { GithubProjectComponent } from './github-project/github-project.component';
import { GithubService } from './gh-files.service';

const appRoutes: Routes = [
  { path: '', component: GithubSearchComponent },
  { path: 'project/:username/:project', component: GithubProjectComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    GithubSearchComponent,
    GithubProjectComponent
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
