import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  headers: HttpHeaders;
  constructor(public http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.append("Accept" , 'application/json');
    this.headers.append('Content-type' , 'application/json');
    this.headers.append('Access-Control-Allow-Origin' , '*');
   }


  addUser(data){

    return this.http.post('http://localhost/Adopta/backend/create.php',data);
  }

  getUsers(){
    return this.http.get('http://localhost/Adopta/backend/getUsers.php');
  }
  getPosts(){
    return this.http.get('http://localhost/Adopta/backend/getPosts.php');
  }
  getImagen(){
    return this.http.get('http://localhost/Adopta/backend/getImagen.php');
  }
  deleteUser(id){
    return this.http.delete('http://localhost/Adopta/backend/delete.php?id=' + id);
  }

  getUser(id){
    return this.http.get('http://localhost/Adopta/backend/getSingleUser.php?id=' + id);
  }

  updateUsers(id , data){
    return this.http.put('http://localhost/Adopta/backend/updateUser.php?id=' + id , data);

  }

  login(usuario, clave ){
    return this.http.get('http://localhost/Adopta/backend/login.php?usuario='+usuario +'&clave='+ clave);

  }

  subirPost(data){
    return this.http.post('http://localhost/Adopta/backend/subirPost.php',data);
  }
}