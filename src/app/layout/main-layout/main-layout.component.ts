import { Component, HostListener, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlatformService } from '../../../services/platform.service';
import { I18nService, Language } from '../../services/i18n.service';

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
  isLangMenuOpen = false;

  private readonly platform = inject(PlatformService);
  readonly i18n = inject(I18nService);
  currentYear: number = new Date().getFullYear();

  languages = [
    { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'pt' as Language, name: 'Português', flag: '🇧🇷' },
  ];

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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const langButton = target.closest('.lang-selector');
    
    if (!langButton && this.isLangMenuOpen) {
      this.isLangMenuOpen = false;
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

  changeLanguage(lang: Language) {
    this.i18n.setLanguage(lang);
    this.isLangMenuOpen = false;
  }

  get currentLanguage() {
    return this.languages.find(l => l.code === this.i18n.language);
  }
}
