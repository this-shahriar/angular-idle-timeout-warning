import { Injectable } from '@angular/core';
import { UserIdleService } from 'angular-user-idle';
import { interval, Subject } from 'rxjs';
import { takeUntil, takeWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TimeoutService {
  private timeout = new Subject<boolean>();
  timeout$ = this.timeout.asObservable();

  private current = new Subject<any>();
  current$ = this.current.asObservable();

  private isDone = new Subject<boolean>();
  isDone$ = this.isDone.asObservable();

  timeCount = interval(1000);

  constructor(private _userIdle: UserIdleService) {
    this._userIdle.setConfigValues({
      idle: 10,
      timeout: 1,
    });

    this.isDone.next(false);
    this._userIdle.onTimerStart().subscribe();
    this._userIdle.onTimeout().subscribe(() => {
      this.timeout.next(true);
    });
    this._userIdle.onIdleStatusChanged().subscribe((val) => {
      console.log('onIdleStatusChanged', val);
      if (val) {
        this.timeCount.pipe(takeUntil(this.isDone$)).subscribe((now) => {
          this.current.next(now);
        });
      } else this.isDone.next(true);
    });
  }

  startWatching() {
    this._userIdle.startWatching();
  }

  stopWatching() {
    this._userIdle.stopWatching();
  }

  resetTimer() {
    this._userIdle.resetTimer();
  }
}
