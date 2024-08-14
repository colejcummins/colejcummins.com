import { makeAutoObservable, action } from 'mobx';

export class AppStore {
  consoleHistory: string[] = [];
  historyIndex: number = 0;

  constructor() {
    makeAutoObservable(this, {
      clearIndex: action.bound,
      clearHistory: action.bound,
      addHistory: action.bound,
      changeIndex: action.bound
    });
  }

  clearIndex() {
    this.historyIndex = 0;
  }

  clearHistory() {
    this.consoleHistory = [];
  }

  addHistory(command: string) {
    this.consoleHistory.push(command);
  }

  changeIndex(num: number) {
    this.historyIndex += num;
  }
}
