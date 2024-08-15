import { makeAutoObservable, action } from 'mobx';

export class AppStore {
  consoleHistory: string[] = [];
  historyIndex: number = 0;
  lightMode: boolean = false;

  constructor() {
    makeAutoObservable(this, {
      clearIndex: action.bound,
      clearHistory: action.bound,
      addHistory: action.bound,
      changeIndex: action.bound,
      setLightMode: action.bound
    });
  }

  clearIndex() {
    this.historyIndex = 0;
  }

  clearHistory() {
    this.consoleHistory = this.consoleHistory.slice(-1);
  }

  addHistory(command: string) {
    this.consoleHistory.push(command);
  }

  changeIndex(num: number) {
    this.historyIndex += num;
  }

  setLightMode(lightMode: boolean) {
    this.lightMode = lightMode
  }
}
