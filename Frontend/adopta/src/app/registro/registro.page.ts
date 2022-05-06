import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { ActivatedRoute , Router} from '@angular/router';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  numero = 0;
  correo:any;
  usuario:any;
  clave:any;
  clave2:any;
  users:any = [];

  constructor(public _apiService:ApiService ,public toastController: ToastController , public router: Router) {
    this.getUsers();
   }

  ngOnInit() {
  }

  async addUser(){
    
    if(!this.correo)
    {
      const toast = await this.toastController.create({
        message: 'El campo correo esta vacío',
        duration: 2000,
        color: 'danger'
      });
      toast.present();

    }

    else if(!this.usuario)
    {

      const toast = await this.toastController.create({
        message: 'El campo usuario esta vacío',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    }

    else if(!this.clave)
    {
      const toast = await this.toastController.create({
        message: 'El campo clave esta vacío',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    }

    else if(!this.clave2)
    {
      const toast = await this.toastController.create({
        message: 'El campo confirmar clave esta vacío',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    }

    else if (this.clave != this.clave2)
    {

      const toast = await this.toastController.create({
        message: 'Las contraseñas deben coincidir',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    }


    else{

      const toast = await this.toastController.create({
        message: 'Registrado correctamente , ahora debes iniciar sesión',
        duration: 2000,
        color: 'success'
      });
      toast.present();

      let data = {
        correo: this.correo ,
        usuario:this.usuario ,
        clave:this.clave,
        clave2:this.clave2
      }
      this._apiService.addUser(data).subscribe((res:any)=> {
    
        console.log("SUCCESS " , res);
        this.correo = '';
        this.usuario = '';
        this.clave = '';       
        this.getUsers();
        this.router.navigateByUrl('/home');
        
        
      } , (error :any) => {
  
        
        
        console.log("ERROR " , error);
      })
    }
    
  }

  getUsers(){
    this._apiService.getUsers().subscribe((res:any)=> {
      console.log("SUCCESS " , res);
      this.users = res;
    } , (error :any) => {
      alert('ERROR');
      console.log("ERROR " , error);
    })
  }


  deleteUser(id){
    this._apiService.deleteUser(id).subscribe((res:any)=> {
      console.log("SUCCESS " , res);
      this.getUsers();
    } , (error :any) => {
      alert('ERROR');
      console.log("ERROR " , error);
    })
  }
}