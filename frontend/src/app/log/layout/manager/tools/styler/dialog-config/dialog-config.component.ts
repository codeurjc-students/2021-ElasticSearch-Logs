import { Component, OnInit } from '@angular/core';
import { ManagerComunicationService } from 'src/app/shared/service/managerComunication.service';

@Component({
    selector: 'app-dialog-config',
    templateUrl: './dialog-config.component.html',
    styleUrls: ['./dialog-config.component.css'],
})
export class DialogConfigComponent implements OnInit {
    public fontSize: keyof {
        small: number;
        normal: number;
        large: number;
    };

    constructor(
        private ManagerComunicationService: ManagerComunicationService
    ) {
        let size: keyof {
            small: number;
            normal: number;
            large: number;
        } = 'normal';

        switch (localStorage.getItem('fontsize')) {
            case 'small':
                size = 'small';
                break;
            case 'normal':
                size = 'normal';
                break;
            case 'large':
                size = 'large';
                break;
            default:
                size = 'normal';
        }

        this.fontSize = size;
    }

    ngOnInit(): void {}

    fontSizeEmit(): void {
        localStorage.setItem('fontsize', this.fontSize);
        localStorage.setItem('rowheight', this.fontSize);
        this.ManagerComunicationService.sendFontSize(this.fontSize);
    }
}
