import { Component, OnInit } from '@angular/core';
import { Cancion } from '../models/cancion.model';
import { CancionesService } from '../services/canciones';

@Component({
  selector: 'app-canciones',
  standalone: false,
  templateUrl: './app-canciones.html',
  styleUrl: './app-canciones.css',
})
export class AppCanciones implements OnInit {

    canciones: Cancion[] = [];
    cancion: Cancion = { nombre: '', artista: '', duracion: '', anio: 1, reproducciones: '' };
  
    editando = false;
    idEditando: string | null = null;
    cargando = false;
  
    constructor(private cancionService: CancionesService) { }
  
    ngOnInit(): void {
      this.obtenerCanciones();
    }
  
    obtenerCanciones() {
      this.cancionService.getCanciones().subscribe(data => {
        this.canciones = data;
      })
    }
  
    guardarCanciones() {
      if (this.cargando) return;
  
      if (!this.cancion.nombre.trim() ||
        !this.cancion.artista.trim() ||
        !this.cancion.duracion.trim() ||
        !this.cancion.reproducciones.trim()) {
        alert('Completa todos los campos antes de guardar');
        return;
      }
  
      this.cargando = true;
  
      if (this.editando) {
        this.cancionService.actualizarCancion(this.idEditando!, this.cancion).subscribe(() => {
          this.cargando = false;
          this.resetForm();
          this.obtenerCanciones();
        });
      } else {
        this.cancionService.crearCancion(this.cancion).subscribe(() => {
          this.cargando = false;
          this.resetForm();
          this.obtenerCanciones();
        });
      }
    }
  
  
    editarCancion(cancion: Cancion) {
      if (!confirm('¿Está seeguro de editar?')) return;

      if (this.cargando) return;
  
      this.editando = true;
      this.idEditando = cancion._id ?? null;
      this.cancion = { ...cancion };
    }
  
    eliminarCancion(id: string | undefined) {
      if (!confirm('¿Está seeguro de eliminar?')) return;
      if (!id || this.cargando) return;
  
      this.cargando = true;
  
      this.cancionService.eliminarCancion(id).subscribe(() => {
        this.cargando = false;
        this.obtenerCanciones();
      });
    }
  
    resetForm() {
      this.cancion = { nombre: '', artista: '', duracion: '', anio: 1, reproducciones: '' };
      this.editando = false;
      this.idEditando = null;
    }
  
    recargarPagina() {
      window.location.href = "http://localhost:4200/";
    }
}
