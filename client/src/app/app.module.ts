import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RouterModule } from '@angular/router';
import { BlogModule } from './blog/blog.module';

// Main App Module

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'home' , component:HomepageComponent },
      {path:'' , redirectTo:'home',pathMatch:'full' },
      {path:'**' , redirectTo:'home',pathMatch:'full' }
    ]),
    BlogModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
