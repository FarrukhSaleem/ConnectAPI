import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseURL: string = "https://localhost:44369/";
  
  constructor(private http: Http) {
   }

   GetAllPost(){
    return this.http.get(this.baseURL+"api/post/GetAllPosts");
   }
   CreatePost(post){
    return this.http.post(this.baseURL+"api/post/CreatePost", post) 
   }
   UpdatePost(post){
    return this.http.put(this.baseURL+"api/post/UpdatePostTitle",post) 
   }
   DeletePost(id){
    return this.http.delete(this.baseURL+"api/post/DeletePost?id="+id) 
   }
}
