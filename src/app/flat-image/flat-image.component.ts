import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {FlatsComponent} from '../flats/flats.component';
import { ActivatedRoute } from '@angular/router';
import {state, trigger, style, transition, animate} from '@angular/animations';

@Component({
  selector: 'app-flat-image',
  templateUrl: './flat-image.component.html',
  styleUrls: ['./flat-image.component.css'],
  animations: [ trigger('fadeInOut', [
    transition('void => *', [
      style({opacity: 0}), // style only for transition transition (after transiton it removes)
      animate(500, style({opacity: 1})) // the new state of the transition(after transiton it removes)
    ]),
    transition('* => void', [
      animate(1000, style({opacity: 0})) // the new state of the transition(after transiton it removes)
    ])
  ]),]
})
export class FlatImageComponent implements OnInit {
  flat_imgs: any;
  id: number;
  private sub: any;
  image: string;
  popup_img = false;
  constructor(private _userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {

    setTimeout(function() {
      this.edited = false;
      console.log(this.edited);
    }.bind(this), 3000);

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
     this.getFlat_img(this.id);
      // In a real app: dispatch action to load the details here.
    });
  }

  getFlat_img(id) {

    this._userService.getFlat_img(id).then((flat_img_Data) => {
      if (flat_img_Data === null) {
        // console.log(this.flat_imgs[0].image1);

      } else {
        this.flat_imgs = flat_img_Data;
        console.log(this.flat_imgs);
         this.image = this.flat_imgs[0].img_url;
      }

    }, (err) => {
      console.log(err.status);

    });
}
  myFunction(img) {
    this.popup_img = true;
    this.image = img;
}


}
