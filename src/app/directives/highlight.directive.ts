import {ElementRef, Directive, ViewChild} from "@angular/core";
declare var hljs: any;
@Directive({
  selector: '[highlight]'
})
export class HighlightCodeDirective {
  constructor(private eltRef:ElementRef) {
  }

  ngAfterViewInit() {
    console.log(hljs);
    //hljs.highlightBlock(this.eltRef.nativeElement);
  }
}
