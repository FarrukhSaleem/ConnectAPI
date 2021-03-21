import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[];
  private baseURL: string = "https://localhost:44369/";
  constructor(private http: Http) {

    this.http.get(this.baseURL+"api/post/GetAllPosts")
      .subscribe(response => {
        this.posts = response.json();
        console.log(response.json());
      });
  }
  ngOnInit(): void {
  }
  CreatePost(inputControl: HTMLInputElement) {
    let post:any = { Title: inputControl.value }
    inputControl.value="";
    
    this.http.post(this.baseURL+"api/post/CreatePost", post)  
    .subscribe(response => {
      console.log(response.json());  
        post['Id']=response.json();
        console.log(post);
        this.posts.splice(0,0,post);
      });
  }
}