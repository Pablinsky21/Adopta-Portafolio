import { Injectable } from '@angular/core';
import {Camera ,CameraPhoto, CameraResultType , CameraSource,Photo} from '@capacitor/camera'
import {Filesystem , Directory} from '@capacitor/filesystem'
import {Storage} from '@capacitor/storage'
import {Foto} from '../models/foto.interface'

@Injectable({
  providedIn: 'root'
})
export class FotoService {
  //Arreglo para almacenar fotos
  public fotos: Foto[] = [];
 
  private PHOTO_STORAGE: string = "fotos"
  constructor() { }

  public async addNewToGallery()
  {
    //proceso para tomar una foto Nativo para cualquier sistema
    const fotoCapturada = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera ,
      quality : 100  

    })
    this.fotos = []
    const savedImageFile = await this.savePicture(fotoCapturada)
    this.fotos.unshift(savedImageFile)
    
    Storage.set({
      key:this.PHOTO_STORAGE ,
      value: JSON.stringify(this.fotos)
    })

  }

  public async savePicture(cameraPhoto: CameraPhoto) 
  {
    //Convertir la foto a formato base 64
    const base64Data = await this.readAsBase64(cameraPhoto)
    //Escribir la foto en el directorio
    
    const fileName =  new Date().getDate +'.jpeg' ;
    const savedFile = await Filesystem.writeFile(
      {
        path:fileName ,
        data: base64Data ,
        directory: Directory.Data
      }
    )
    return {
     
      filepath : fileName , 
      webviewPath: cameraPhoto.webPath
    }
    
  }

  public async readAsBase64(cameraPhoto: CameraPhoto)
  {
    //Convertir de blob a Base64 para almacenar en el sistema de archivos
    const response = await fetch(cameraPhoto.webPath!)
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


}

