/**
 * Created by Jimmy on 19/11/2016.
 */
/**
 * Created by Jimmy on 19/11/2016.
 */
import { Component, NgZone } from '@angular/core';
import {Layer} from './layer.component';
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
  zone: NgZone;



  constructor(zone: NgZone, private netService: NetworkService) {

    this.layers = [new Layer(), new Layer(), new Layer()];
    this.zone = zone;
    window["network"] = this;
  }

  clicked() {
    this.netService.sendCommandToNetwork("add_layer", {input_size: 2, output_size:2});
  }

  public addLayer(text: string) {

    this.layers.push(new Layer());

  }

  public outsideAddLayer(text: string) {
    this.zone.run(() => {
      this.addLayer(text);
    })
  }
}
