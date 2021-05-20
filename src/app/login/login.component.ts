import { UserService } from './../core/services/user.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private fb: FormBuilder,private router: Router, private userService: UserService) {}

  hide = true;
  userLogin = this.fb.group({
    email: [null, Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])],
    password: [null, Validators.required],
  });


 public onSubmit(): void {
    /* localStorage.setItem('token', '1234');
    this.router.navigateByUrl('dashboard'); */
    this.userService.login('aaa','sss').subscribe(res =>{

    });
  }
}
