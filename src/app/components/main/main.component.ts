import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [DatePipe],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit{
  currentUser:any;
  previousTime: any;
  userDetails:any;
  constructor(private router: Router){
  }

  ngOnInit(){
    this.currentUser = JSON.parse(localStorage.getItem('loggedInUser') || '[]');
    this.userDetails = JSON.parse(localStorage.getItem('userDetails') || '[]');

    //time
    this.userDetails.find((user:any)=> {
      if(this.currentUser.username === user.username){
        this.previousTime = user.previousTime
      }
    })
  }
  logout() {
    const userList = JSON.parse(localStorage.getItem('userDetails') || '[]');
    const user = userList.find((u: any) => u.username === this.currentUser.username);

    if (user) {
      user.previousTime = user.currentTime;
      localStorage.setItem('userDetails', JSON.stringify(userList));
    }

    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }

  showUsers(){
    this.router.navigate(['/users'])
  }
}
