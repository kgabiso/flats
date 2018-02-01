import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule} from '@angular/http';
import { FormsModule } from '@angular/forms';



import { AppComponent } from './app.component';
import { FlatsComponent } from './flats/flats.component';
import { UsersComponent } from './users/users.component';
import {routes} from './app.routes';
import {UserService} from './services/user.service';
import {FilterPipe} from './filter';
import {AgmCoreModule} from '@agm/core';
import { NewFlatsComponent } from './new-flats/new-flats.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FlatImageComponent } from './flat-image/flat-image.component';


@NgModule({
  declarations: [
    AppComponent,
    FlatsComponent,
    UsersComponent,
    FilterPipe,
    NewFlatsComponent,
    FlatImageComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    routes,
    HttpModule,
    HttpClientModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDc6ep_EYCrNUNFLDhmZABFJlSvJlcKftI',
      libraries: ['places']
    })
  ],
  providers: [UserService, FlatsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
