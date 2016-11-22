// app component 
import { Component, NgZone } from '@angular/core';

import {NetworkService} from './network.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Listen when neurons speak!';
  msg: string;
  network: any;
  counter= 0;

  constructor(private netService: NetworkService, private zone: NgZone) {
    window["app"] = this;
  }

  setState(network: any) {

  }

  public speechRecognized(resp: any) {

    var t = this;
    this.zone.run(() => {

      var states = [{"input_size" : 2, "output_size" : 10, "intent" : "add_layer"},
        {"output_size" : 4, "intent" : "add_layer" }, {"intent" : "add_layer", "output_size" : 1},
        {intent: "compile"}, {intent: "train"}, {intent: "reset"}];


      console.log(resp)
      var intent = resp["intents"][0]["intent"];
      var probability = resp["intents"][0]["score"];

      var entities = resp["entities"];
      var input_size = undefined;
      var output_size = undefined;
      var query = resp['query'];

      if(probability < 0.6) {
        intent = "bogus";
      }

      intent = states[this.counter]["intent"];
      input_size = states[this.counter]["input_size"];
      output_size = states[this.counter]["output_size"];

      if(this.counter == states.length)
        intent = "bogus";
      else
        this.counter++;

      for (let entity of entities) {
        if (entity.type == "inputSize") {
          input_size = entity["entity"];
        } else if (entity.type == "outputSize") {
          output_size = entity["entity"];
        }
      }
      var parameters = {};

      var command = "";

      if (intent.indexOf("layer") != -1) {

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

      parameters["input_size"] = input_size;
      parameters["output_size"] = output_size;

      this.network = this.netService.sendCommandToNetwork(command, parameters).then(function(data) {
        console.log(data);
        t.network = data;
//        debugger;
      });

      console.log("The network is");
      console.log(this.network);

    });



  }


}
