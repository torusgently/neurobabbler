/**
 * Created by Jimmy on 19/11/2016.
 */
import { Component, NgZone } from '@angular/core';
declare var $: any;
declare var Highcharts: any;
import {AfterViewInit} from '@angular/core';


@Component({
  selector: 'layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.css'],
  inputs: ['id', 'weights', 'bias', 'title']
})
export class Layer implements  AfterViewInit{
  public title = 'App is cool!';
  public weights: number[];
  public bias: number[];
  public id: string;


  constructor(private zone: NgZone) {
    window["Layer"] = Layer;
  }

  ngAfterViewInit() {

    var id = this.id;

    this.zone.run(() => {
      console.log("After view init!");
      $(function () {
        var myChart = Highcharts.chart(id, {
          chart: {
            type: 'bar'
          },
          title: {
            text: 'Fruit Consumption'
          },
          xAxis: {
            categories: ['Apples', 'Bananas', 'Oranges']
          },
          yAxis: {
            title: {
              text: 'Fruit eaten'
            }
          },
          series: [{
            name: 'Jane',
            data: [1, 0, 4]
          }, {
            name: 'John',
            data: [5, 7, 3]
          }]
        });
      });

    });
  }




}
