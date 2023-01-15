import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable, Subject } from 'rxjs';
import { shareReplay } from 'rxjs';

export interface Color {
  number: string;
}

@Injectable({
  providedIn: 'root'
})

export class StoreService {

  private color = new BehaviorSubject<Color>({
    number: '#f22c3d'
  });

  private pickColorAction = new Subject<String>();

  color$ = this.createSelector(state => state.number)

  constructor() {
    this.createReducer(this.pickColorAction, (color) => {
      color.number = color.number
      return color;
    })
  }

  pickColor(color: string) {
    this.pickColorAction.next(color);
    console.log('CHANGE', color);
  }

  private createReducer<T>(
    action$: Observable<T>,
    accumulator: (state: Color, action: T) => Color,
  ) {
    action$.subscribe((action) => {
      const state = { ...this.color.value };
      const newState = accumulator(state, action);
      this.color.next(newState);
    })
  }

  private createSelector<T>(selector: (state: Color) => T): Observable<T> {
    return this.color.pipe(
      map(selector),
      distinctUntilChanged(),
      shareReplay(1),
    )
  }

}

