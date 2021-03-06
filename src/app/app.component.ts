import { Component,AfterViewChecked,ViewChildren } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable, Subscription } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewChecked {
  loading: boolean;
  errorDisplay: boolean;
  placeholder: boolean;
  qa: Array<string> = [];
  question: string;
  timer: any;

  public tick: number;
  public subscription: Subscription;
  @ViewChildren('input') vc;

  constructor(private http: Http) {
    this.question = ""
    this.placeholder = true;
    this.errorDisplay = false;
    this.timer = TimerObservable.create(0, 1000);
  }

  ngAfterViewChecked() {   
    this.vc.first.nativeElement.focus();
}

  answer() {
    this.qa.unshift('<div class="user-question"><b>Me:</b> ' + this.question + '</div>');
    this.loading = true
    var actualQuestion = this.question
    this.question = ""
    this.placeholder = false;
    var headers = new Headers();
    headers.append('Ocp-Apim-Subscription-Key', 'f741f4e6c6254d9dbc80f85d16fd30fb');


    this.http.post("https://westus.api.cognitive.microsoft.com/qnamaker/v2.0/knowledgebases/d2f5139b-5a23-4049-8893-27fecb715f59/generateAnswer", { 'question': actualQuestion }, { headers: headers })
      .map(response => response.json())
      .subscribe(
      value => (console.log(value),
        this.loading = false,
        this.qa.unshift('<div class="adp-answer"><b>Bot:</b> ' + value.answers[0].answer + '</div>')
        ),
      error => (console.log(error),
        this.qa.unshift('<div class="adp-error"><b>Bot:</b> ' + 'Please try next question in 30-60 sec. Too many request or check your network.' + '</div>'),
        this.errorDisplay = true,
        this.subscription = this.timer.subscribe(t => {
          this.tick = t;
          if (t == 60) {
            this.errorDisplay = false,
              this.loading = false,
              this.subscription.unsubscribe();
          }
        })

      ));
  }
}
