import { makeAutoObservable, action } from 'mobx';

export class AnimationStore {
  inputFocused: boolean = false;
  mousePos: {x: number, y: number} = {x: 0, y: 0};

  constructor() {
    makeAutoObservable(this, {
      setInputFocused: action.bound,
      setMousePos: action.bound,
    })
  }

  setMousePos(pos: {x: number, y: number}) {
    this.mousePos = pos;
  }

  setInputFocused(inputFocused: boolean) {
    this.inputFocused = inputFocused;
  }
}