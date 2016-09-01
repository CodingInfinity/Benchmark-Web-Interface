import {Component, OnInit} from "@angular/core";

@Component({
  selector: "file",
  template: require('./file.component.html'),
  inputs:["inode_id", "name", "fileType"]
})

export class FileComponent implements OnInit{
  public inode_id: string;
  public html_id:string;
  public name: string;
  public fileType: string;

  constructor(){

  }

  ngOnInit(){
    this.escapeFilname();
  }
  
  escapeFilname(){
    this.html_id = this.inode_id.split('.').join('');
    this.html_id = this.html_id.split('_').join('');
    this.html_id = this.html_id.split('-').join('');
  }
}


