import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { ManagerComunicationService } from '../shared/service/managerComunication.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
})
export class TimelineComponent implements OnInit {
  constructor(private managerComunicationService: ManagerComunicationService) {}

  ngOnInit(): void {}

  indices = [
    '2022-03-07',
    '2022-03-06',
    '2022-03-05',
    '2022-03-04',
    '2022-03-03',
    '2022-03-02',
    '2022-03-01',
  ];

  selected = this.indices[0];

  isLoading = false;
  options: EChartsOption = {
    axisPointer: {
      show: true,
      type: 'line',
      label: {
        show: true,
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
        },
      },

      axisLine: {
        show: false,
        lineStyle: {
          color: '#a3a3a3',
        },
      },

      boundaryGap: false,
      data: [
        '00:00',
        '01:00',
        '02:00',
        '03:00',
        '04:00',
        '05:00',
        '06:00',
        '07:00',
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        '23:00',
        '24:00',
      ].reverse(),
    },
    series: [
      {
        name: 'Time/nº Logs',
        type: 'line',
        symbolSize: 7,
        symbol: 'circle',
        itemStyle: {
          color: '#9b0000',
        },
        smooth: true,
        lineStyle: {
          color: '#d50000',
          width: 3,
          shadowColor: 'rgba(0,0,0,0.3)',
          shadowBlur: 10,
          shadowOffsetY: 8,
        },
        data: [
          0, 150, 25, 340, 40, 5, 6, 170, 80, 69, 180, 101, 12, 143, 48, 56, 16,
          107, 218, 419, 220, 21, 202, 35, 24,
        ],
      },
    ],
  };

  onChartClick(event: any) {
    const from = this.selected + 'T' + event.name + ':00.000+01:00';
    const to = this.selected + 'T' + '23:59:59.999+01:00';
    this.managerComunicationService.sendRangeFilters([from, to]);
  }
}
