import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '@nx-pokemon/test';
import { Observable } from 'rxjs';

@Component({
  selector: 'nx-pokemon-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users!: User[];
  

  constructor(private http: HttpClient) {}


  ngOnInit(): void {
    this.getAllUsers().subscribe((resp) => {
      console.log(resp);
      this.users = resp;
    });
  }


  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/user')
  }
}
