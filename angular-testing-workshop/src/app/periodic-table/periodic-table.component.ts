import {Component, OnInit} from '@angular/core';
import {ElementService} from '../../shared/services/element.service';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import {filter} from 'rxjs/operators';
import {UntilDestroy} from '@ngneat/until-destroy';
import {PeriodicElement} from '../../shared/models/periodic-elements.model';
import {MatTableDataSource} from '@angular/material/table';
import {Subscription} from 'rxjs';

@UntilDestroy()
@Component({
    selector: 'app-periodic-table',
    templateUrl: './periodic-table.component.html',
    styleUrls: ['./periodic-table.component.scss']
})
export class PeriodicTableComponent implements OnInit {

    constructor(private elementService: ElementService) {
    }

    private elementSubscription$: Subscription = new Subscription();
    readonly elementsDataSrc: MatTableDataSource<PeriodicElement> = new MatTableDataSource();

    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

    ngOnInit(): void {
    }

    requestElements(): void {
        this.elementSubscription$ = this.elementService.getElements().pipe(
            filter(isNotNullOrUndefined)
        ).subscribe(
            (elements) => {
                this.elementsDataSrc.data = elements;
            }, (error) => {
                console.error('Error while fetching data');
            }
        );
    }

    removeElements(): void {
        this.destroySubscription();
        this.elementsDataSrc.data = [];
    }

    private destroySubscription(): void {
        if (this.elementSubscription$) {
            this.elementSubscription$.unsubscribe();
        }
    }
}
