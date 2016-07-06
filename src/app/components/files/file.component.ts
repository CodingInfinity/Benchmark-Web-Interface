import {Component, OnInit} from "@angular/core";
import { MaterializeDirective } from "angular2-materialize/dist/index";

@Component({
  selector: "file",
  template: require('./file.component.html'),
  directives: [
    MaterializeDirective
  ],
  inputs:["inode_id", "name", "fileType"]
})

export class FileComponent{
  public inode_id: number;
  public name: string;
  public fileType: string;
}


