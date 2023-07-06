import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { saveAs } from 'file-saver';
import { EmployeeAvatar } from 'src/models/employeeAvatar.model';
import { MatOptionSelectionChange } from '@angular/material/core';


@Injectable({
  providedIn: 'root'
})
export class EmployeeAvatarService {

  uri = 'http://localhost:8080/api/employeeAvatars';

  constructor(private http: HttpClient) { }


  getAllByEmployeeId(id:number){
      var data={
          employeeId:id
      }
      return this.http.post<EmployeeAvatar>(`${this.uri}GetByEmployeeId`,data);
  }

  display(file:EmployeeAvatar){
    const filePath=new HttpParams().set('filePath',file.filePath);
    const options={
        params:filePath
    }
    return this.http.get(`${this.uri}/display`, {...options});
}

  upload(file:FormData){
    return this.http.post('http://localhost:8080/api/employeeAvatars',file);
  }
  download(file:EmployeeAvatar){
      const filePath=new HttpParams().set('filePath',file.filePath);
      
      const options={
          params:filePath
      }
      return this.http.get(`${this.uri}/download`,{...options, responseType:"blob"}).toPromise().then(blob=>{
          saveAs(blob);
      })
      .catch(err => console.error("download error = ", err));
  }

  deleteFile(id:number){
    return this.http.delete(`${this.uri}/${id}`);
  }

  deleteFilesByEmployeeId(id:number){
    return this.http.delete(`${this.uri}DeleteByEmployeeId/${id}`);
  }

  deleteAll(){
    return this.http.delete(`${this.uri}`);
  }
}