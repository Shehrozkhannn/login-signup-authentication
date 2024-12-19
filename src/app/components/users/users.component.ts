import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{

  constructor(private http: HttpClient){

  }

  ngOnInit(): void {
    this.showUsers();
  }

  showUsers(){
    const url = 'https://jsonplaceholder.typicode.com/posts';
    this.http.get(url).subscribe((res)=>{
      console.log(res)
    }
    )
  }
}
