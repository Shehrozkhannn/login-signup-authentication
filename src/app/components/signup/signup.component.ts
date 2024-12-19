import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit{
  registerForm: any;
  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(){
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      phone: ['', [Validators.required,Validators.minLength(11)]],
      role: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(10)]],
    });
  }


  register(){
    const userDetailsData = this.registerForm.value;
    const existingUsers = JSON.parse(localStorage.getItem('userDetails') || '[]');
    existingUsers.push(userDetailsData);
    localStorage.setItem('userDetails', JSON.stringify(existingUsers));
    this.router.navigate(['/login']);
  }
}
