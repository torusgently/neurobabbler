/**
 * Created by Jimmy on 19/11/2016.
 */
/**
 * Created by Jimmy on 19/11/2016.
 */
import { Component, NgZone, OnChanges, SimpleChanges } from '@angular/core';
import {LayerData} from './layer';
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
  layers: LayerData[];

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
          console.log("WHAAAATS UUUP");
          console.log(curr);
          //Logik...
          this.layers = [];
          for(var i;i < curr.length; i++) {
            
              var layer = new LayerData();
              layer.id = curr[i].id;
              layer.weights = curr[i].weights;
              layer.bias = curr[i].bias;
              this.layers.push(layer);
      }
      }
  }


  public addLayer(W: string) {

  }


  public outsideAddLayer(text: string) {

  }


}
