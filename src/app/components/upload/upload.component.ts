import {Component, EventEmitter} from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "upload",
  template: require('./upload.component.html'),
  inputs:["type"],
  outputs:["updateFiles: filesChange"]
})

export class UploadComponent {

  private files: any;
  private updateFiles:EventEmitter<any> = new EventEmitter();

  constructor(private router: Router) {
  }

  fileChangeEvent(fileInput: any){
    this.files = fileInput.target.files;
    this.updateFiles.emit(this.files);
  }
}
