import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit {
  readonly i18n = inject(I18nService);
  
  constructor(private readonly seo: SeoService) {}

  ngOnInit(): void {
    this.seo.setAboutPage();
  }
}
