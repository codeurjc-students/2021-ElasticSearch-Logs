import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
})
export class TimelineComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  isLoading = false;
  options: EChartsOption = {
    axisPointer: {
      show: true,
      type: 'line',
      label:{
        show:true,
        precision: 0,
      
      },
      
    },
    grid: {
      top: '2%',
      left: '2%',
      right: '1%',
      bottom: '1%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      show: false,
    },
    yAxis: {
      type: 'category',
      splitLine: {
        show: true,
        lineStyle: {
          color: '#a3a3a3',
        }
      },
 
      axisLine: {
        show: false,
        lineStyle: {
          color: '#a3a3a3',
        }
      },
      
      boundaryGap: false,
      data: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
    },
    series: [
      {
        name: 'Time/nº Logs',
        type: 'line',
        symbolSize: 7,
        symbol: 'circle',
        itemStyle: {
          color: '#9b0000'
        },
        smooth: true,
        lineStyle: {
          color: '#d50000',
          width: 3,
          shadowColor: 'rgba(0,0,0,0.3)',
          shadowBlur: 10,
          shadowOffsetY: 8,
        },
        data: [0,150,25,340,40,5,6,170,80,69,180,101,12,143,48,56,16,107,218,419,220,21,202,35,24],
      },
    ],
  };
}
