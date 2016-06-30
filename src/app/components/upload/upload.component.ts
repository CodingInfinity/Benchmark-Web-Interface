import { Component } from "@angular/core";
import { MaterializeDirective } from "angular2-materialize/dist/index";
import { Router, ROUTER_DIRECTIVES } from "@angular/router";
import { ControlGroup, FormBuilder, Validators} from "@angular/common";
import { EventEmitter} from "@angular/router-deprecated/src/facade/async";

@Component({
  selector: "upload",
  template: require('./upload.component.html'),
  directives: [
    MaterializeDirective   
  ],
  inputs:["type"],
  outputs:["updateFiles: filesChange"]
})

export class UploadComponent {

  private files: any;
  private updateFiles:EventEmitter<any> = new EventEmitter();

  constructor(private router: Router, private fb: FormBuilder) {
  }

  fileChangeEvent(fileInput: any){
    this.files = fileInput.target.files;
    this.updateFiles.emit(this.files);
  }
}
