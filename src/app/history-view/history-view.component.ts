import { Component } from '@angular/core';
import { IHistoryElement } from '../main-view/main-view.component';

@Component({
  selector: 'app-history-view',
  templateUrl: './history-view.component.html',
  styleUrls: ['./history-view.component.scss']
})
export class HistoryViewComponent {
  history: IHistoryElement[] = JSON.parse(localStorage.getItem('history') as string) || [];

  getDateString(date: number) {
    return new Date(date).toLocaleString();
  }

  clearHistory() {
    this.history = [];
    localStorage.removeItem('history');
  }

}
