import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudianteServicio, Estudiante } from '../../services/estudiante';
import { finalize } from 'rxjs/operators';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [CommonModule, Header, RouterLink, Footer],
  templateUrl: './detalles.html',
  styleUrl: './detalles.css'
})
export class Detalles implements OnInit {

  estudiante?: Estudiante;
  error = false;
  loading = signal(true);

  constructor(
    private route: ActivatedRoute,
    private estudianteServicio: EstudianteServicio,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id || isNaN(id)) {
      this.error = true;
      this.loading.set(false);
      return;
    }

    this.loading.set(true);

    this.estudianteServicio.getEstudiante(id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (data) => {
          this.estudiante = data;
        },
        error: () => {
          this.error = true;
        }
      });
  }

  volver() {
    this.router.navigate(['/lista']);
  }
}
