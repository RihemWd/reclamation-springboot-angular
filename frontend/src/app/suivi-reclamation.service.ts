import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SuiviReclamation {
  id?: number;
  date: string;
  commentaire: string;
  reclamationId: number;
  agentId: number;
}

@Injectable({ providedIn: 'root' })
export class SuiviReclamationService {
  private apiUrl = 'http://localhost:8080/api/suivis';

  constructor(private http: HttpClient) {}

  getSuivis(): Observable<SuiviReclamation[]> {
    return this.http.get<SuiviReclamation[]>(this.apiUrl);
  }

  addSuivi(suivi: SuiviReclamation): Observable<SuiviReclamation> {
    return this.http.post<SuiviReclamation>(this.apiUrl, suivi);
  }

  updateSuivi(id: number, suivi: SuiviReclamation): Observable<SuiviReclamation> {
    return this.http.put<SuiviReclamation>(`${this.apiUrl}/${id}`, suivi);
  }

  deleteSuivi(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
