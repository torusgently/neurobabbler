/**
 * Created by Jimmy on 19/11/2016.
 */
/**
 * Created by Jimmy on 19/11/2016.
 */
import { Component, NgZone, OnChanges, SimpleChanges } from '@angular/core';
import {Layer} from './layer';
import {NetworkService} from './network.service';

@Component({
  selector: 'network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css'],
  providers: [NetworkService],
  inputs: ["state", "msg"]
})
export class Network implements OnChanges{
  title = 'App is cool!';
  layers: Layer[];

  public state: any;
  public msg: string;

  constructor(private zone: NgZone, private netService: NetworkService) {

    this.layers = [];
    this.zone = zone;
    window["network"] = this;
  }

  clicked() {
    this.netService.sendCommandToNetwork("add_layer", {input_size: 2, output_size:2});
  }

  ngOnChanges(changes: SimpleChanges) {
      console.log(changes);
      var prev = changes["state"].previousValue;
      var curr = changes["state"].currentValue;
      if(typeof curr === 'undefined') {
          console.log("No Current State");
      } else{
          console.log(curr);
      //Logik...
          for(let el in curr) {
              console.log(el)
          if(typeof this.layers[el.id] === 'undefined') {
              var layer = new Layer({'id': el.id, 'weights': el.weights, 'bias': el.bias});
              // layer.id =  curr[i].id;
              // layer.weights =  curr[i].weights;
              // layer.bias =  curr[i].bias;
              this.layers.push(layer);
          }
          else {
              this.layers[el.id].id = el.id;
              this.layers[el.id].weights = el.weights;
              this.layers[el.id].bias = el.bias;
          }

      }
      }
  }


  public addLayer(W: string) {

  }


  public outsideAddLayer(text: string) {

  }


}
