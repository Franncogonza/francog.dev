import { Component, HostListener, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlatformService } from '../../../services/platform.service';

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
  isDarkMode = false;

  private readonly platform = inject(PlatformService);
  currentYear: number = new Date().getFullYear();

  ngOnInit() {
    if (this.platform.isBrowser()) {
      this.checkScreenSize();
    }
  }

  @HostListener('window:resize')
  checkScreenSize() {
    if (this.platform.isBrowser()) {
      this.screenIsMobile = window.innerWidth < 640;
      if (!this.screenIsMobile) {
        this.isMenuOpen = false;
      }
    }
  }

  toggleDarkMode() {
    if (this.platform.isBrowser()) {
      this.isDarkMode = !this.isDarkMode;
      const html = document.documentElement;
      if (this.isDarkMode) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
