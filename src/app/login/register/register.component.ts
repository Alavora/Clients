import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OkdialogComponent } from 'src/app/dialogs/okdialog/okdialog.component';
/** Load Component template and style sheet  */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
/** Hide or Show Password text  */
/** Hide or Show Password text  */
  hide = true;
  /** Hide or Show Password text for second input  */
  hideagain = true;
  /** Assign Validators to the forb attributes */
  userLogin = this.fb.group({
    name: [null, Validators.required],
    surname: [null, Validators.required],
    lastname: [null],
    email: [null, Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])],
    password: [null, Validators.required],
    passwordagain: [null, Validators.required],
  });

  /** inject the FormBuilder Ibject of Angular */
  constructor(private fb: FormBuilder, public dialog: MatDialog,private router: Router) {}
  /**  will be triggered when user Press Register Button */
  onSubmit(): void {
    this.openDialog();
  }

  openDialog() {
    let dialogRef = this.dialog.open(OkdialogComponent);
    dialogRef.componentInstance.title = 'Successfly Registred';
    dialogRef.componentInstance.content = 'Your account have been created!';

  dialogRef.afterClosed().subscribe(res => {
    this.router.navigateByUrl('/login')
  });
  }

}
