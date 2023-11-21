import { TestBed } from '@angular/core/testing';
import { CdbServiceService } from './cdb-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CdbServiceService', () => {
  let cdbService: CdbServiceService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CdbServiceService]
    });
    cdbService = TestBed.inject(CdbServiceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(cdbService).toBeTruthy();
    expect(cdbService instanceof CdbServiceService).toBeTruthy();
  });

  it('should send an http request with the correct parameters', () => {
    const monetaryValue = 1000;
    const month = 6;

    cdbService.calculate(monetaryValue, month).subscribe();

    const req = httpTestingController.expectOne(`${cdbService.baseAddress}/cdb?monetaryValue=${monetaryValue}&month=${month}`);
    expect(req.request.method).toEqual('GET');

    req.flush({});
  });

  it('should show error message', () => {
    const monetaryValue = 1000;
    const month = 1;

    cdbService.calculate(monetaryValue, month).subscribe(
      () => fail('should have failed with error'),
      (error) => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpTestingController.expectOne(`${cdbService.baseAddress}/cdb?monetaryValue=${monetaryValue}&month=${month}`);
    req.error(new ErrorEvent('Network error'));
  });
});