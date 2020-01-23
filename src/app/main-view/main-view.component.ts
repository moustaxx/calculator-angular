import { Component } from '@angular/core';

const isNumber = (value: any) => {
  if (typeof value !== 'string' && typeof value !== 'number') return false;
  return isNaN(Number(value)) || value === '' ? false : true;
};

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
    const lastOp = this.getLastOperation() || '';
    const poppedMathOperation = this.mathOperation.slice(0, -1);

    if (!isNumber(lastOp) || lastOp.length < 2) {
      this.mathOperation = poppedMathOperation;
      return;
    }

    const newLastOp = lastOp.slice(0, -1);
    this.mathOperation = [...poppedMathOperation, newLastOp];
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
    if (!isNumber(lastOp)) {
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

    if (lastOp === null || lastOp === undefined) {
      this.mathOperation = ['0.'];
      return;
    }
    if (lastOp?.includes('.') || !isNumber(lastOp)) return;

    const opsWithoutLast = this.mathOperation.slice(0, -1);
    const concatedOp = `${lastOp}.`;

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
        const lastOp = this.getLastOperation();
        if (!isNumber(lastOp) || lastOp === undefined) return;

        this.addOperation(event);
        break;
    }
  }

}
