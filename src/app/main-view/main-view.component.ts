import { Component, OnInit } from '@angular/core';

const buttonsContent = [
  1, 2, 3, '÷', 'pow',
  4, 5, 6, '×', 'sqrt',
  7, 8, 9, '+', '-',
  0, '.', 'CE', 'C', '='
] as const;
type TButtonItemContent = typeof buttonsContent[number];

@Component({
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
  buttonsContent = buttonsContent;

  constructor() { }

  ngOnInit() {
  }

}
