import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CdbComponent } from './cdb.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppModule } from 'src/app/app.module';
import { FormBuilder } from '@angular/forms';
import { CdbService } from 'src/app/services/cdb.service';
import { InvestmentDto } from 'src/app/models/investmentDto.model';
import { of } from 'rxjs';

describe('CdbComponent', () => {
    let component: CdbComponent;
    let fixture: ComponentFixture<CdbComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [CdbComponent],
            imports: [HttpClientTestingModule, AppModule],
            providers: [FormBuilder, CdbService]
        });

        fixture = TestBed.createComponent(CdbComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(component instanceof CdbComponent).toBeTruthy();
    });

    it('should call calculate method when form is submitted', () => {
        spyOn(component, 'calculate');

        const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
        submitButton.click();
        expect(component.calculate).toHaveBeenCalled();
      });

    it('should validate form', () => {
        const form = component.form;

        form.get('monetaryValue')?.setValue('');
        form.get('month')?.setValue('');

        expect(form.valid).toBeFalsy();
        expect(form.get('monetaryValue')?.hasError('required')).toBeTruthy();
        expect(form.get('month')?.hasError('required')).toBeTruthy();

        form.get('monetaryValue')?.setValue(0);
        form.get('month')?.setValue(1);

        expect(form.valid).toBeTruthy();
        expect(form.get('monetary')?.hasError('min')).toBeFalsy();
        expect(form.get('month')?.hasError('min')).toBeFalsy();

        form.get('monetaryValue')?.setValue(100);
        form.get('month')?.setValue(6);

        expect(form.valid).toBeTruthy();
    });

    it('should display the correct result of cdb calculation', () => {
        const result: InvestmentDto = { grossValue: 1059, netValue: 1046 };
        spyOn(component.cdbService, 'calculate').and.returnValue(of(result));

        component.form.get('monetaryValue')?.setValue(1000);
        component.form.get('month')?.setValue(6);
        component.calculate();
        fixture.detectChanges();

        const resultContainer = fixture.nativeElement.querySelector('.result-container');
        expect(resultContainer).toBeTruthy();
        expect(resultContainer.textContent).toContain(`R$ ${result.grossValue}`);
        expect(resultContainer.textContent).toContain(`R$ ${result.netValue}`);


        component.form.get('monetaryValue')?.setValue(100);
    });
});