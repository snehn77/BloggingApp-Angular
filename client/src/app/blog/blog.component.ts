import { Component,  OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { BlogService } from '../shared/blog.service';
import { IBlog } from './blog';

// This Component is used for adding/ Editing a blog
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blog : IBlog = this.blogService.blogLocal;
  sub!: Subscription;
  errorMessage:string = '';
  constructor(private blogService : BlogService , private router : Router , private toastr : ToastrService) { }

  ngOnInit(): void {
  }
  
  // Method used for adding a blog 
  postBlog():void {
    // If method - is used when we want to add a new blog
    if(this.blog._id == undefined){
        const newBlog = {
         title:this.blog.title,
         content:this.blog.content,
         categories:this.blog.categories
        } 
        this.sub = this.blogService.postBlog(newBlog).subscribe(
          error => {
          console.log(error);        
        });
    }
    // Else is used to edit a blog
    else{
      this.sub = this.blogService.putBlog(this.blog).subscribe(
        error => {
          console.log(error);  
        });
        this.blogService.blogLocal = {
          title:'',
          content:'',
          categories:'',
          _id:undefined
        }
    }
    this.router.navigate(['/home']);
    // Calling the toast method after successfull adding/editing
    this.showAddToast();
  }

  // Toaster to show toast/pop up after successful addition
  showAddToast():void{
    this.toastr.success('Saved Successfully','Opearation' , {
        timeOut:1000,
        progressBar:true,
        progressAnimation:'increasing',
    });
  }

  // Method is used to reset a form
  resetForm(form? : NgForm){
    if(form){
      form.reset();
    }
    this.blog = {
      _id:this.blog._id,
      title:'',
      categories:'',
      content:''
    }
  }

}
