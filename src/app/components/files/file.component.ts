import {Component, OnInit} from "@angular/core";

@Component({
  selector: "file",
  template: require('./file.component.html'),
  inputs:["inode_id", "name", "fileType"]
})

export class FileComponent implements OnInit{
  public inode_id: string;
  public name: string;
  public fileType: string;

  constructor(){

  }

  ngOnInit(){
    //this.escapeFilname(this.inode_id);
    console.log(this.inode_id);
  }

  fileClicked(){
  }

  escapeFilname(filename:string){
    //this.inode_id = filename.replace('.', '');
  }
}


