import {Component, OnInit} from "@angular/core";
import { MaterializeDirective } from "angular2-materialize/dist/index";
import { Router, ROUTER_DIRECTIVES } from "@angular/router";
import { EventEmitter} from "@angular/router-deprecated/src/facade/async";
import { FileComponent} from "../file.component";
import { FolderComponent} from "../folder.component";

@Component({
  selector: "filebrowser",
  template: require('./file.browser.component.html'),
  directives: [
    MaterializeDirective,
    FileComponent,
    FolderComponent

  ],
  inputs:["url"],
  outputs:["fileSelect: filesChange"]
})

export class FileBrowserComponent implements OnInit{

  public url: string;
  private currentInode: any;
  private fileStructure: any;
  private selectedFile: any;
  private home: any;
  private fileSelect: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router) {
  }

  //When you select a file
  fileSelectEvent(fileInput: any){
    this.fileSelect.emit(this.selectedFile);
  }

  //Takes the URL given and generates a file structure in angular
  ngOnInit(){
    var response = '' +
      '{"id": 0, "name": "root", "nodeList": ' +
        '[ ' +
          '{ "id": 1, "name": "src", "nodeList": ' +
            '[' +
              '{"id": 57914, "name": "images", "nodeList": ' +
                '[' +
                  '{"id": 234, "name": "fabio.png", "fileType": "image/png", "contents": "QEFCQ0RFRkc="}' +
                ']},' +
              '{"id": 5748, "name": "main.cpp", "fileType": "application/pdf","contents": "QEFCQ0RFRkc="},' +
              '{"id": 4567, "name": "index.html", "fileType": "text/html","contents": "QEFCQ0RFRkc=" }' +
            ']},' +
          '{"id": 78, "name": "public", "nodeList": ' +
            '[' +
              '{ "id": 12,"name": "readme.pdf","fileType": "application/pdf", "contents": "QEFCQ0RFRkc=" }' +
            ']},' +
          '{"id": 9963,"name": "tmp","nodeList": ' +
            '[' +
              '{"id": 890,"name": "temp.dat","fileType": "text/plain","contents": "QEFCQ0RFRkc=" }' +
            ']},' +
          '{"id": 124457,"name": "/var","nodeList": []}' +
        ']' +
      '}';

    var response2 = '{"id":1, "name": "test.java", "fileType": "text/java", "contents": "helloworld"}';

    this.fileStructure = JSON.parse(response2);
    console.log(this.fileStructure);
    this.currentInode = this.fileStructure;
    this.selectedFile = null;
    this.home = this.fileStructure;
  }

  changeDir(inodeId: number){
    for(var inode of this.currentInode.nodeList){
      if(inode.id == inodeId){
        var previous = this.currentInode;
        this.currentInode = inode;
        this.currentInode.previous = previous;
        return;
      }
    }
    if(this.currentInode.previous.id == inodeId){
      this.currentInode = this.currentInode.previous;
    }
  }

  goHome(){
    this.currentInode = this.home;
  }
}


