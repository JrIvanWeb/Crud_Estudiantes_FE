import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {

  searchText: string = '';

  constructor(private router: Router) {}

  onSearch() {
    if (!this.searchText.trim()) return;
    console.log('Buscando:', this.searchText);

    // Ejemplo de navegación
    // this.router.navigate(['/buscar'], { queryParams: { q: this.searchText } });
  }

  onStart() {
    console.log('Empezar clickeado');

    // Ejemplo: ir al login o dashboard
    // this.router.navigate(['/login']);
  }
}
