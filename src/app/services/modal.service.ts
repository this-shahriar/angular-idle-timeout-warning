import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ModalComponent } from '../components/modal/modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  public modalOpen: boolean = false;

  private userCancelled = new Subject<boolean>();
  userCancelled$ = this.userCancelled.asObservable();

  constructor(public dialog: MatDialog) {}

  openDialog(msg: string) {
    this.modalOpen = true;
    const dialogRef = this.dialog.open(ModalComponent, {
      data: { message: msg, cancel: () => this.userCancelled.next(true) },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.modalOpen = false;
    });
  }

  closeDialog() {
    this.modalOpen = false;
    this.userCancelled.next(false);
    this.dialog.closeAll();
  }
}
