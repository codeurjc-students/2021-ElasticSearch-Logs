import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ManagerComunicationService } from 'src/app/shared/service/managerComunication.service';

@Component({
    selector: 'app-time-shortcuts',
    templateUrl: './time-shortcuts.component.html',
    styleUrls: ['./time-shortcuts.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class TimeShortcutsComponent implements OnInit {
    public date: Date = new Date();

    public range = new FormGroup({
        startDate: new FormControl(),
        endDate: new FormControl(),
        startTime: new FormControl('00:00'),
        endTime: new FormControl('00:00'),
    });

    public shortcuts = [
        {
            id: 'today',
            name: 'Today',
            date: new Date().setDate(this.date.getDate()),
        },
        {
            id: 'min30',
            name: '30 minutes ago',
            date: new Date().setMinutes(this.date.getMinutes() - 30),
        },
        {
            id: 'hour1',
            name: '1 hour ago',
            date: new Date().setHours(this.date.getHours() - 1),
        },
        {
            id: 'hour6',
            name: '6 hours ago',
            date: new Date().setHours(this.date.getHours() - 6),
        },
        {
            id: 'day1',
            name: '1 day ago',
            date: new Date().setDate(this.date.getDate() - 1),
        },
        {
            id: 'week1',
            name: '1 week ago',
            date: new Date().setDate(this.date.getDate() - 7),
        },
    ];

    constructor(
        private managerComunicationService: ManagerComunicationService
    ) {}

    ngOnInit(): void {}

    onFormCall() {
        const from = this.buildDate(
            this.range.value.startDate,
            this.range.value.startTime
        );

        const to = this.buildDate(
            this.range.value.endDate,
            this.range.value.endTime
        );

        this.managerComunicationService.sendRangeFilters([from, to]);
    }

    onShorcutCall(dateNumber: number, name: string) {
        let from;
        let to;
        if (name === 'Today') {
            from =
                new Date(dateNumber).toISOString().substring(0, 10) +
                'T00:00:00.000+00:00';
            to =
                new Date(dateNumber).toISOString().substring(0, 10) +
                'T23:59:59.999+00:00';
        } else {
            from = new Date(dateNumber)
                .toISOString()
                .replace('Z', '+00:00');
            to = new Date().toISOString().replace('Z', '+00:00');
        }
        this.managerComunicationService.sendRangeFilters([from, to]);
    }

    private buildDate(dateValue: Date, timeValue: any): string {
        const date = new Date(dateValue);
        date.setHours(timeValue.slice(0, 2), timeValue.slice(3, 5));
        return date.toISOString().replace('Z', '+00:00');
    }
}
