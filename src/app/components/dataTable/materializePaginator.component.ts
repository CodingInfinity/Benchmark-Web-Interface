import {Component, Input, OnChanges} from "@angular/core";

import {DataTable} from "angular2-datatable/datatable";
import * as _ from "lodash"

@Component({
  selector: "mfMaterializePaginator",
  template: require('./materializePaginator.component.html'),
})
export class MaterializePaginator implements OnChanges {
  @Input("rowsOnPageSet") private rowsOnPageSet = [];
  @Input("mfTable") private mfTable: DataTable;

  private minRowsOnPage = 0;

  ngOnChanges(changes:any):any {
    if(changes.rowsOnPageSet) {
      this.minRowsOnPage = _.min(this.rowsOnPageSet)
    }
  }
}
