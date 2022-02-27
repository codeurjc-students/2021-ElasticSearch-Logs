import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfigComponent } from './dialog-config/dialog-config.component';

@Component({
  selector: 'app-styler',
  templateUrl: './styler.component.html',
  styleUrls: ['./styler.component.css'],
})
export class StylerComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(DialogConfigComponent);
  }
}
