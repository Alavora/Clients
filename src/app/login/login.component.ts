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
    const email = this.userLogin.get('email')?.value
      const password = this.userLogin.get('password')?.value
    this.userService.login(email,password).subscribe(res =>{
      localStorage.setItem('token', res.access_token);
      this.router.navigateByUrl('/');

      this.userService.getUserdata().subscribe(res=>{
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

    });
  }
}
