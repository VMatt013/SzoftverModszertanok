import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserService } from './user.service';

@NgModule({
  declarations: [
    AppComponent // Ensure AppComponent is declared here
  ],
  imports: [
    BrowserModule,
    HttpClientModule // HttpClientModule must be imported here
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
