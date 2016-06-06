import {Injectable, EventEmitter} from "angular2/core";
import {Http, Headers} from "angular2/http";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";

@Injectable()

export class DataService {
    private _url = 'https://videocatalog-angular2.firebaseio.com/courses.json';
    private _token = localStorage.getItem('token') !== null ? '?auth=' + localStorage.getItem('token') : ''; // authentication for firebase
    dataChanged = new EventEmitter<any>();

    constructor (private _http: Http) {}

    getAllData(): Observable<any> {
        return this._http.get(this._url + this._token)
            .map(response => response.json());
    }

    getSingleData(name: any): Observable<any> {
        const uri = 'https://videocatalog-angular2.firebaseio.com/courses/' + name + '.json';

        return this._http.get(uri + this._token).map(response => response.json());
    }

    updateData(name: any, data: any): Observable<any> {
        const uri = 'https://videocatalog-angular2.firebaseio.com/courses/' + name + '.json';
        const body = JSON.stringify(data);
        const headers = new Headers();

        return this._http.put(uri + this._token, body, { headers: headers })
            .map(response => response.json(), this.dataChanged.emit('update'));
    }

    deleteDataSet(name: any): Observable<any> {
        const uri = 'https://videocatalog-angular2.firebaseio.com/courses/' + name + '.json';

        return this._http.delete(uri + this._token)
            .map(response => response.json(), this.dataChanged.emit('delete')
        );
    }

}
