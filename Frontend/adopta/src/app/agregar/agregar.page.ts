import { Component } from '@angular/core';
import { FotoService } from '../services/foto.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';




 
@Component({
  
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})

export class AgregarPage  {

  titulo:any;
  subtitulo:any;
  descripcion:any;
  imagen:any;
  prueba:any;

  constructor(public fotoService: FotoService , private router : Router , public toastController: ToastController , public _apiService : ApiService) {

  }
 
  
  

  addPhotoToGallery()
  {
    this.fotoService.addNewToGallery();
   
  }

  async ngOnInit(){

    
  }
  public async readAsBase64(foto)
  {
    //Convertir de blob a Base64 para almacenar en el sistema de archivos
    const response = await fetch(foto)
    const blob = await response.blob()

    return await this.convertBlobToBase64(blob) as string
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve , reject) =>{
    const reader = new FileReader
    reader.onerror = reject
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.readAsDataURL(blob)
  })



 
  public async savePicture() 
  {

    for (let foto of this.fotoService.fotos){
      this.prueba= foto.webviewPath;
    }
         

      if(!this.titulo){
      
        const toast = await this.toastController.create({
          message: 'Falta el campo titulo.',
          duration: 2000 ,
          color: "danger"
        });
        toast.present();
        
      }
      else if(!this.prueba)
      {
        const toast = await this.toastController.create({
          message: 'Falta subir la imagen',
          duration: 2000,
          color: "danger"
        });
        toast.present();
      }
      else if(!this.subtitulo)
      {
        const toast = await this.toastController.create({
          message: 'Falta el campo subitulo',
          duration: 2000,
          color: "danger"
        });
        toast.present();
      }
      else if(!this.descripcion)
      {
        const toast = await this.toastController.create({
          message: 'Falta el campo descripcion',
          duration: 2000,
          color: "danger"
        });
        toast.present();
      }
      else 
      {     
      let data = {

        titulo: this.titulo ,
        subtitulo: this.subtitulo ,
        descripcion: this.descripcion,       
        imagen: this.prueba
      }

      
      this._apiService.subirPost(data).subscribe(async(res:any)=> {
    
        console.log("SUCCESS " , res);

        const toast = await this.toastController.create({
          message: 'Datos subidos correctamente',
          duration: 2000,
          color: "success"
        });
        toast.present();
  
        this.router.navigateByUrl('/publicaciones');
        
        
      } , (async(error : any) => {

        console.log("ERROR " , error);

        const toast = await this.toastController.create({
          message: 'error',
          duration: 2000,
          color: "danger"
        });
        toast.present();

      }))
      
    }
  }
}
       

    
  

  

