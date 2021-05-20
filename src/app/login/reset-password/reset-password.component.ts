import { Router } from '@angular/router';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { OkdialogComponent } from 'src/app/dialogs/okdialog/okdialog.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private fb: FormBuilder, public dialog: MatDialog,private router: Router, private ngZone: NgZone) {}
  hide = true;
  hideagain = true;
  resetpassword = this.fb.group({
        email: [null, Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])]
  });
  private dialogRef:any ;

  openDialog() {
    this.dialogRef= this.dialog.open(OkdialogComponent);
    this.dialogRef.componentInstance.title = 'Password Reset';
    this.dialogRef.componentInstance.content = 'If the Entered Email is correct you will receive a link to reset password.';



  }

  ngOnInit(): void {
  }
  closeDialog(): void{
    this.ngZone.run(() => {
      this.dialogRef.close();
    });
  }
  onSubmit(): void {

  }
}
function CourseDialogComponent(CourseDialogComponent: any, dialogConfig: MatDialogConfig<any>) {
  throw new Error('Function not implemented.');
}

