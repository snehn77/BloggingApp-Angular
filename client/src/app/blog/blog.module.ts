import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BlogDetailComponent } from './blog-detail.component';
import { BlogComponent } from './blog.component';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr';

// This is the blog module all blog related operations are done with this
@NgModule({
  declarations: [
    BlogComponent,
    BlogDetailComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forChild([
      // For new post
      {path:'blogs' , component:BlogComponent },
      {
        // To get the paticular blog
        path:'blogs/:id' ,
        component:BlogDetailComponent
      }
    ]),
  ],
  exports:[]
})
export class BlogModule { }
