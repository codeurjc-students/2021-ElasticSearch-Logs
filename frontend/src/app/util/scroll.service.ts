import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  // Size of the page
  private pageSize: number;

  // Page number
  public page: number;

  // Pixel row height
  private rowHeight: number;

  // Pixel to increment on scrolling
  public pixelIncrement: number;

  // Actual pixel
  public breakpointPixel: number = 5000;

  constructor() {
    this.page = 0;
    this.pageSize = 100;
    this.rowHeight = 100;
    this.breakpointPixel = this.calculateBreakpoint(
      this.pageSize,
      this.rowHeight
    );
    this.pixelIncrement = this.calculateIncrement(
      this.pageSize,
      this.rowHeight
    );
  }

  private calculateBreakpoint(pageSize: number, rowHeight: number): number {
    return (pageSize - pageSize / 4) * rowHeight;
  }

  private calculateIncrement(pageSize: number, rowHeight: number): number {
    return pageSize * rowHeight;
  }

  public recalculate(): void {
    this.breakpointPixel = this.calculateBreakpoint(
      this.pageSize,
      this.rowHeight
    );
    this.pixelIncrement = this.calculateIncrement(
      this.pageSize,
      this.rowHeight
    );
  }

  public increment(): void {
    this.breakpointPixel += this.pixelIncrement;
  }

  public nextPage(): void {
    this.page++;
  }

  public resetPage(): void {
    this.page = 0;
  }
}
