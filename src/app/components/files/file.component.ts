import {Component, OnInit} from "@angular/core";
import {APIService} from "../../services/api.service";
import {Response} from "@angular/http";

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
  public content:string="";

  constructor(private api:APIService){

  }

  ngOnInit(){
    this.escapeFilname();
    if(this.inode_id.substring(0,3) == "Alg"){
      this.api.getAlgorithmContentWithGET(this.inode_id).subscribe((res:Response)=>{
        this.content = JSON.parse(res.text());
        console.log(this.content);
      });
    }else{
      this.api.getDatasetContentWithGET(this.inode_id).subscribe((res:Response)=>{
        this.content = JSON.parse(res.text());
      });
    }


  }

  escapeFilname(){
    this.html_id = this.inode_id.split('.').join('');
    this.html_id = this.html_id.split('_').join('');
    this.html_id = this.html_id.split('-').join('');
  }
}


