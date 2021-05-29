import { IntercepterService } from './../core/services/intercepter.service';
import { UserService } from './../core/services/user.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
/** define component */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

/**define class of login  */
export class LoginComponent {
  /**
   *constructor
   * @param fb form builder
   * @param userService user service
   *
   */
  constructor(private fb: FormBuilder, private userService: UserService) {}
  /** handle hide and show of password in template */
  hide = true;
  /** form of login */
  userLogin = this.fb.group({
    email: [
      null,
      Validators.compose([
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
    ],
    password: [null, Validators.required],
  });

  /** login and save user detail and token in localstorage */
  public onSubmit(): void {
    const email = this.userLogin.get('email')?.value;
    const password = this.userLogin.get('password')?.value;
    this.userService.login(email, password).subscribe((res) => {
      const user = res.user;
      localStorage.setItem('token', res.access_token);
      localStorage.setItem('name', user.name);
      localStorage.setItem('adress', user.adress);
      localStorage.setItem('email', user.email);
      localStorage.setItem('id', String(user.id));
      localStorage.setItem('latitude', user.latitude);
      localStorage.setItem('longitude', user.longitude);
      localStorage.setItem('phone', user.phone);
      location.reload();
    });
  }
}
