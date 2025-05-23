import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AgentSAV {
  id?: number;
  nom: string;
  competence: string;
}

@Injectable({ providedIn: 'root' })
export class AgentSAVService {
  private apiUrl = 'http://localhost:8080/api/agentsav';

  constructor(private http: HttpClient) {}

  getAgents(): Observable<AgentSAV[]> {
    return this.http.get<AgentSAV[]>(this.apiUrl);
  }

  addAgent(agent: AgentSAV): Observable<AgentSAV> {
    return this.http.post<AgentSAV>(this.apiUrl, agent);
  }

  updateAgent(id: number, agent: AgentSAV): Observable<AgentSAV> {
    return this.http.put<AgentSAV>(`${this.apiUrl}/${id}`, agent);
  }

  deleteAgent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
