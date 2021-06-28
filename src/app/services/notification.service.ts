import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notification = new Subject<string>();
  notification$ = this.notification.asObservable();

  constructor() {
    setTimeout(() => {
      this.notification.next('Hello');
    }, 5000);
  }
}
