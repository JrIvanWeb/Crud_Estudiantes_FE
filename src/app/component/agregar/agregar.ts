import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { EstudianteServicio, Estudiante } from '../../services/estudiante';
import { Header } from '../header/header';

declare var bootstrap: any;

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Header
  ],
  templateUrl: './agregar.html',
  styleUrl: './agregar.css'
})
export class Agregar {

  estudiante: Estudiante = {
    identificationNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    academicProgram: '',
    enrollmentDate: ''
  };

  guardando = false;
  enviado = false;

  constructor(
    private estudianteServicio: EstudianteServicio,
    private router: Router
  ) { }

  guardar() {
    this.enviado = true;

    if (
      !this.estudiante.identificationNumber ||
      !this.estudiante.firstName ||
      !this.estudiante.lastName ||
      !this.estudiante.email ||
      !this.estudiante.phoneNumber ||
      !this.estudiante.academicProgram
    ) {
      return;
    }

    this.guardando = true;

    const payload: Estudiante = {
      ...this.estudiante,
      enrollmentDate: new Date().toISOString()
    };

    this.estudianteServicio.crearEstudiante(payload).subscribe({
      next: () => {
        this.guardando = false;

        const modal = new bootstrap.Modal(
          document.getElementById('modalExito'),
          { backdrop: 'static', keyboard: false }
        );

        modal.show();
      }
      ,
      error: (err) => {
        console.error(err);
        this.guardando = false;
      }
    });
  }

  cancelar() {
    this.router.navigate(['/lista']);
  }
  irALista() {
  const modalElement = document.getElementById('modalExito');
  const modalInstance = bootstrap.Modal.getInstance(modalElement);

  if (modalInstance) {
    modalInstance.hide();
  }

  document.body.classList.remove('modal-open');

  const backdrops = document.getElementsByClassName('modal-backdrop');
  while (backdrops.length > 0) {
    backdrops[0].remove();
  }

  this.router.navigate(['/lista']);
}

}
