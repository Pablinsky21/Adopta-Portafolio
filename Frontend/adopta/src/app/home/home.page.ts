import { Component } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { toastController } from '@ionic/core';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  users:any = [];
  id :any;
  correo:any;
  usuario:any;
  clave:any;
  user:any;
  pass:any;
  lista:any=[];


  constructor(private menu: MenuController,
              private router : Router,
             public _apiService:ApiService,
             public toastController: ToastController) {


              this.getUsers();
             }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  getUsers(){
    this._apiService.getUsers().subscribe((res:any)=> {
      console.log("SUCCESS " , res);
      this.users = res;
      
    } , (error :any) => {
      
      console.log("ERROR " , error);
    })
      
  }

  async iniciarSesion(){ 

    if(this.user && this.pass){

      this._apiService.login(this.user , this.pass ).subscribe(async (res:any) => {

        console.log("SUCCESS" , res);

        if(res.length==0){

          const toast = await this.toastController.create({
            message: 'Usuario o contraseña incorrectos',
            duration: 2000,
            color: 'danger'
            });
            toast.present();
            
    
        }else
        {
          const toast = await this.toastController.create({
            message: 'Bienvenido a Adopta!',
            duration: 2000,
            color: 'success'
            });
            toast.present();
            this.router.navigateByUrl('/publicaciones');
          }
      }, (err: any)=> {
        console.log("ERROR", err)
      })


    }else{
      const toast = await this.toastController.create({
        message: 'Falta completar al menos un campo',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    }  

  }

}

      

  
