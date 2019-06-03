import { Component } from '@angular/core';
import { EnvService } from './env.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angie';

  constructor(private env: EnvService) {
    if (env.enableDebug) {
      console.log("debugging is enabled");
    }

    if (env.enableGoogleAnalytics) {
      console.log("google analytics is enabled");
    }
  }
}
