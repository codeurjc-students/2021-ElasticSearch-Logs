import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayerComponent } from './displayer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [DisplayerComponent],
  exports: [DisplayerComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatChipsModule,
  ],
})
export class DisplayerModule {}
