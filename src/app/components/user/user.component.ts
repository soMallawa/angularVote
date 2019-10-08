import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  voteFor = null;
  url = 'http://45.76.176.73:3000/api/addVote';
  key = '0476cd40a0688ff7aef27a1c265ecf15';

  constructor(public auth: AuthService, private http: HttpClient) { }

  ngOnInit() {
  }

  vote(uid: string){

 
    if(uid) {

      let params = new HttpParams()
      .set('key', this.key)
      .set('voteFor', this.voteFor)
  
      //this.auth.updateVoteStatus();
  
      this.http.post(this.url,  params
      ).toPromise().then(data =>{
        //console.log(data)
        //console.log('success !');
        this.auth.updateVoteStatus();
        
      }).catch(err =>{
        console.log(err)
      })

    } else {
      console.log('Invalid access.');
      return false;
    }

 


  }

}
