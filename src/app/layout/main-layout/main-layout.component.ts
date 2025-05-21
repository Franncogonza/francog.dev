import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-main-layout',
  imports: [RouterModule, CommonModule],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
  isMenuOpen = false;
  screenIsMobile = false;

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.screenIsMobile = window.innerWidth < 640;
    if (!this.screenIsMobile) {
      this.isMenuOpen = false;
    }
  }
}
