import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PeriodicTableComponent} from './periodic-table/periodic-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        PeriodicTableComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatButtonModule
    ],
    providers: [
        HttpClient
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
