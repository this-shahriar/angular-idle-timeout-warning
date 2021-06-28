import { Injectable } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { ModalService } from './modal.service';
import { TimeoutService } from './timeout.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private inactivityMsg = new Subject<string | null>();
  inactivityMsg$ = this.inactivityMsg.asObservable();

  constructor(
    private _modalService: ModalService,
    private _timeoutService: TimeoutService
  ) {
    this._timeoutService.current$.subscribe((now) => {
      console.log('now', now);
    });

    this.isLoggedIn$.subscribe((data) => {
      if (data) this._timeoutService.startWatching();
      else this._timeoutService.stopWatching();
    });

    this._timeoutService.timeout$.subscribe((timeout) => {
      console.log('timeout func');
      this._timeoutService.stopWatching();
      if (!this._modalService.modalOpen) {
        this._modalService.openDialog('Are you still there?');
      }

      const modalTimer = setTimeout(() => {
        this._modalService.closeDialog();
        this._timeoutService.resetTimer();
        this.auth(false, true);
      }, 5000);

      this._modalService.userCancelled$.subscribe((cancelled) => {
        if (cancelled) {
          clearTimeout(modalTimer);
          this._modalService.closeDialog();
          this._timeoutService.stopWatching();
          this._timeoutService.resetTimer();
          this._timeoutService.startWatching();
        }
      });
    });
  }

  private isLoggedIn = new Subject<boolean>();
  isLoggedIn$ = this.isLoggedIn.asObservable();
  auth = (data: boolean, inactivity?: boolean) => {
    this.isLoggedIn.next(data);
    if (inactivity)
      this.inactivityMsg.next('You are logged out due to inactivity');
    else this.inactivityMsg.next(null);
  };
}
