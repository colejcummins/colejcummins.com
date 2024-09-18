import { makeAutoObservable, action, computed } from 'mobx';
import { getValidCdTargets, ROOTNAME } from '@/lib/fs';

export interface HistoryItem {
  text: string;
  validation: string;
  location: string;
}

export class AppStore {
  consoleHistory: HistoryItem[] = [];
  historyIndex: number = 0;
  lightMode: boolean = false;
  currentNode: string = ROOTNAME;

  constructor() {
    makeAutoObservable(this, {
      validCdTargets: computed,
      clearIndex: action.bound,
      clearHistory: action.bound,
      addHistory: action.bound,
      changeIndex: action.bound,
      setLightMode: action.bound,
      goToNode: action.bound
    });
  }

  get validCdTargets(): string[] {
    console.log(getValidCdTargets(this.currentNode));
    return getValidCdTargets(this.currentNode);
  }

  goToNode(nodeName: string) {
    this.currentNode = nodeName;
  }

  clearIndex() {
    this.historyIndex = 0;
  }

  clearHistory() {
    this.consoleHistory = this.consoleHistory.slice(-1);
  }

  addHistory(text: string, validation: string, location: string) {
    this.consoleHistory.push({ text, validation, location });
  }

  changeIndex(num: number) {
    this.historyIndex += num;
  }

  setLightMode(lightMode: boolean) {
    this.lightMode = lightMode;
  }
}
