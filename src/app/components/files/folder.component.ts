import {Component} from "@angular/core";

@Component({
  selector: "folder",
  template: require('./folder.component.html'),
  inputs:["inode_id", "name", "type"]
})

export class FolderComponent{
  public inode_id: number;
  public name: string;
  public type: string;
}


