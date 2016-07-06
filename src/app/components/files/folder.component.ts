import {Component, OnInit} from "@angular/core";
import { MaterializeDirective } from "angular2-materialize/dist/index";

@Component({
  selector: "folder",
  template: require('./folder.component.html'),
  directives: [
    MaterializeDirective
  ],
  inputs:["inode_id", "name", "type"]
})

export class FolderComponent{
  public inode_id: number;
  public name: string;
  public type: string;
}


