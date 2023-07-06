import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { SubjectNoticeFile } from 'src/models/subjectNoticeFile.model';
import { saveAs } from 'file-saver';


@Injectable({
  providedIn: 'root'
})
export class SubjectNoticeFileService {

  uri = 'http://localhost:8080/api/subjectNoticeFiles';

  constructor(private http: HttpClient) { }


  getAllByNoticeId(id:number){
      var data={
          subjectNoticeId:id
      }
      return this.http.post<SubjectNoticeFile[]>(`${this.uri}GetByNoticeId`,data);
  }

  download(file:SubjectNoticeFile){
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

  deleteFilesByNoticeId(id:number){
    return this.http.delete(`${this.uri}DeleteByNoticeId/${id}`);
  }

  deleteAll(){
    return this.http.delete(`${this.uri}`);
  }
}