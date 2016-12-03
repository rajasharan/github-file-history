/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GhFilesService } from './gh-files.service';

describe('GhFilesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GhFilesService]
    });
  });

  it('should ...', inject([GhFilesService], (service: GhFilesService) => {
    expect(service).toBeTruthy();
  }));
});
