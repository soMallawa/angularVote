import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  socketData: any;
  
  title = 'vote2020lk';

  constructor(private socket: Socket) {}

  ngOnInit(){
    this.socket.fromEvent('data').subscribe(data => {
      this.socketData = data;
    });
  }
}
