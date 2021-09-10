import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IBlog } from '../blog/blog';
import { BlogService } from '../shared/blog.service';

// This component is Used to display the home page of the website
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit,OnDestroy {

  blogs : IBlog [] = [];
  constructor(private blogService : BlogService ) {  }
  sub!: Subscription;
  
  // Life Cycle Hook
  ngOnInit(): void {
    // To get all the blogs in the database by calling the service class
    this.sub = this.blogService.getBlogList().subscribe({
      next: blogs=>{
        this.blogs = blogs;
      }
    });

  }
  // Life cycle hook
  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
