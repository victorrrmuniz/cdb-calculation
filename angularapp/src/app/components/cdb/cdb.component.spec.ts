import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CdbComponent } from './cdb.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppModule } from 'src/app/app.module';
import { FormBuilder } from '@angular/forms';
import { CdbService } from 'src/app/services/cdb.service';

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
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(component instanceof CdbComponent).toBeTruthy();
    });

    it('should call calculate method when form is submitted', () => {
        spyOn(component, 'calculate');

        fixture.detectChanges();

        const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
        submitButton.click();
        expect(component.calculate).toHaveBeenCalled();
      });

      
});