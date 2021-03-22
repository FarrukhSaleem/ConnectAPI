import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[];

  constructor(private service: PostService) {

  }
  ngOnInit(): void {
    this.service.GetAllPost()
      .subscribe(response => {
        this.posts = response.json();
      },error =>{
        alert("An unexpected error occured.");
        console.log(error);
      });
  }
  CreatePost(inputControl: HTMLInputElement) {
    let post: any = { Title: inputControl.value }
    inputControl.value = "";

    this.service.CreatePost(post)
      .subscribe(response => {
        console.log(response.json());
        post = response.json();
        console.log(post);
        this.posts.splice(0, 0, post);
      },error =>{
        alert("An unexpected error occured.");
        console.log(error);
      });
  }
  UpdatePost(post) {
    this.service.UpdatePost(post)
      .subscribe(response => {
        console.log("Done");
      },error =>{
        alert("An unexpected error occured.");
        console.log(error);
      });
  }
  DeletePost(post) {
    this.service.DeletePost(post.Id)
      .subscribe(response => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      },(error: Response) =>{
        if(error.status === 404){
          alert("The selected post not found.");
        }
        else{
          alert("An unexpected error occured.");
          console.log(error);
        }        
      });
  }
}