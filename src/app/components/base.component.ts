export class BaseComponent{
  protected errorMessage: string;
  protected hasError: boolean;

  protected message: string;
  protected showMessage: boolean;

  constructor(){
    this.hasError = false;
    this.errorMessage = "";
    this.message = "";
    this.showMessage = false;
  }
}
