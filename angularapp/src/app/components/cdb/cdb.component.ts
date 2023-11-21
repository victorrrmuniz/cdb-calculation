import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvestmentDto } from 'src/app/models/investmentDto.model';
import { CdbService } from 'src/app/services/cdb.service';

@Component({
  selector: 'app-cdb',
  templateUrl: './cdb.component.html',
  styleUrls: ['./cdb.component.css']
})
export class CdbComponent {

  form!: FormGroup;
  result?: InvestmentDto;

  constructor(private fb: FormBuilder,
    private cdbService: CdbService) { }

  ngOnInit() {
    this.form = this.fb.group({
      monetaryValue: ['', Validators.required],
      month: ['', Validators.required]
    });
  }

  calculate() {
    if (this.form.valid) {
      this.cdbService.calculate(this.form.get('monetaryValue')?.value, this.form.get('month')?.value).subscribe(result => {
        this.result = result;
      });
    }
  }
}
