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
      });
  }
  ngOnInit(): void {
  }
  CreatePost(inputControl: HTMLInputElement) {
    let post:any = { title: inputControl.value }
    //let post = { title: inputControl.value }

    this.http.post(this.baseURL, JSON.stringify(post))
      .subscribe(response => {
        post.id = response.json();
        //post['id']=response.json();
        this.posts.splice(0,0,post);
      });
  }
}