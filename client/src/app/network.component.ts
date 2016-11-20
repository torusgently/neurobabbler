/**
 * Created by Jimmy on 19/11/2016.
 */
/**
 * Created by Jimmy on 19/11/2016.
 */
import { Component, NgZone } from '@angular/core';
import {Layer} from './layer';
import {NetworkService} from './network.service';

@Component({
  selector: 'network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css'],
  providers: [NetworkService]
})
export class Network {
  title = 'App is cool!';
  layers: Layer[];


  constructor(private zone: NgZone, private netService: NetworkService) {

    this.layers = [new Layer([], [], "layer1"), new Layer([], [], "layer2"), new Layer([], [], "layer3")];
    this.zone = zone;
    window["network"] = this;
  }

  clicked() {
    this.netService.sendCommandToNetwork("add_layer", {input_size: 2, output_size:2});
  }

  public addLayer(text: string) {

  }


  public outsideAddLayer(text: string) {

  }
}
