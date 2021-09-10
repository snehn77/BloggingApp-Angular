import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from '../shared/blog.service';
import { IBlog } from './blog';


// This Component is used to show details of a particular component and has path blogs/:id
@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  blog : IBlog = {
    title:'',
    content:'',
    categories:''
  };
  // Variable to clean and sanitize HTML
  _sanitizedHTML: string = this.blog.sanitizedHTML || ''; 

  // Keeps a track of any changes in the current id
  changedHTML : boolean = false;
  blogUpdate : IBlog = {
    title:'',
    content:'',
    categories:''
  };
  id!:String;
  constructor(private blogService : BlogService , private route : ActivatedRoute , private router : Router , private sanitizer : DomSanitizer , private toastr : ToastrService) { }

  // Life Cycle Hook
  ngOnInit(): void {
    // Gets the current route id
    this.id = String(this.route.snapshot.paramMap.get('id'));

    // Retrive Blog of paticular id from the database
    this.blogService.getBlog(this.id).subscribe({
      next:blog=>{ 
        try{
          this._sanitizedHTML = blog.sanitizedHTML? blog.sanitizedHTML : '';
          this.changedHTML = true;
        }
        catch(e){
          console.log(e);
        }
        this.blog = blog;
      }
    });
  }

  // Toast/Pop Up message to show when delete is successfull
  showDeleteToast():void{
    this.toastr.success('Deleted Successfully','Opearation' , {
      timeOut:1000,
      progressBar:true,
      progressAnimation:'increasing',
  });
  }

  // Method to delete a blog 
  deleteBlog():void{
    // confirm method confirms by droping an alert to confirm deletion
    if(confirm('Press Ok to cofirm') == true){
    // Call the BlogService class to access its methods
    this.blogService.deleteBlog(this.id).subscribe(
      error=>{
        console.log(error);
      });
      // Call the pop when delete is successful
      this.showDeleteToast();
      // Go's to the home page after deleting
      this.router.navigate(['/home']);
    }
  }

  // Method is used to edit a blog
  updateBlog():void{
    this.blogUpdate = {
      _id:this.blog._id,
      title:this.blog.title,
      categories:this.blog.categories,
      content:this.blog.content
    }
    this.blogService.blogLocal = this.blogUpdate;
    this.router.navigate(['/blogs'])
  }

  // GET method used to sanitize the html and format it 
  public get htmlProperty() : SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this._sanitizedHTML);
  }

}
