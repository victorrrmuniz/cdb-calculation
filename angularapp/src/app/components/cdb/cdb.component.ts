import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvestmentDto } from 'src/app/models/investmentDto.model';
import { CdbServiceService } from 'src/app/services/cdb-service.service';

@Component({
  selector: 'app-cdb',
  templateUrl: './cdb.component.html',
  styleUrls: ['./cdb.component.css']
})
export class CdbComponent {

  form!: FormGroup;
  result?: InvestmentDto;

  constructor(private fb: FormBuilder,
    private cdbService: CdbServiceService) { }

  ngOnInit() {
    this.form = this.fb.group({
      monetaryValue: ['', Validators.required],
      month: ['', Validators.required]
    });
  }

  calculate() {
    if (this.form.valid) {
      this.cdbService.calculate(this.form.get('monetaryValue')?.value, this.form.get('month')?.value).subscribe(result => {
        console.log(result)
        this.result = result;
      });
    }
  }
}
