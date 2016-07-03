import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "Search"
})

export class SearchPipe implements PipeTransform{
  transform(value:any, args:string[]):any{
    let filter = args[0];
    return filter ? value.filter(user => user.firstName.indexOf(filter)!=-1):value;
  }
}
