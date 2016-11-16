/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WindService } from './wind.service';

describe('WindService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WindService]
    });
  });

  it('should ...', inject([WindService], (service: WindService) => {
    expect(service).toBeTruthy();
  }));
});
