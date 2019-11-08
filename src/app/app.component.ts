import { Component } from '@angular/core';
import { AppService } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'setimeor-test';
  message: string;
  items: Array<Object> [] = [{}];

  constructor(private appService: AppService) { }
  sendMessage() {
    console.log(this.message);
    this.appService.sendMessage(this.message);
    this.message = '';
  }
  getWeather() {
    this.appService.getWeather({ message: this.message });
    this.message = '';
  }
  ngOnInit() {
    this.appService
      .getMessages()
      .subscribe((message: string) => {
        console.log(message);
        this.items = JSON.parse(message);
      });
      setInterval(async () => {
        try {
          console.log(`[ getWeather ]`)
          await this.getWeather()
        }
        catch(e) {
          console.log(`[ Disconnect ] -> result: ${e}`)
          throw new Error(e)
        }
      }, 10000)
  }
}


