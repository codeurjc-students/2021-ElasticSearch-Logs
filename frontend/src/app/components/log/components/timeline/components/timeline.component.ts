import { Component, ElementRef, OnInit } from '@angular/core';
import { EChartsOption, EChartsType } from 'echarts';
import { ManagerComunicationService } from '../../../shared/service/managerComunication.service';
import { TimeLineService } from './timeline.service';

@Component({
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {
    echartsInstance: EChartsType | any;
    indices: string[];
    selected: string;
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
            right: '5%',
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
            data: [],
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
                data: [],
            },
        ],
    };

    constructor(
        private managerComunicationService: ManagerComunicationService,
        private timelineService: TimeLineService
    ) {
        this.indices = [];
        this.selected = '';
    }

    ngOnInit(): void {}

    onChartClick(event: any) {
        const from = this.selected + 'T' + event.name + ':00.000+01:00';
        const to = this.selected + 'T' + '23:59:59.999+01:00';
        this.managerComunicationService.sendRangeFilters([from, to]);
    }

    onChartInit(event: EChartsType) {
        this.echartsInstance = event;
        this.timelineService.getIndices().subscribe({
            next: (data) => {
                this.indices = data;
                this.selected = data[data.length - 1];
                this.updateDataSeries(this.selected);
            },
            error: (data) => console.error(data),
        });
    }

    onSelect() {
        this.updateDataSeries(this.selected);
    }

    private updateDataSeries(index: string) {
        this.timelineService.getLogsCountPerHour(this.selected).subscribe({
            next: (data) => {
                const hours = data.map((c) => c.hour).reverse();
                const counts = data.map((c) => c.count).reverse();

                this.echartsInstance.setOption({
                    yAxis: {
                        data: hours,
                    },
                    series: {
                        data: counts,
                    },
                });
            },
            error: (error) => {
                console.log(error);
            },
        });
    }
}
