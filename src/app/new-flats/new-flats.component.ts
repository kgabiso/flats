import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MapsAPILoader} from '@agm/core';
import {UserService} from '../services/user.service';
import {Flat} from '../flats/flat';

@Component({
  selector: 'app-new-flats',
  templateUrl: './new-flats.component.html',
  styleUrls: ['./new-flats.component.css'],
  providers: [UserService]
})
export class NewFlatsComponent implements OnInit {

  errorMessage = false;
  fname: string;
  fLocation: string;
  fPrice: number;
  fbedroom: number;
  fbathroom: number;
  fParking: boolean;
  fDescription: string;
  fImg: string;
  flat_model = new Flat();
  @ViewChild('search') public searchElement: ElementRef;

  constructor(private _userService: UserService,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private _route: Router,
              private elem: ElementRef) { }
  // UserService
  ngOnInit() {
    this.getLocation();

  }

  getLocation(): void {
    this.mapsAPILoader.load().then(
      () => {
        const autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: ['address'] });

        autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {const place: google.maps.places.PlaceResult = autocomplete.getPlace();
            if (place.geometry === undefined || place.geometry === null ) {
              return;
            }
          });
        });
      }
    );
  }

  uploadfile(event) {

    const elem = event.target;

    if (elem.files.length > 0) {

      const  formData = new FormData();
      formData.append('file', elem.files[0]);
      this.flat_model.form_data = formData;
      this.flat_model.img_url = 'http://localhost/API/img/' + elem.files[0].name;

    }

  }

  addFlat(): void {

    this._userService.addFlat(this.flat_model).then((userData) => {
      this.errorMessage = false;
    }, (err) => {
      this.errorMessage = true;
    });

    this._userService.uploadImg(this.flat_model.form_data).then((userData) => {
      this.errorMessage = false;
    }, (err) => {
      this.errorMessage = true;
    });
  }
}
