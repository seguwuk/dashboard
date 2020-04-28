import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';

import { ExtratosService } from './extratos.service';

describe('ExtratosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [HttpClientModule, RouterTestingModule], 
    }).compileComponents();
  }));

  it('should be created', () => {
    const service: ExtratosService = TestBed.get(ExtratosService);
    expect(service).toBeTruthy();
  });
}); 
