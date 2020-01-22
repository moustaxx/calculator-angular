import { Component } from '@angular/core';

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
export class MainViewComponent {
  buttonsContent = buttonsContent;
  mathOperation: string[] = [];

  undoLastOperation() {
    const poppedMathOperation = this.mathOperation.slice(0, -1);
    this.mathOperation = poppedMathOperation;
  }

  clearMathOperations() {
    this.mathOperation = [];
  }

  getResult() {

  }

  getLastOperation() {
    return this.mathOperation[this.mathOperation.length - 1] || null;
  }

  concatLastOperation(operation: number) {
    const lastOp = this.getLastOperation() || '';
    if (!Number(lastOp)) {
      this.addOperation(String(operation));
      return;
    }
    const parsedOperation = operation;
    const concatedOp = `${lastOp}${parsedOperation}`;
    const opsWithoutLast = this.mathOperation.slice(0, -1);

    this.mathOperation = [...opsWithoutLast, concatedOp];
  }

  addOperation(op: string) {
    this.mathOperation = [...(this.mathOperation || []), op];
  }

  handleDot() {
    const lastOp = this.getLastOperation();
    if (lastOp?.includes('.') || !Number(lastOp)) return;
    const concatedOp = `${lastOp}.`;
    const opsWithoutLast = this.mathOperation.slice(0, -1);

    this.mathOperation = [...opsWithoutLast, concatedOp];
  }

  dispatchAction(event: TButtonItemContent) {
    switch (event) {
      case 'C':
        this.undoLastOperation();
        break;
      case 'CE':
        this.clearMathOperations();
        break;
      case '=':
        this.getResult();
        break;
      case '.':
        this.handleDot();
        break;
      default:
        if (typeof event === 'number') {
          this.concatLastOperation(event);
          return;
        }

        this.addOperation(event);
        break;
    }
  }

}
