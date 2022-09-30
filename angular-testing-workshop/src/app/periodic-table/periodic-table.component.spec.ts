import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {PeriodicTableComponent} from './periodic-table.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import SpyInstance = jest.SpyInstance;
import {ElementService} from '../../shared/services/element.service';
import {ElementSeviceMock} from '../../shared/services/element.sevice.mock';
import {of, throwError} from 'rxjs';
import {PeriodicElement} from '../../shared/models/periodic-elements.model';

describe('PeriodicTableComponent', () => {
    let component: PeriodicTableComponent;
    let fixture: ComponentFixture<PeriodicTableComponent>;

    const elementsMock: PeriodicElement[] = [
        {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
        {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
        {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
        {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
        {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
        {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
        {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
        {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
        {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
        {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    ];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                PeriodicTableComponent
            ],
            imports: [
                BrowserAnimationsModule,
                MatTableModule,
                MatButtonModule,
                HttpClientTestingModule
            ],
            providers: [
                {provide: ElementService, useClass: ElementSeviceMock}
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PeriodicTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('request data for elements', () => {
        let requestElementsSpy: SpyInstance;
        let consoleErrorSpy: SpyInstance;

        beforeEach(() => {
        });

        it('should update element data', () => {
            requestElementsSpy = jest.spyOn(TestBed.inject(ElementService), 'getElements').mockReturnValue(
                of(elementsMock)
            );
            component.requestElements();
            for (let i = 0; i < elementsMock.length; i++) {
                expect(component.elementsDataSrc.data[i].position).toEqual(elementsMock[i].position);
                expect(component.elementsDataSrc.data[i].name).toEqual(elementsMock[i].name);
                expect(component.elementsDataSrc.data[i].weight).toEqual(elementsMock[i].weight);
                expect(component.elementsDataSrc.data[i].symbol).toEqual(elementsMock[i].symbol);
            }
            expect(requestElementsSpy).toBeCalledTimes(1);
        });

        it('should log error on failed update of element data', () => {
            consoleErrorSpy = jest.spyOn(console, 'error');
            requestElementsSpy = jest.spyOn(TestBed.inject(ElementService), 'getElements').mockReturnValue(
                throwError('any error')
            );
            component.requestElements();
            expect(requestElementsSpy).toBeCalledTimes(1);
            expect(consoleErrorSpy).toBeCalledWith('Error while fetching data');
        });
    });

    it('should reset element data for table and resolve subscription', fakeAsync(() => {
        const requestElementsSpy = jest.spyOn(TestBed.inject(ElementService), 'getElements').mockReturnValue(
            of(elementsMock)
        );
        component.requestElements();
        expect(requestElementsSpy).toHaveBeenCalledTimes(1);
        expect(component.elementsDataSrc.data).toEqual(elementsMock);
        // tslint:disable-next-line:no-string-literal
        expect(component['elementSubscription$']).toBeTruthy();
        tick();

        const destroySubscriptionSpy = jest.spyOn<PeriodicTableComponent, any>(component, 'destroySubscription');
        component.removeElements();

        expect(destroySubscriptionSpy).toBeCalledTimes(1);
        expect(component.elementsDataSrc.data).toEqual([]);
        // tslint:disable-next-line:no-string-literal
        expect(component['elementSubscription$']).toHaveProperty('_subscriptions', null);
        // tslint:disable-next-line:no-string-literal
        expect(component['elementSubscription$']).toHaveProperty('closed', true);
    }));
});
