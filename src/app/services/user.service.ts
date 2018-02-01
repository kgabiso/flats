import { Injectable } from '@angular/core';
import { Http, Response , HttpModule} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { User } from '../users/user';
import 'rxjs/add/operator/toPromise';
import {HttpClient} from '@angular/common/http';
import * as _ from 'underscore';

@Injectable()
export class UserService {
  user: User;
  constructor(private _http: HttpClient) { }

  getUser() {

      // return this._http.get('http://localhost/API/getUserPost.php');
        // .map((response: Response) => <User[]>response.json())
        // .catch(this.handleError);
    return new Promise((resolve, reject) => {
      this._http.get('http://localhost/API/getUserPost.php')
        .subscribe(res => {

          resolve(res);

          // console.log(JSON.stringify(res));

        }, (err) => {
          reject(err);

          this.CheckError(err.status);
        });
    });
  }

  addUser(name_user, surname_user, email_user) {
    const userOBJ = {

      surname: surname_user,
      email: email_user,
      phone: '0123456789',
      name: name_user
    };

    return new Promise((resolve, reject) => {
      this._http.post('http://localhost/API/insertUser.php', JSON.stringify(userOBJ))
        .subscribe(res => {

          resolve(res);

          console.log(JSON.stringify(res));

        }, (err) => {
          reject(err);
          console.log(err);
          this.CheckError(err.status);
        });
    });

  }

  getFlats() {
    // return this._http.get('http://localhost/API/get_flats.php')
    //   .map((response: Response) => <User[]>response.json())
    //   .catch(this.handleError);
    return new Promise((resolve, reject) => {
      this._http.get('http://localhost/API/get_flats.php')
        .subscribe(res => {

          resolve(res);

          // console.log(JSON.stringify(res));

        }, (err) => {
          reject(err);

          this.CheckError(err.status);
        });
    });

  }

  handleError(error: Response) {
    console.log(error);
    console.log('status', error.status);
    return Observable.throw(error);
  }
  getFlat_img(id) {
      const flatImg  = {
        flat_id: id
    }
    return new Promise((resolve, reject) => {
      this._http.post('http://localhost/API/get_flat_img.php', flatImg)
        .subscribe(res => {

          resolve(res);

        }, (err) => {
          reject(err);
          console.log(err);
          // this.CheckError(err.status);
        });
    });
  }

  addFlat(obj) {

    return new Promise((resolve, reject) => {
      this._http.post('http://localhost/API/add_flat.php', obj)
        .subscribe(res => {

          resolve(res);

        }, (err) => {
          reject(err);
          console.log(err);
          // this.CheckError(err.status);
        });
    });

  }
  uploadImg(obj) {

    return new Promise((resolve, reject) => {
      this._http.post('http://localhost/API/uploadImg.php', obj)
        .subscribe(res => {

          resolve(res);

        }, (err) => {
          reject(err);
          console.log(err);
          // this.CheckError(err.status);
        });
    });

  }
  CheckError(StatusCode: number) {

    switch (StatusCode) {
      case 200:
        return 'np ';
        // this.responseMessage = "No Internet Connection try again";
        // this.showAlert(this.responseMessage);
        // break;
      case 401:
        // this.responseMessage = "Email or Password is Incorrect";
        // this.showAlert(this.responseMessage);
        break;

    }
  }
  getImg_id(id) {
    return id;
  }
  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 6) {
    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    let startPage: number, endPage: number;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    const pages = _.range(startPage, endPage + 1);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }
}
