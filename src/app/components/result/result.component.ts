import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  socketData: any;
  public pieChartLabels = ['Gotabaya', 'Sajith', 'Anura Kumara', 'Mahesh'];
  public pieChartData = [];
  public pieChartType = 'pie';
  public chartColors: Array<any> = [
    { 
      backgroundColor: ['#ffc425', '#5cb85c', '#d9534f', '#b2beb5']
    }
  ]

  constructor(private socket: Socket) { }

  ngOnInit() {
    this.socket.fromEvent('data').subscribe(data => {
      this.socketData = data;
      this.pieChartData = this.socketData.pieData;
    });
  }

}
