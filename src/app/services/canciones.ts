import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { Cancion } from '../models/cancion.model';

@Injectable({
  providedIn: 'root',
})
export class CancionesService {
 
  private apiUrl = environment.apiBaseUrl + '/canciones';

  constructor(private http: HttpClient) { }

  getCanciones() {
    return this.http.get<Cancion[]>(this.apiUrl);
  }

  crearCancion(cancion: Cancion) {
    return this.http.post<Cancion>(this.apiUrl, cancion);
  }

  actualizarCancion(id: string, cancion: Cancion) {
    const { _id, ...bodySinId } = cancion;
    return this.http.put(`${this.apiUrl}/${id}`, bodySinId);
  }

  eliminarCancion(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
