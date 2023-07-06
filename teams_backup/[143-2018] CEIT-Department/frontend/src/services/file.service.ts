import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { File } from 'src/models/file.model';
import { saveAs } from 'file-saver';


@Injectable({
  providedIn: 'root'
})
export class FileService {

  uri = 'http://localhost:8080/api/files';

  constructor(private http: HttpClient) { }

  
  /* upload(employeeFullName:string, subjectCode:string, file:FormData, type:string){
    var data={
      employeeFullName:employeeFullName,
      subjectCode:subjectCode,
      file:file,
      type:type
    }
    return this.http.post(`${this.uri}`, data);
  } */

  getAllBySubjectAndType(sub:string,type:string){
      var data={
          subjectCode:sub,
          type:type
      }
      return this.http.post<File[]>(`${this.uri}GetBySubjectAndType`,data);
  }

  download(file:File){
      const filePath=new HttpParams().set('filePath',file.filePath);
      
      const options={
          params:filePath
      }
      console.log(options);
      return this.http.get(`${this.uri}/download`,{...options, responseType:"blob"}).toPromise().then(blob=>{
          saveAs(blob);
      })
      .catch(err => console.error("download error = ", err));
  }

  deleteFile(id:number){
    return this.http.delete(`${this.uri}/${id}`);
  }
}