import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { PORTFOLIO_PROJECTS } from '../../../mocks/portfolio.data';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent implements OnInit {
  projects = PORTFOLIO_PROJECTS;

  constructor(private readonly seo: SeoService) {}

  ngOnInit(): void {
    this.seo.setPortfolioPage();
  }
}
