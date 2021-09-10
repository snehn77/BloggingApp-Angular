import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , throwError } from 'rxjs';
import { IBlog } from '../blog/blog';
import { catchError,tap } from "rxjs/operators";

// This is the service Class of The app and is mainly used to communicate with the backend server and databse
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private baseURL = "http://localhost:3000/blogs";
  blogLocal : IBlog  = {
    title:'',
    content:'',
    categories:''
  };
  blog : String[] = [];
  constructor(private http : HttpClient) { }

  // Adding a blog to the database : Call the post method from backend server
  postBlog(blog : IBlog) : Observable<IBlog[]>{
    return this.http.post<IBlog[]>(this.baseURL , blog).pipe(
      catchError(this.handleError)
    );
  }
  // Getting a list of blogs in the database : Call the get method from backend server
  getBlogList(): Observable<IBlog[]>{
    return this.http.get<IBlog[]>(this.baseURL).pipe(
      catchError(this.handleError)
    );
  }

  //Edit a blog in the database of a paticular id : Call the put method from backend server
  putBlog(blog:IBlog): Observable<any>{
    return this.http.put(this.baseURL + `/${blog._id}` , blog).pipe(
      catchError(this.handleError)
    );
  }

  // Deleting a blog from the database : Call the delete method from backend server
  deleteBlog(_id:String):Observable<any>{
    return this.http.delete(this.baseURL + `/${_id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Get a blog of a paticular id : call the get method from the backend server
  getBlog(_id:String): Observable<IBlog>{
    return this.http.get<IBlog>(this.baseURL + `/${_id}`).pipe(
      catchError(this.handleError)
    );
  }

  // In case a error occurs while communication with backend server this is useful
  private handleError(err:HttpErrorResponse){
    let errorMessage = '';
    if(err.error instanceof ErrorEvent){
        // A client side or network error occurred. Handle it accordingly
        errorMessage = `An error occurred: ${err.error.message}`
    }
    else{
        // The backend returned an unsuccessful response code
        // The response body may contain clues as to what went wrong
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`
    }
    console.error(errorMessage);
    return throwError(errorMessage);     
}
}
