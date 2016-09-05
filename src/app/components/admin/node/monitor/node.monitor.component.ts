import {Component} from "@angular/core";
import {SecureComponent} from "../../../../services/secure.component";
import {Router} from "@angular/router";
import {APIService} from "../../../../services/api.service";
import {Response} from "@angular/http";

@Component({
  selector: "nodemonitor",
  template: require('./node.monitor.component.html'),
  styles: [require('./node.monitor.component.css')]
})

export class NodeMonitor extends SecureComponent{
  private nodes:Array<any> = [];

  constructor(protected api:APIService, protected router: Router){
    super(router, api);
    this.authorities = ["ROLE_ADMIN"];
  }

  ngOnInit():void {
    this.api.getNodeSumaryWithGET().subscribe((res:Response)=>{
      this.nodes = JSON.parse(res.text());
      for(var node of this.nodes){
        node.details = {};
        this.getNodeDetails(node.id, node);
      }
      console.log(this.nodes);
    },(err:any)=>{
      this.hasError = true;
      this.errorMessage = JSON.parse(err)["message"];
    })
  }

  getNodeDetails(node_id:string, node:any){
    this.api.getNodeByIdWithGet(node_id).subscribe((res:Response)=>{
      node.details = JSON.parse(res.text());
    },(err:any)=>{
    })
  }

  deleteNode(node_id:string){
    this.api.deleteNodeByIdWithDelete(node_id).subscribe((res:Response)=>{
      this.showMessage = true;
      this.message = "Node("+node_id+") was successfully deleted";
    },(err:any)=>{
      this.hasError = true;
      this.errorMessage = JSON.parse(err)["Message"];
    })
  }

}
