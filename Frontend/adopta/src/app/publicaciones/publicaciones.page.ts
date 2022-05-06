import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.page.html',
  styleUrls: ['./publicaciones.page.scss'],
})
export class PublicacionesPage implements OnInit {
  posts :any = [];

  imagen:any = [];

  constructor(public _apiService:ApiService ) { 

  
  }


  getPosts(){
    this._apiService.getPosts().subscribe((res:any)=> {
      console.log("SUCCESS " , res);
      this.posts = res;

      if(!this.posts){
        console.log("no hay datos");
      }else{
        
        console.log("si hay datos");
      }
      
      
    } , (error :any) => {
      
      console.log("ERROR " , error);
    })
    
    
  }

  // getImagen(){
  //   this._apiService.getImagen().subscribe((res:any)=> {
  //     console.log("SUCCESS " , res);
  //     this.imagen = res;

  //     if(!this.imagen){
  //       console.log("no hay datos");
  //     }else{
        
  //       console.log("si hay datos");
  //     }
      
      
  //   } , (error :any) => {
      
  //     console.log("ERROR " , error);
  //   })
    
    
  // }

  ngOnInit() {

    this.getPosts();


  }


}





