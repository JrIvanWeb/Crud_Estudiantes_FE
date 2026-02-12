import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudianteServicio, Estudiante } from '../../services/estudiante';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, Header, RouterLink, FormsModule, Footer],
  templateUrl: './lista.html',
  styleUrl: './lista.css',
})
export class Lista implements OnInit {

  dataSource: Estudiante[] = [];
  dataFiltrada: Estudiante[] = [];
  estudiantesPaginados: Estudiante[] = [];

  loading = true;
  error = false;

  page = 1;
  pageSize = 5;
  search = '';

  // 🔴 ELIMINAR
  idEliminar: number | null = null;
  modalEliminar: any;

  constructor(
    private estudianteServicio: EstudianteServicio,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.cargar();
    });
  }

  cargar() {
    this.loading = true;
    this.error = false;

    this.estudianteServicio.getEstudiantes().subscribe({
      next: (data) => {
        this.dataSource = data || [];
        this.filtrar();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.error = true;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  recargar() {
    if (!this.loading) {
      this.cargar();
    }
  }

  filtrar() {
    const t = this.search.toLowerCase().trim();

    this.dataFiltrada = this.dataSource.filter(e =>
      e.identificationNumber?.toLowerCase().includes(t) ||
      e.firstName?.toLowerCase().includes(t) ||
      e.lastName?.toLowerCase().includes(t) ||
      e.academicProgram?.toLowerCase().includes(t)
    );

    this.page = 1;
    this.actualizarPaginados();
  }

  actualizarPaginados() {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.estudiantesPaginados = this.dataFiltrada.slice(start, end);
  }

  totalPages(): number {
    return Math.ceil(this.dataFiltrada.length / this.pageSize);
  }

  setPage(p: number) {
    if (p < 1 || p > this.totalPages()) return;
    this.page = p;
    this.actualizarPaginados();
  }

  trackById(index: number, item: Estudiante) {
    return item.id;
  }

  // 🔵 ABRIR MODAL
  abrirModalEliminar(id?: number) {
    if (!id) return;

    this.idEliminar = id;

    const modalEl = document.getElementById('modalEliminar');
    this.modalEliminar = new bootstrap.Modal(modalEl);
    this.modalEliminar.show();
  }

  // CONFIRMAR ELIMINACIÓN
  confirmarEliminar() {
  if (!this.idEliminar) return;

  this.estudianteServicio.eliminarEstudiante(this.idEliminar).subscribe({
    next: () => {
      this.modalEliminar.hide();
      this.idEliminar = null;

      // RECARGA COMPLETA DE LA LISTA
      this.cargar();
    },
    error: (err) => {
      console.error(err);
      alert('Error al eliminar');
      this.modalEliminar.hide();
    }
  });
}

}
