import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-calculator';
  inputBox = document.getElementById('inputBox');
  buttons = document.querySelectorAll('button');
  getData: string = '';
  string = '';
  constructor() {}

  ngOnInit(): void {}
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
      this.getData = eval(this.getData);
      this.getData = this.getData;
      if (Number(this.getData) % 1 != 0)
        this.getData = Number(this.getData).toFixed(2);
      if (this.getData == '0') this.getData = '';
    }
  }
}
