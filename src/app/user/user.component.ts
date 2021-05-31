import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OkdialogComponent } from 'src/app/shared/dialogs/okdialog/okdialog.component';
import { UserService } from '../core/services/user.service';
/** define the component and its template file and style file */
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
/** define class */
export class UserComponent implements OnInit {
  /** define the email of user */
  public email: string = '';
  /** define the name of user */
  public name: string = '';
  /** define the password of user */
  public password: string = '';
  /** define the repeat of password */
  public repeat: string = '';
  /** define the address of user */
  public address: string = '';
  /** define the phone number */
  public phone: string = '';
  /**
   * constructor
   * @param fb formbuilder
   * @param dialog  dialog
   * @param userService  user service
   */
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private userService: UserService
  ) {}
  /** controls the visibility of password */
  hide = true;
  /** form control of  */
  userUpdate =  this.fb.group({
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
      Validators.compose([ Validators.minLength(8)]),
    ],
    repeat: [
      null,
      Validators.compose([ Validators.minLength(8)]),
    ],
  });
  /** triggered when app loads  */
  ngOnInit(): void {
    this.getData();

    //  this.userUpdate.setValue({email: 'sdad', name: 'sfdfsdf', password:'adasda', address: 'dsfadsfdaf', phone:'asdasf'})
  }
  /** when the user clisks on update will call this method to update profile information. */
  onSubmit() {
    this.password = this.userUpdate.get('password')?.value;
    this.repeat = this.userUpdate.get('repeat')?.value;
    this.email = this.userUpdate.get('email')?.value;
    this.address = this.userUpdate.get('address')?.value;
    this.name = this.userUpdate.get('name')?.value;
    this.phone = this.userUpdate.get('phone')?.value;


    if (this.password !== this.repeat) {
      this.openOkDialog('Error', 'Your have to re-enter the password!');
    } else {
      /** this will change profile and after will upgrade profile in local storage*/
      if (this.name && this.email && this.address) {
        this.userService
          .postProfile(this.name, this.email, this.address, this.password)
          .subscribe(
            (res) => {
              this.openOkDialog('Success', 'You have updated your profile!');
              this.userService.getUserdata().subscribe((res) => {
                localStorage.setItem('name', res.name);
                localStorage.setItem('address', res.address);
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
  /**
   * get the data from localstorage
   */
  getData() {
    this.name = localStorage.getItem('name') || '';
    this.email = localStorage.getItem('email') || '';
    this.address = localStorage.getItem('address') || '';
    this.phone = localStorage.getItem('phone') || '';
    this.userUpdate.get('email')?.setValue(this.email);
    this.userUpdate.get('name')?.setValue(this.name);
    this.userUpdate.get('address')?.setValue(this.address);
    this.userUpdate.get('phone')?.setValue(this.phone);

  }
  /**
   * opens new dialog of type ok
   * @param title set the title of dialog
   * @param content set the content of dialog
   */
  openOkDialog(title: string, content: string) {
    let dialogRef = this.dialog.open(OkdialogComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.content = content;
  }
}
