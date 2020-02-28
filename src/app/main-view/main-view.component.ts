import { Component, ViewChild, ElementRef, AfterContentChecked, AfterViewChecked } from '@angular/core';
import mexp from 'math-expression-evaluator';

const isNumber = (value: any) => {
  if (typeof value !== 'string' && typeof value !== 'number') return false;
  return isNaN(Number(value)) || value === '' ? false : true;
};

const buttonsContent = [
  1, 2, 3, '÷', '^',
  4, 5, 6, '×', '√',
  7, 8, 9, '+', '-',
  0, '.', 'sin', 'cos', 'tan',
  '(', ')', 'CE', 'C', '='
] as const;
type TButtonItemContent = typeof buttonsContent[number];

export interface IHistoryElement {
  expression: string[];
  timestamp: number;
  result: number;
}

@Component({
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements AfterViewChecked {
  buttonsContent = buttonsContent;
  mathExpression: string[] = [];
  instantResult: number | null = null;

  @ViewChild('mathExprDiv') mathExprDiv: ElementRef<HTMLDivElement> | null = null;

  ngAfterViewChecked() {
    this.scrollExpressionToRight();
  }

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
    this.instantResult = null;
  }

  getMathExpressionString() {
    return this.mathExpression
      .join('')
      .split('÷').join('/')
      .split('×').join('*')
      .split('√').join('root');
  }

  getResult() {
    const expression = this.getMathExpressionString();
    const result = mexp.eval(expression);

    const history: IHistoryElement[] = JSON.parse(localStorage.getItem('history') as string) || [];
    const historyElement: IHistoryElement = {
      expression: this.mathExpression,
      timestamp: Date.now(),
      result
    };
    const newHistory = [historyElement, ...history];
    localStorage.setItem('history', JSON.stringify(newHistory));

    this.mathExpression = [String(result)];
    this.instantResult = null;
  }

  getInstantResult() {
    const lastOp = this.getLastOperation();
    if (!isNumber(lastOp) && lastOp !== ')') return;

    const expression = this.getMathExpressionString();
    try {
      const result = mexp.eval(expression);
      this.instantResult = result;
    } catch (error) {
      this.instantResult = null;
    }
  }

  getLastOperation() {
    return this.mathExpression[this.mathExpression.length - 1] || null;
  }

  scrollExpressionToRight() {
    const mathExprDiv = this.mathExprDiv?.nativeElement;
    mathExprDiv?.scrollTo(1000000, 0);
  }

  concatLastOperation(operation: number) {
    const lastOp = this.getLastOperation() || '';
    if (!isNumber(lastOp)) {
      this.addOperation(String(operation));
      return;
    }
    if (lastOp.length >= 1 && lastOp[0] === '0' && lastOp[1] !== '.') {
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

  handleMinus() {
    const lastOp = this.getLastOperation();
    if (lastOp === '-') return;
    this.addOperation('-');
  }

  // handleNotRepeatedOp(operation: string) {
  //   if (this.getLastOperation() === operation) return;
  //   this.addOperation(operation);
  //   this.getInstantResult();
  // }

  dispatchAction(event: TButtonItemContent) {
    switch (event) {
      case 'C':
        this.undoLastOperation();
        this.getInstantResult();
        break;
      case 'CE':
        this.clearMathExpression();
        break;
      case '=':
        this.getResult();
        break;
      case '.':
        this.handleDot();
        break;
      case '-':
        this.handleMinus();
        break;
      case ')':
        this.addOperation(event);
        this.getInstantResult();
        break;
      case '√':
        this.addOperation(event);
        this.getInstantResult();
        break;
      default:
        if (typeof event === 'number') {
          this.concatLastOperation(event);
          this.getInstantResult();
          return;
        }
        // const lastOp = this.getLastOperation();
        // if (!isNumber(lastOp) || lastOp === undefined) return;

        this.addOperation(event);
        break;
    }
  }

}
