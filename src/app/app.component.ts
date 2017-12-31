import { Component } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: Http) { }

  answer() {

    var headers = new Headers();
    headers.append('Ocp-Apim-Subscription-Key', 'f741f4e6c6254d9dbc80f85d16fd30fb');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('question', 'hi');
    let body = urlSearchParams.toString()
    
    this.http.post('https://westus.api.cognitive.microsoft.com/qnamaker/v2.0/knowledgebases/d2f5139b-5a23-4049-8893-27fecb715f59/generateAnswer', body, {headers: headers})
        .map((response: Response) => {
            // login successful if user.status = success in the response
            let user = response.json();
        });
  }
}
