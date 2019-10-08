import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

//Socket Io 
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const ioconfig: SocketIoConfig = { url: 'http://45.76.176.73:3051', options: {} };


//Google firebase imports

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { UserComponent } from './components/user/user.component';
import { ResultComponent } from './components/result/result.component';

registerLocaleData(en);

// Firebase Config

const config = {
  apiKey: "AIzaSyA_nGrn8olfDxMSLixjXTexANsuojqiMsM",
  authDomain: "vote2020-63a29.firebaseapp.com",
  databaseURL: "https://vote2020-63a29.firebaseio.com",
  projectId: "vote2020-63a29",
  storageBucket: "",
  messagingSenderId: "801118452197",
  appId: "1:801118452197:web:cc1017aa081f8503bb970c",
  measurementId: "G-DSVLCT1183"
}

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(ioconfig),
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ChartsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
