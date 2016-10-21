import {Component} from "@angular/core";

@Component({
  selector: "radar-chart",
  template: require('./radar.chart.component.html'),
  inputs:["radarChartData", "radarChartLabels"]
})

export class RadarChartComponent{
  public radarChartOptions:any = {
    animation: false,
    responsive: true
  };
  public radarChartColours:Array<any> = [
    { // pink
      backgroundColor: 'rgba(233,30,99,0.2)',
      borderColor: 'rgba(233,30,99,1)',
      pointBackgroundColor: 'rgba(233,30,99,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(233,30,99,0.8)'
    },
    { // blue
      backgroundColor: 'rgba(33,150,243,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(33,150,243,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(33,150,243,1)'
    },
    { // yellow
      backgroundColor: 'rgba(255,235,59,0.2)',
      borderColor: 'rgba(255,235,59,1)',
      pointBackgroundColor: 'rgba(255,235,59,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,235,59,0.8)'
    },
    { // green
      backgroundColor: 'rgba(0,230,118,0.2)',
      borderColor: 'rgba(0,230,118,1)',
      pointBackgroundColor: 'rgba(0,230,118,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0,230,118,0.8)'
    },
    { // purple
      backgroundColor: 'rgba(123,31,162,0.2)',
      borderColor: 'rgba(123,31,162,1)',
      pointBackgroundColor: 'rgba(123,31,162,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(123,31,162,0.8)'
    }
  ];
  public radarChartType:string = 'radar';


  public chartClicked(e:any):void {
  }

  public chartHovered(e:any):void {
  }

}


