import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-number-button',
  templateUrl: './number-button.component.html',
  styleUrls: ['./number-button.component.scss']
})
export class NumberButtonComponent {
  @Input() content = '';

  @Output() clickEmitter = new EventEmitter<string | number>();

  public handleClick() {
    this.clickEmitter.emit(this.content);
  }

}
