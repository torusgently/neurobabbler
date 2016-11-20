import { Component, NgZone } from '@angular/core';

import {NetworkService} from './network.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'App is cool!';
  msg: string;
  network: any;

  constructor(private netService: NetworkService, private zone: NgZone) {
    window["app"] = this;
  }

  public speechRecognized(resp: any) {

    var t = this;
    this.zone.run(() => {

      console.log(resp)
      var intent = resp["intents"][0]["intent"];
      var entities = resp["entities"];
      var input_size = undefined;
      var output_size = undefined;
      var query = resp['query'];

      console.log("The intent was: " + intent);

      for (let entity of entities) {
        if (entity.type == "inputSize") {
          input_size = entity["entity"];
        } else if (entity.type == "outputSize") {
          output_size = entity["entity"];
        }
      }

      var parameters = {};
      if (input_size) {
        parameters["input_size"] = input_size;
      }

      if (output_size) {
        parameters["output_size"] = input_size;
      }

      var command = ""

      if (intent.indexOf("layer") != -1) {

        if(query.indexOf('one') != -1) {
          output_size = 1;
        }
        command = "add_layer";
        console.log("Added layer")
        t.msg = "Added layer";

      } else if (intent.indexOf("train") != -1) {

        command = "train";
        console.log("Training");
        t.msg = "Training";

      } else if (intent.indexOf("compile") != -1) {

        command = "compile"
        t.msg = "Compiled model";

      } else if (intent.indexOf("remove") != -1) {

        command = "remove";
        t.msg = "Removed last layer";

      } else if (intent.indexOf("reset") != -1) {

        command = "reset";
        t.msg = "Removed last layer";

      } else {
        //Input not recognized
        t.msg = "Did not understand, please can you repeat?";
        return;
      }

      if(output_size == undefined && command == 'add_layer') {
        t.msg = "Did not understand, please can you repeat?";
        return;
      }


      this.network = this.netService.sendCommandToNetwork(command, parameters);
    });

  }


}
