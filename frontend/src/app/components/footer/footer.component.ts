import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="footer-content">
        <p>🥗 VeggieSwipe - Finde dein perfektes Rezept</p>
        <p class="footer-links">
          <a href="#">Datenschutz</a> |
          <a href="#">Impressum</a> |
          <a href="#">Kontakt</a>
        </p>
        <p class="copyright">© 2024 VeggieSwipe. Alle Rechte vorbehalten.</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: #1a1a1a;
      color: #aaa;
      padding: 24px 16px;
      margin-top: auto;
    }
    
    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      text-align: center;
    }
    
    .footer p {
      margin: 8px 0;
    }
    
    .footer-links a {
      color: #4caf50;
      text-decoration: none;
      margin: 0 8px;
    }
    
    .footer-links a:hover {
      text-decoration: underline;
    }
    
    .copyright {
      font-size: 0.85rem;
      opacity: 0.7;
    }
  `]
})
export class FooterComponent {}
