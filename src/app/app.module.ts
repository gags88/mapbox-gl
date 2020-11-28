import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StatesDataComponent } from './components/states-data/states-data.component';
import { MatCardModule, MatListModule } from '@angular/material';

@NgModule({
  declarations: [AppComponent, MapComponent, StatesDataComponent],
  imports: [BrowserModule, HttpClientModule, FlexLayoutModule, MatListModule, MatCardModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
