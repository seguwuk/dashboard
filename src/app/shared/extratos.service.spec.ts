import { TestBed } from '@angular/core/testing';

import { ExtratosService } from './extratos.service';

describe('ExtratosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExtratosService = TestBed.get(ExtratosService);
    expect(service).toBeTruthy();
  });
});
