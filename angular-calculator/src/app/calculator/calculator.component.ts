import { Component } from '@angular/core';
import { WebService } from "../service/web.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent {
  title = 'angular-calculator';
  inputBox = document.getElementById('inputBox');
  buttons = document.querySelectorAll('button');
  getData: string = '';
  string = '';
  constructor(public webService: WebService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.GetContentListData();
  }





  GetContentListData() {
    this.webService.getservice().subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
        if (err.status === 404) {
          console.log("Some error occured");
          this.toastr.error("Some error occured, please try again!!", "Error");
          console.log("Internet Connection Error");
        }
      }
    );
  }
  //operateur
  addop(o: string) {
    const lastKey = this.getData[this.getData.length - 1];

    if (
      lastKey === '/' ||
      lastKey === '*' ||
      lastKey === '-' ||
      lastKey === '+'
    ) {
      return;
    }
    if (this.getData != '') {
      this.getData = this.getData + o;
    }
  }
  getLastOperand() {
    let pos: number;
    console.log(this.getData);
    pos = this.getData.toString().lastIndexOf('+');
    if (this.getData.toString().lastIndexOf('-') > pos)
      pos = this.getData.lastIndexOf('-');
    if (this.getData.toString().lastIndexOf('*') > pos)
      pos = this.getData.lastIndexOf('*');
    if (this.getData.toString().lastIndexOf('/') > pos)
      pos = this.getData.lastIndexOf('/');
    console.log('Last ' + this.getData.substr(pos + 1));
    return this.getData.substr(pos + 1);
  }
  //input num
  add(n: string) {
    if (n == '.') {
      if (this.getData != '') {
        const lastNum = this.getLastOperand();
        console.log(lastNum.lastIndexOf('.'));
        if (lastNum.lastIndexOf('.') >= 0) return;
      } else this.getData = '0';
    }
    let testData = n;
    if((testData === "0" || testData === "00" ) && this.getData==='') return;
    this.getData = this.getData + n;
  }

  //clear all
  clearall() {
    this.getData = '';
  }
  //clear one cararcter
  delete() {
    if (this.getData != '') {
      this.getData = this.getData.substr(0, this.getData.length - 1);
    }
  }
  // plus Minus operation
  addcara() {
    if (this.getData != '') {
      this.getData = String(-eval(this.getData));
    }
  }
  // final operation or get result
  reponse() {
    if (this.getData != '') {
      if (this.getData == '0') this.getData = '';

      var obj = {
        expression : this.getData,
      }
      this.webService.calculation(obj).subscribe(
        (data) => {
          console.log(data);
          this.getData = data.output;
          this.toastr.success('The expression save to MongoDB database','Success');
        },
        (err) => {
          console.log(err);
          if (err.status === 400) {
            this.toastr.error('Internet Connection Error', 'Error');
            console.log("Internet Connection Error");
          }
        }
      );
    }
  }
}
