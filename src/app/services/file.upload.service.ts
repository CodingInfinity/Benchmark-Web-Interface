import {Observable} from 'rxjs/Observable';
import {Injectable} from "@angular/core";
@Injectable()
export class FileUploadService {
  /**
   * @param Observable<number>
   */
  private progress$:Observable<number>;

  /**
   * @type {number}
   */
  private progress:number = 0;

  private progressObserver:any;

  constructor() {
    this.progress$ = new Observable<number>((observer:any )=> {
      this.progressObserver = observer;
    });
  }

  /**
   * @returns {Observable<number>}
   */
  public getObserver():Observable<number> {
    return this.progress$;
  }

  /**
   * Upload files through XMLHttpRequest
   *
   * @param url
   * @param files
   * @returns {Promise<T>}
   */
  public uploadFiles(name:string, description:string, categories:Array<number>, files:FileList, url:string):Promise<any> {
    return new Promise((resolve, reject) => {
      let formData:FormData = new FormData();
      let xhr:XMLHttpRequest = new XMLHttpRequest();
      xhr.open('POST', url, true);
      xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem('token'))['access_token']);

      formData.append("name", name);
      formData.append("description", description);

      for (var i = 0; i < categories.length; i++) {
        formData.append("categories", categories[i]);
      }

      for (var i = 0; i < files.length; i++) {
        formData.append("files", files[i], files[i].name);
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log("Finshed Here");
          } else {
          }
        }
      };

      FileUploadService.setUploadUpdateInterval(250);

      xhr.upload.onprogress = (event) => {
        this.progress = Math.round(event.loaded / event.total * 100);

        this.progressObserver.next(this.progress);
      };

      xhr.open('POST', url, true);
      FileUploadService.applyAuthorizationHeaders(xhr);
      xhr.send(formData);
    });
  }

  public uploadFile(name:string, description:string, categories:Array<number>, file:File, url:string):Promise<any> {
    return new Promise((resolve, reject) => {
      let formData:FormData = new FormData();
      let xhr:XMLHttpRequest = new XMLHttpRequest();
      xhr.open('POST', url, true);
      xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem('token'))['access_token']);

      formData.append("name", name);
      formData.append("description", description);

      for (var i = 0; i < categories.length; i++) {
        formData.append("categories", categories[i]);
      }


      formData.append("file", file, file.name);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log("Finshed Here");
          } else {
          }
        }
      };

      FileUploadService.setUploadUpdateInterval(250);

      xhr.upload.onprogress = (event) => {
        this.progress = Math.round(event.loaded / event.total * 100);

        this.progressObserver.next(this.progress);
      };

      xhr.open('POST', url, true);
      FileUploadService.applyAuthorizationHeaders(xhr);
      xhr.send(formData);
    });
  }

  private static applyAuthorizationHeaders(xhr:any){
    //TODO: checking for old token here
    xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem('token'))['access_token']);
  }

  private static setUploadUpdateInterval(interval:number):void {
    setInterval(() => {
    }, interval);
  }
}
