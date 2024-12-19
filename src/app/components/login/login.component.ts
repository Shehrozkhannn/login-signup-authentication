import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: any;
  constructor(public router:Router,private fb: FormBuilder){
     this.loginForm = this.fb.group({
          username: ['', Validators.required],
          password: ['', Validators.required],
        });
  }
  login(){
    const {username , password} = this.loginForm.value;
    const userList = JSON.parse(localStorage.getItem('userDetails') || '[]');
    const user = userList.find((u: any) => u.username === username && u.password === password);
    if (user) {
      const currentTime = new Date();
  
      // Update current login time
      user.previousTime = user.currentTime || 'NA';
      user.currentTime = currentTime;
  
      // Update localStorage
      localStorage.setItem('userDetails', JSON.stringify(userList));
      localStorage.setItem('loggedInUser', JSON.stringify(user));
  
      // Navigate to dashboard
      this.router.navigate(['/dashboard']);
    } else {
      console.error('Username or password is incorrect');
    }
  }
}
