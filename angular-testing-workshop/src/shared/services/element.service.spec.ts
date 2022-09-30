import {TestBed} from '@angular/core/testing';

import {ElementService} from './element.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {PeriodicElement} from '../models/periodic-elements.model';
import {environment} from '../../environments/environment';
import * as HttpStatus from 'http-status-codes';

describe('ElementService', () => {
    let service: ElementService;
    let httpMock: HttpTestingController;

    const baseUrl = environment.jsonServerEndpoint;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ]
        });
        service = TestBed.inject(ElementService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should load PeriodicElements', (done) => {
        const httpResponse = [
            {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
            {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'}
        ];

        const expectedElements: PeriodicElement[] = [
            {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
            {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'}
        ];

        service.getElements().subscribe((elements) => {
            expect(elements[0].name).toEqual(expectedElements[0].name);
            expect(elements[0].position).toEqual(expectedElements[0].position);
            expect(elements[0].weight).toEqual(expectedElements[0].weight);
            expect(elements[0].symbol).toEqual(expectedElements[0].symbol);
            expect(elements[1].name).toEqual(expectedElements[1].name);
            expect(elements[1].position).toEqual(expectedElements[1].position);
            expect(elements[1].weight).toEqual(expectedElements[1].weight);
            expect(elements[1].symbol).toEqual(expectedElements[1].symbol);
            done();
        });

        const mockReq = httpMock.expectOne(`${baseUrl}/elements`);
        expect(mockReq.cancelled).toBe(false);
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(httpResponse);

        httpMock.verify();
    });

    it('should handle error on load PeriodicElements', (done) => {
        const expectedResult = [];
        service.getElements().subscribe(fail, error => {
            expect(error).toBeTruthy();
            done();
        });

        const mockReq = httpMock.expectOne(`${baseUrl}/elements`);
        expect(mockReq.cancelled).toBe(false);
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush([], {status: HttpStatus.NOT_FOUND, statusText: 'Not Found'});

        httpMock.verify();
    });
});
