import {ElementRef, Directive, ViewChild} from "@angular/core";
declare var hljs: any;
@Directive({
  selector: '[highlight]'
})
export class HighlightCodeDirective {
  constructor(private eltRef:ElementRef) {
  }

  ngAfterViewInit() {
    hljs.highlightBlock(this.eltRef.nativeElement);
  }
}
