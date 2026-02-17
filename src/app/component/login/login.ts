import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, Footer, Header],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginData = {
    email: '',
    password: ''
  };

  constructor(private router: Router) {}

  login(): void {
    console.log('Login:', this.loginData);
    // Aquí luego llamas a tu API
    this.router.navigate(['/dashboard']);
  }

  solicitarHojaVida(): void {
    console.log('Solicitar hoja de vida');
  }
}
