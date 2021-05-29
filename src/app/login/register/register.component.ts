import { error } from '@angular/compiler/src/util';
import { UserService } from './../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OkdialogComponent } from 'src/app/shared/dialogs/okdialog/okdialog.component';
/** Load Component template and style sheet  */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  /** Hide or Show Password text  */
  /** Hide or Show Password text  */
  hide = true;
  /** Hide or Show Password text for second input  */
  hideagain = true;
  /** Assign Validators to the forb attributes */
  userRegister = this.fb.group({
    name: [null, Validators.required],
    address: [null],
    phone: [
      null,
      Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(9),
      ]),
    ],
    email: [
      null,
      Validators.compose([
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
    ],
    password: [
      null,
      Validators.compose([Validators.required, Validators.minLength(8)]),
    ],
    passwordagain: [
      null,
      Validators.compose([Validators.required, Validators.minLength(8)]),
    ],
  });

  /**
   *
   * @param fb the form buildeer that will handles forms in our template
   * @param dialog the dialog
   * @param router that handles the extraction of element from url
   * @param user service that handles the api request to backend (user related api calls)
   */
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private user: UserService
  ) {}
  /**  will be triggered when user Press Register Button */
  onSubmit(): void {
    if (!this.userRegister.valid) {
      const content = 'You have to Enter all necessary informations!';
      this.openDialog('ERROR!', content, false);
    } else {
      const name = this.userRegister.get('name')?.value;
      const address = this.userRegister.get('address')?.value;
      const phone = this.userRegister.get('phone')?.value;
      const email = this.userRegister.get('email')?.value;
      const password = this.userRegister.get('password')?.value;
      const repeat = this.userRegister.get('passwordagain')?.value;

      if (password !== repeat) {
        const content = "The First Password dosen't match the second!";
        this.openDialog('ERROR!', content, false);
      } else {
        this.user.postUser(name, email, password, address, phone).subscribe(
          (res) => {
            const content = 'Your Account have been created!';
            this.openDialog('SUCCESS!', content, true);
          },
          (error) => {
            const content = 'Error occured when trying to create user account!';
            this.openDialog('ERROR!', content, false);
          }
        );
      }
    }
  }

  /**
   *  will navigate to products of the selected shop and will pass the id by url
   * @param title the title of dialog
   * @param content the content of dialog
   * @param passed the boolean that shows if the operation is correcrt or no
   */
  openDialog(title: string, content: string, passed: boolean) {
    let dialogRef = this.dialog.open(OkdialogComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.content = content;
    if (passed) {
      dialogRef.afterClosed().subscribe((res) => {
        this.router.navigateByUrl('login');
      });
    } else {
      dialogRef.afterClosed().subscribe((res) => {
        this.router.navigateByUrl('register');
      });
    }
  }
}
