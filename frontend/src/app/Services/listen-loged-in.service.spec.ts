import { TestBed } from '@angular/core/testing';

import { ListenLogedInService } from './listen-loged-in.service';

describe('ListenLogedInService', () => {
  let service: ListenLogedInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListenLogedInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
