/**
 * Created by Jimmy on 19/11/2016.
 */
import { Component, NgZone, trigger,
  state,
  style,
  transition,
  animate} from '@angular/core';
declare var $: any;
declare var Highcharts: any;
import {AfterViewInit} from '@angular/core';
import {LayerData} from './layer';

@Component({
    selector: 'layer',
    templateUrl: './layer.component.html',
    styleUrls: ['./layer.component.css'],
    inputs: ['id', 'weights', 'bias', 'title'],
    animations: [
  trigger('flyInOut', [
    state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
      style({transform: 'translateX(-100%)'}),
      animate(100)
    ]),
    transition('* => void', [
      animate(100, style({transform: 'translateX(100%)'}))
    ])
  ])
]
})
export class Layer implements  AfterViewInit{
  public title = 'App is cool!';
  public weights: number[];
  public bias: number[];
  public id: string;
  public width = 1.;

  constructor(private zone: NgZone) {
      window["Layer"] = Layer;

  }

  ngAfterViewInit() {

      var id = this.id;
      var width = $(document).width()*this.width;
      var weights = this.weights

    this.zone.run(() => {
      console.log("After view init!");
      $(function () {
        var myChart = Highcharts.chart(id, {
            chart: {
               type: 'column',
               margin: [60, 10, 40, 40],
               width: width
           },
           title: {
               text: 'Weight Development',
               x: 25
           },
           legend: {
               enabled: false
           },
           credits: {
               enabled: false
           },
           exporting: {
               enabled: false
           },
           tooltip: {},
           plotOptions: {
               series: {
                   pointPadding: 0,
                   groupPadding: 0,
                   borderWidth: 0.5,
                   borderColor: 'rgba(255,255,255,0.5)',
                   color: Highcharts.getOptions().colors[1]
               }
           },
           xAxis: {
               title: {
                   text: ''
               }
           },
           yAxis: {
               title: {
                   text: 'Weight Strength'
               }
           },
          series: [{
              name: 'Distribution', data : weights}]
        });
      });

    });
  }




}
