/**
 * Created by Jimmy on 19/11/2016.
 */
import { Component } from '@angular/core';

@Component({
  selector: 'layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.css']
})
export class Layer {
  title = 'App is cool!';
  weights: number[];
  bias: number[];


  constructor() {
    window["Layer"] = Layer;
  }

}
