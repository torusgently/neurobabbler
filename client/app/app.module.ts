import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartModule } from '@angular2-highcharts';

import { AppComponent } from './app.component';

@NgModule({
    imports: [ BrowserModule , ChartModule],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
