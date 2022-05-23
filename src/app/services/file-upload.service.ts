import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_URL} from "../../index";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private modelPath = "file";

  constructor(private _http: HttpClient) {
  }

  createFile(user: string, postID: string, file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('user', user);
    formData.append('postID', postID);
    formData.append('file', file);
    const req = new HttpRequest(
      'POST',
      `${API_URL}/${this.modelPath}/createFile`,
      formData, {
        responseType: 'json'
      });
    return this._http.request(req);
  }

  updateFile(user: string, postID: string, file: File, oldFileName: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('user', user);
    formData.append('postID', postID);
    formData.append('file', file);
    formData.append('oldFileName', oldFileName);
    const req = new HttpRequest(
      'POST',
      `${API_URL}/${this.modelPath}/updateFile`,
      formData, {
        responseType: 'json'
      });
    return this._http.request(req);
  }

  deleteFileByPostID(user: string | undefined, postID: string | undefined): Observable<Object> {
    return this._http.delete(`${API_URL}/${this.modelPath}/deleteSingle/${user}/${postID}`);
  }

  deleteFileByUser(user: string | undefined): Observable<Object> {
    return this._http.delete(`${API_URL}/${this.modelPath}/deleteAll/${user}`)
  }
}
