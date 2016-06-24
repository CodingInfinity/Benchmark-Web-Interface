export class BaseComponent{
  protected errorMessage: string;
  protected hasError: boolean;

  constructor(){
    this.hasError = false;
    this.errorMessage = "";
  }
}
