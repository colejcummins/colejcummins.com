import { makeObservable, observable, action } from 'mobx';

export class AppStore {
  @observable consoleHistory: string[] = [];
  @observable historyIndex: number = 0;

  constructor() {
    makeObservable(this);
  }

  @action.bound
  clearIndex() {
    this.historyIndex = 0;
  }

  @action.bound
  clearHistory() {
    this.consoleHistory = [];
  }

  @action.bound
  addHistory(command: string) {
    this.consoleHistory.push(command);
  }

  @action.bound
  changeIndex(num: number) {
    this.historyIndex += num;
  }
}
