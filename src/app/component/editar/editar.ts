import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Footer } from '../footer/footer';
import { EstudianteServicio, Estudiante } from '../../services/estudiante';
import { Header } from '../header/header';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Header, Footer
  ],
  templateUrl: './editar.html',
  styleUrl: './editar.css',
})
export class Editar implements OnInit {

  estudiante?: Estudiante;

  loading = signal(true);
  error = false;

  enviado = false;
  guardando = false;

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

    this.estudianteServicio.getEstudiante(id).subscribe({
      next: (data) => {
        this.estudiante = data;
      },
      error: () => {
        this.error = true;
      },
      complete: () => {
        this.loading.set(false);
      }
    });
  }

  guardar() {
    this.enviado = true;

    if (!this.estudiante?.id) return;

    this.guardando = true;

    this.estudianteServicio
      .actualizarEstudiante(this.estudiante.id, this.estudiante)
      .subscribe({
        next: () => {
          this.router.navigate(['/lista']);
        },
        error: () => {
          alert('Error al actualizar el estudiante');
          this.guardando = false;
        }
      });
  }

  volver() {
    this.router.navigate(['/lista']);
  }
}
