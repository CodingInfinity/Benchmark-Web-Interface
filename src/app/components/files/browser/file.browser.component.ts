import {Component, OnInit, EventEmitter} from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "filebrowser",
  template: require('./file.browser.component.html'),
  outputs:["fileSelect: filesChange"],
  inputs:["archive"]
})

export class FileBrowserComponent implements OnInit{

  public archive: string;
  private currentInode: any;
  private fileStructure: any;
  private selectedFile: any;
  private home: any;
  private breadcrumbs:Array<any>;
  private fileSelect: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router) {
  }

  //When you select a file
  fileSelectEvent(fileInput: any){
    this.fileSelect.emit(this.selectedFile);
  }

  //Takes the URL given and generates a file structure in angular
  ngOnInit(){
    var response2 = '{"name":"BubbleSort.tar.tar.gz","nodeList":[{"name":"makefile","nodeList":[]},{"name":"main.cpp","nodeList":[]}],"id":"Alg-1_BubbleSort.tar.tar.gz"}';

    this.fileStructure = this.archive;
    this.buildID(this.fileStructure);
    console.log(this.fileStructure);
    this.currentInode = this.fileStructure;
    this.selectedFile = null;
    this.home = this.fileStructure;
    this.breadcrumbs = [this.home];
  }

  private buildID(fileStructure:any){
    for(var node of fileStructure.nodeList){
      node.id = fileStructure.id + "_" + node.name;
    }
  }

  changeDir(inodeId: string){
    for(var inode of this.currentInode.nodeList){
      if(inode.id == inodeId){
        var previous = this.currentInode;
        this.currentInode = inode;
        this.buildID(this.currentInode);
        this.currentInode.previous = previous;
      }
    }
    if(this.currentInode.previous.id == inodeId){
      this.currentInode = this.currentInode.previous;
    }
    this.getBreadcrumbs();
  }

  changeDirWithINode(inode:any){
    this.currentInode = inode;
    this.getBreadcrumbs();
  }

  goHome(){
    this.currentInode = this.home;
    this.breadcrumbs = [this.home];
  }

  getBreadcrumbs(){
    let trail:Array<string> = [];
    this.getTrailRecursive(this.currentInode, trail);
    this.breadcrumbs = trail.reverse();
  }

  private getTrailRecursive(inode:any, arr:Array<string>){
    if(inode.previous){
      arr.push(inode);
      this.getTrailRecursive(inode.previous, arr);
      return;
    }
    if(!inode.previous){
      arr.push(this.home);
      return;
    }
  }

}


