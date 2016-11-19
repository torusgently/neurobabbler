import { Component } from '@angular/core';

import { ZingChart } from './zingchart.component';
import { Chart } from './chart.model';
@Component({
  selector: 'my-app',
  styles: [`
  `],
  template: `
    <div class="jumbotron text-center">
      <h1>The App Lives!</h1>
      <p>{{ message }}</p>
      <zingchart *ngFor="let chart of charts" [chart]="chart"></zingchart>
    </div>
`,
    directives: [ZingChart]
})
export class AppComponent {
    message = 'And this is a Chart!';
    charts: Chart[];
    constructor () {
    this.charts = [
      {
        id: 'chart-1',
        data: {
          type: 'bar',
          series: [{
            values: [2, 3, 4, 5, 3, 3, 2]
          }]
        },
        height: 300
      }
    ]
  }
}
