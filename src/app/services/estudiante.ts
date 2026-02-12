import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Estudiante {
  id?: number;
  identificationNumber: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  age?: number;             
  academicProgram?: string;
  enrollmentDate?: string;
}

@Injectable({
  providedIn: 'root',
})
export class EstudianteServicio {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:5004/api/estudiantes';

  getEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.baseUrl);
  }

  getEstudiante(id: number): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${this.baseUrl}/${id}`);
  }

  crearEstudiante(estudiante: Estudiante): Observable<Estudiante> {
    return this.http.post<Estudiante>(this.baseUrl, estudiante);
  }

  actualizarEstudiante(id: number, estudiante: Estudiante): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, estudiante);
  }

  eliminarEstudiante(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
