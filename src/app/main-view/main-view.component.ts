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
  mathExpression: string[] = [];

  undoLastOperation() {
    const lastOp = this.getLastOperation() || '';
    const poppedMathExpression = this.mathExpression.slice(0, -1);

    if (!isNumber(lastOp) || lastOp.length < 2) {
      this.mathExpression = poppedMathExpression;
      return;
    }

    const newLastOp = lastOp.slice(0, -1);
    this.mathExpression = [...poppedMathExpression, newLastOp];
  }

  clearMathExpression() {
    this.mathExpression = [];
  }

  getResult() {

  }

  getLastOperation() {
    return this.mathExpression[this.mathExpression.length - 1] || null;
  }

  concatLastOperation(operation: number) {
    const lastOp = this.getLastOperation() || '';
    if (!isNumber(lastOp)) {
      this.addOperation(String(operation));
      return;
    }
    const parsedOperation = operation;
    const concatedOp = `${lastOp}${parsedOperation}`;
    const opsWithoutLast = this.mathExpression.slice(0, -1);

    this.mathExpression = [...opsWithoutLast, concatedOp];
  }

  addOperation(op: string) {
    this.mathExpression = [...(this.mathExpression || []), op];
  }

  handleDot() {
    const lastOp = this.getLastOperation();

    if (lastOp === null || lastOp === undefined) {
      this.mathExpression = ['0.'];
      return;
    }
    if (lastOp?.includes('.') || !isNumber(lastOp)) return;

    const opsWithoutLast = this.mathExpression.slice(0, -1);
    const concatedOp = `${lastOp}.`;

    this.mathExpression = [...opsWithoutLast, concatedOp];
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
