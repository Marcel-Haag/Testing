import {ElementService} from './element.service';
import {Observable, of} from 'rxjs';
import {PeriodicElement} from '../models/periodic-elements.model';

export class ElementSeviceMock implements Required<ElementService> {
    public getElements(): Observable<PeriodicElement[]> {
        return of(new Array<PeriodicElement>());
    }
}
