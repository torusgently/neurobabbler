import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  styles: [`
    
  `],
  template: `
    <div class="jumbotron text-center">
      <h1>The App Lives!</h1>
      <p>{{ message }}</p>
      <chart [options]="options"></chart>
    </div>
  `
})
export class AppComponent {
    message = 'And this is a Chart!';

    constructor() {
        this.options = {
            title : { text : 'simple chart' },
            series: [{
                data: [29.9, 71.5, 106.4, 129.2],
            }]
        };
    }
    options: Object;
}
