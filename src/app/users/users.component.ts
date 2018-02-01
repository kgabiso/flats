import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';


import {UserService} from '../services/user.service';
import {User} from './user';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {
  users: any = new Array();
  constructor(private _userService: UserService) { }
  Username: string;
  Usersurname: string;
  Useremail: string;

  ngOnInit() {
    // this._userService.getUser().subscribe((userData) => this.users = userData,
    //   (error) => {
    //     console.log(error);
    //   });

    this._userService.getUser().then((userData) => {
      if (userData === null) {


      } else {
        this.users = userData;
      }
      // this.Getgrades();
    }, (err) => {


    });

  }
  postUser() {
    // console.log(this.Useremail);
    // this._userService.addUser(this.Username, this.Usersurname, this.Useremail).subscribe(() => {});

    this._userService.addUser(this.Username, this.Usersurname, this.Useremail).then((userData) => {
      if (userData === null) {


      } else {
        // this.users = userData;
      }
      // this.Getgrades();
    }, (err) => {
console.log(err);
    });
  }

}
