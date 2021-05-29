import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
/** define component */
@Component({
  selector: 'app-okdialog',
  templateUrl: './okdialog.component.html',
  styleUrls: ['./okdialog.component.scss'],
})
/** define class */
export class OkdialogComponent {
  /** inject the title from parent component */
  @Input() title: any;
  /** inject the content from parent component */
  @Input() content: any;
  /**
   * constructor
   * @param dialogRef inject the dialog ref
   */
  constructor(public dialogRef: MatDialogRef<OkdialogComponent>) {}
  /** this to close the dialog */
  onclose() {
    this.dialogRef.close();
  }
}
