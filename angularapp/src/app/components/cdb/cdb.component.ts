import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CdbServiceService } from 'src/app/services/cdb-service.service';

@Component({
  selector: 'app-cdb',
  templateUrl: './cdb.component.html',
  styleUrls: ['./cdb.component.css']
})
export class CdbComponent {

  form!: FormGroup;

  constructor(private fb: FormBuilder,
    private cdbService: CdbServiceService) { }

  ngOnInit() {
    this.form = this.fb.group({
      input: ['', Validators.required]
    });
  }

  calculate() {
    this.cdbService.calculate().subscribe(data => {
      console.log(data)
    });
  }
}
