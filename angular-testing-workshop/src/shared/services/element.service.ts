import {Injectable} from '@angular/core';
import {PeriodicElement} from '../models/periodic-elements.model';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ElementService {

    private readonly baseUrl = `${environment.jsonServerEndpoint}`;

    constructor(private http: HttpClient) {
    }

    getElements(): Observable<PeriodicElement[]> {
        return this.http.get<PeriodicElement[]>(`${this.baseUrl}/elements`);
    }
}
