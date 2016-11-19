// Imports
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Comment }           from '../model/comment';
import {Observable} from 'rxjs';

// Import RxJs required methods
//import './rxjs-operators';

@Injectable()
export class NetworkService {
     // Resolve HTTP using the constructor
     constructor (private http: Http) {}
     // private instance variable to hold base url
    private networkUrl = 'http://localhost:5000/network';

         // Fetch all existing comments
     getNetworkStatus() : Observable<Comment[]>{
         // ...using get request
         return this.http.get(this.networkUrl)
                        // ...and calling .json() on the response to return data
                         .map((res:Response) => res.json())
                         //...errors if any
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

     }

}
