import { Injectable } from '@angular/core';

@Injectable()
export class GHFilesService {
  private files: any[];

  constructor() { }

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
}
