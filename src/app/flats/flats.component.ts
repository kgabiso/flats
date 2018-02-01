import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../services/user.service';
import {MapsAPILoader} from '@agm/core';
import {} from '@types/googlemaps';
import {Router, NavigationExtras} from '@angular/router';
import {state, trigger, style, transition, animate} from '@angular/animations';
import * as _ from 'underscore';


@Component({
  selector: 'app-flats',
  templateUrl: './flats.component.html',
  styleUrls: ['./flats.component.css'],
  animations: [
    trigger('visibilityChanged', [
      state('shown', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('shown => hidden', animate('1000ms')),
      transition('hidden => shown', animate('1000ms')),
    ]),
    trigger('fadeInOut', [
      transition('void => *', [
        style({opacity: 0}), // style only for transition transition (after transiton it removes)
        animate(500, style({opacity: 1})) // the new state of the transition(after transiton it removes)
      ]),
      transition('* => void', [
        animate(1000, style({opacity: 0})) // the new state of the transition(after transiton it removes)
      ])
    ]),
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)' , opacity: 1})),
      transition('void => *', [
        style({transform: 'translateX(-40%)'}),
        animate(500)
      ]),
      transition('* => void', [
        animate(100, style({transform: 'translateX(100%)'}))
      ])
    ])
  ]

})
export class FlatsComponent implements OnInit {

  mapLocation: string;

  flats: any;
  flat_imgs: any;
  img_id: any;
  chosen_img = '';


  numberResult: any;
  searchString = '';
  rangePrice: number;
  infoMess = '';
  showSearch = false;
  radio_val = 0;
  bedrooms = '';
  bathrooms = '';
  parking = 'No';
  visiblityState = 'hidden';
  submitted = false;
  statusImg = '../../assets/img/image_1173712.gif';

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  constructor(private _userService: UserService,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private _route: Router) {}

  ngOnInit() {
     this.getAllFlats();
    this.rangePrice = 10000;

  }

  toggle() {
    if (this.visiblityState === 'hidden') {
      this.visiblityState = 'shown';
    } else {
      this.visiblityState = 'hidden';
    }
  }
  getAllFlats() {
    this.numberResult = 0;
    this._userService.getFlats().then((flatData) => {
      if (flatData === null) {


      } else {
        this.flats = flatData;
        // initialize to page 1
        this.setPage(1);
      }

    }, (err) => {
      console.log(err.status);
      if (err.status === 404) {
        this.statusImg = '../../assets/img/error_404%20.png';
      } else {
        this.statusImg = '../../assets/img/image_1173712.gif';
      }

    });

  }

  setPage(page: number) {
    // if (page < 1 || page > this.pager.totalPages) {
    //   return;
    // }
    // get pager object from service
    this.pager = this._userService.getPager(this.flats.length, page);
    // get current page of items
    this.pagedItems = this.flats.slice(this.pager.startIndex, this.pager.endIndex + 1);

  }

  searchFlat(): void {
if (!this.radio_val) {
  this._userService.getFlats().then((flatData) => {
      this.flats = flatData;

      this.flats = this.flats.filter(location => {
        return location.flat_location.toLowerCase().includes(this.searchString) && location.flat_price < this.rangePrice;
      });
      this.pagedItems = this.flats.slice(this.pager.startIndex, this.pager.endIndex + 1);
      this.pager = this._userService.getPager(this.flats.length, 1);
      this.numberResult = this.flats.length;

    },
    (err) => {

    });
} else {
  this._userService.getFlats().then((flatData) => {
        if (this.bedrooms === null) {
          this.bedrooms = '';
          // this.getAllFlats();
        } else if (this.bathrooms === null) {
          // this.getAllFlats();
          this.bathrooms = '';

        } else {

        }

        this.flats = flatData;
        this.flats = this.flats.filter(location => {

          return location.flat_location.toLowerCase().includes(this.searchString)
            && location.flat_price < this.rangePrice
            && location.flat_bedroom == this.bedrooms
            && location.flat_bathroom == this.bathrooms
            && location.flat_parking == this.parking.toString() ; // || location.flat_bathroom.toString().includes(this.bathrooms);

        });

    this.pagedItems = this.flats.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.pager = this._userService.getPager(this.flats.length, 1);
    this.numberResult = this.flats.length;
      }, (err) => {

      });
}
    // if (!this.radio_val) {
    //
    //   this._userService.getFlats().then((flatData) => {
    //      this.flats = flatData;
    //     this.pagedItems = this.flats.filter(location => {
    //
    //       return location.flat_location.toLowerCase().includes(this.searchString) && location.flat_price < this.rangePrice;
    //     });
    //   }, (err) => {
    //
    //   });
    //
    //   // get pager object from service
    //   this.pager = this._userService.getPager(this.pagedItems.length, 1);
    //   // get current page of items
    //   this.pagedItems = this.pagedItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    //
    //   console.log(this.pager.totalPages);
    //   console.log(this.pagedItems.length, this.pagedItems);
    //   console.log(this.flats.length, this.flats);
    //
    // } else {
    //
    //   this._userService.getFlats().then((flatData) => {
    //     if (this.bedrooms === null) {
    //       this.bedrooms = '';
    //       // this.getAllFlats();
    //     } else if (this.bathrooms === null) {
    //       // this.getAllFlats();
    //       this.bathrooms = '';
    //
    //     } else {
    //
    //     }
    //
    //     this.flats = flatData;
    //     this.flats = this.flats.filter(location => {
    //
    //       return location.flat_location.toLowerCase().includes(this.searchString)
    //         && location.flat_price < this.rangePrice
    //         && location.flat_bedroom == this.bedrooms && location.flat_bedroom.toLowerCase().includes(this.bedrooms);
    //         // && location.flat_bathroom.toString() == this.bathrooms; // || location.flat_bathroom.toString().includes(this.bathrooms);
    //     });
    //   }, (err) => {
    //
    //   });
    // }

  }
  // flat_img(id) {
  //   this.img_id = id;
  //   this._route.navigate(['flat-image']);
  //
  // }
  myFunction(img, flat_name) {
    console.log(img)
    this.chosen_img = img;
  }
  showDetails(id): void {
    console.log(id);
  }

  go() {
    this._route.navigate(['new-flat']);

  }
  onRadioChange(n): void {
    this.showSearch = true;
    if ( n === 0 ) {
      this.infoMess = 'Simple search !';
      this.visiblityState = 'hidden';
    } else {
      this.infoMess = 'Advanced search !';
      this.visiblityState = 'shown';
    }

}
searchReset() {
  this.numberResult = 0;
  this.getAllFlats();

}


  onSubmit() { this.submitted = true; }
}

