import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { validateBasis } from '@angular/flex-layout';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OkdialogComponent } from 'src/app/shared/dialogs/okdialog/okdialog.component';
import { PublicDataService } from '../core/services/public-data.service';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  /** variable to save profile data */
  public email: string = '';
  public name: string = '';
  public password: string = '';
  public repeat: string = '';
  public adress: string = '';
  public phone: string = '';
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private userService: UserService
  ) {}
  /** controls the visibility of password */
  hide = true;
  /** form control of  */
  userUpdate = this.fb.group({
    email: [
      null,
      Validators.compose([
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
    ],
    name: [null, Validators.required],
    password: [''],
    repeat: [''],
    adress: [null, Validators.required],
    phone: [null, Validators.required],
  });
  ngOnInit(): void {
    this.getData();

    //  this.userUpdate.setValue({email: 'sdad', name: 'sfdfsdf', password:'adasda', adress: 'dsfadsfdaf', phone:'asdasf'})
  }
  /** when the user clisks on update will call this method to update profile information. */
  onSubmit() {
    this.password = this.userUpdate.get('password')?.value;
    this.repeat = this.userUpdate.get('repeat')?.value;
    this.email = this.userUpdate.get('email')?.value;
    this.adress = this.userUpdate.get('adress')?.value;
    if (this.password !== this.repeat) {
      this.openOkDialog('Error', 'Your have to re-enter the password!');
    } else {
      /** this will change profile and after will upgrade profile in local storage*/
      if (this.name && this.email && this.adress) {
        this.userService
          .postProfile(this.name, this.email, this.adress, this.password)
          .subscribe(
            (res) => {
              this.openOkDialog('Success', 'You have updated your profile!');
              this.userService.getUserdata().subscribe((res) => {
                localStorage.setItem('name', res.name);
                localStorage.setItem('adress', res.adress);
                localStorage.setItem('created_at', res.created_at);
                localStorage.setItem('email', res.email);
                localStorage.setItem('id', String(res.id));
                localStorage.setItem('latitude', res.latitude);
                localStorage.setItem('longitude', res.longitude);
                localStorage.setItem('phone', res.phone);
                localStorage.setItem('updated_at', res.updated_at);
              });
            },
            (error) => {}
          );
      } else {
        this.openOkDialog('Error', 'You have to fill all the requird camps!');
      }
    }
  }
  getData() {
    this.name = localStorage.getItem('name') || '';
    this.email = localStorage.getItem('email') || '';
    this.adress = localStorage.getItem('adress') || '';
    this.phone = localStorage.getItem('phone') || '';
  }

  openOkDialog(title: string, content: string) {
    let dialogRef = this.dialog.open(OkdialogComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.content = content;
  }
}
