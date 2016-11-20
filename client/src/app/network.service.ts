// Imports
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { LayerData }  from './layer';
import {Observable} from 'rxjs';
import parseHttpResponse = http.parseHttpResponse;

// Import RxJs required methods
//import './rxjs-operators';

@Injectable()
export class NetworkService {
     // Resolve HTTP using the constructor
     constructor (private http: Http) {}
     // private instance variable to hold base url
    private networkUrl = 'http://127.0.0.1:5000/network';


     sendCommandToNetwork(command: string, parameters: {}) {

       console.log("Sending command...");
       let body = {
         command: command,
         parameters: parameters
       };

       let bodyString = JSON.stringify(body); // Stringify payload
       let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
       let options = new RequestOptions({ headers: headers }); // Create a request option

       return this.http.post(this.networkUrl, body, options) // ...using post request
         .map(this.responseToServer).toPromise()
         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any

     }


     responseToServer(res: Response) {

       let json = res.json();
       console.log(json);
       return res.json();
     }

}
