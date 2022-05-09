import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { take } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent implements OnInit {
  public weatherData: any;
  public city = '';
  public loading = false;
  public recognition: any;

  private window: any;
  private registerSpeechRecogination () {
    if (('webkitSpeechRecognition' in window)) {
          this.recognition = new this.window['webkitSpeechRecognition']();
          this.recognition.lang = "en-US";
      }
      this.recognition.onstart = () => {
          console.log('Speech recognition service has started');
      };

      this.recognition.onresult = (event: any) => {
          var resultArray = event.results[0][0].transcript.split(' ');
          if (resultArray[0]) {
            this.city = resultArray[0];
            this.loading = true;
            this.getWeatherInfo();    
          }
      };
      this.recognition.onerror = (event: any) => {
          console.error(event);
      };
      this.recognition.onend = () => {
          console.log('Speech recognition service disconnected');
      };
  }

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document,
    private cd: ChangeDetectorRef
    ){
    this.window = this.document.defaultView;
  }

  ngOnInit() {
    this.registerSpeechRecogination();
  }

  getWeatherInfo () {
    if (this.city) {
        this.loading = true;
         this.http.get('https://uuvp37qaz7f5ha22mq46rhalfe0vgihw.lambda-url.ap-south-1.on.aws/get-weather-info?city='+ this.city)
         .pipe(take(1)).subscribe(data => {
          this.weatherData = data;
          this.city = '';
          this.loading = false;
          this.cd.detectChanges();
         });
    } else {
      this.loading = false;
    }
  }

  speechRecoginationStart = () => {
    this.recognition.start();
  }
}
