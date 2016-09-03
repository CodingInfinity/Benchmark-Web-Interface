import {Component, OnInit} from "@angular/core";
import {APIService} from "../../services/api.service";
import {Response} from "@angular/http";
import "highlight.js/lib/highlight.js";
import {SafeHtml, DomSanitizer} from "@angular/platform-browser";

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
  public content:SafeHtml="";

  constructor(private api:APIService, private dom:DomSanitizer){

  }

  ngOnInit(){

    this.escapeFilname();
    if(this.inode_id.substring(0,3) == "Alg"){
      this.api.getAlgorithmContentWithGET(this.inode_id).subscribe((res:Response)=>{
        this.content = JSON.parse(res.text()).content;
      });
    }else{
      this.api.getDatasetContentWithGET(this.inode_id).subscribe((res:Response)=>{
        this.content = JSON.parse(res.text()).content;
      });
    }


  }

  escapeFilname(){
    this.html_id = this.inode_id.split('.').join('');
    this.html_id = this.html_id.split('_').join('');
    this.html_id = this.html_id.split('-').join('');
  }
}


