import {Component} from "@angular/core";

@Component({
  selector: "file",
  template: require('./file.component.html'),
  inputs:["inode_id", "name", "fileType"]
})

export class FileComponent{
  public inode_id: number;
  public name: string;
  public fileType: string;

  fileClicked(){
  }

}


