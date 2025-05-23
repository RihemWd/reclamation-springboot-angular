import { Component, OnInit } from '@angular/core';
import { SuiviReclamationService, SuiviReclamation } from './suivi-reclamation.service';
import { ReclamationService, Reclamation } from './reclamation.service';
import { AgentSAVService, AgentSAV } from './agent-sav.service';

@Component({
  selector: 'app-suivis',
  templateUrl: './suivis.component.html',
  styleUrls: ['./suivis.component.scss']
})
export class SuivisComponent implements OnInit {
  suivis: SuiviReclamation[] = [];
  reclamations: Reclamation[] = [];
  agents: AgentSAV[] = [];
  newSuivi: any = { date: '', message: '', action: '', reclamation: { id: null }, agent: { id: null } };
  editMode: boolean = false;
  selectedSuiviId: number | null = null;
  showForm: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    readonly suiviService: SuiviReclamationService,
    private reclamationService: ReclamationService,
    private agentService: AgentSAVService
  ) {}

  ngOnInit(): void {
    this.loadSuivis();
    this.reclamationService.getReclamations().subscribe(data => this.reclamations = data);
    this.agentService.getAgents().subscribe(data => this.agents = data);
  }

  loadSuivis() {
    this.suiviService.getSuivis().subscribe(data => this.suivis = data);
  }

  addSuivi() {
    if (!this.newSuivi.date || !this.newSuivi.message || !this.newSuivi.action || !this.newSuivi.reclamation.id || !this.newSuivi.agent.id) {
      this.errorMessage = 'Tous les champs sont obligatoires.';
      this.successMessage = '';
      setTimeout(() => this.errorMessage = '', 2500);
      return;
    }
    const agentId = Number(this.newSuivi.agent.id);
    const agentObj = this.agents.find(a => a.id === agentId);
    const payload = {
      ...this.newSuivi,
      employe: agentObj ? agentObj.nom : '',
      agent: undefined // retire l'objet agent du payload
    };
    this.suiviService.addSuivi(payload).subscribe(() => {
      this.loadSuivis();
      this.newSuivi = { date: '', message: '', action: '', reclamation: { id: null }, agent: { id: null } };
      this.successMessage = 'Suivi ajouté avec succès !';
      this.errorMessage = '';
      setTimeout(() => this.successMessage = '', 2500);
      this.showForm = false;
    });
  }

  editSuivi(suivi: any) {
    this.editMode = true;
    this.selectedSuiviId = suivi.id;
    let dateStr = '';
    if (suivi.date) {
      const d = new Date(suivi.date);
      dateStr = d.toISOString().substring(0, 10);
    }
    // Retrouve l'agent par son nom (employe)
    const agentObj = this.agents.find(a => a.nom === suivi.employe);
    this.newSuivi = {
      date: dateStr,
      message: suivi.message,
      action: suivi.action,
      reclamation: { id: suivi.reclamation && suivi.reclamation.id ? suivi.reclamation.id : null },
      agent: { id: agentObj ? agentObj.id : null },
      employe: suivi.employe || ''
    };
  }

  updateSuivi() {
    if (!this.newSuivi.date || !this.newSuivi.message || !this.newSuivi.action || !this.newSuivi.reclamation.id || !this.newSuivi.agent.id) {
      this.errorMessage = 'Tous les champs sont obligatoires.';
      this.successMessage = '';
      setTimeout(() => this.errorMessage = '', 2500);
      return;
    }
    if (this.selectedSuiviId) {
      const agentId = Number(this.newSuivi.agent.id);
      const agentObj = this.agents.find(a => a.id === agentId);
      const payload = {
        ...this.newSuivi,
        employe: agentObj ? agentObj.nom : '',
        agent: undefined // retire l'objet agent du payload
      };
      this.suiviService.updateSuivi(this.selectedSuiviId, payload).subscribe(() => {
        this.loadSuivis();
        this.successMessage = 'Suivi modifié avec succès !';
        this.errorMessage = '';
        setTimeout(() => this.successMessage = '', 2500);
        this.editMode = false;
        this.selectedSuiviId = null;
        this.newSuivi = { date: '', message: '', action: '', reclamation: { id: null }, agent: { id: null } };
        this.showForm = false;
      });
    }
  }

  deleteSuivi(id: number) {
    this.suiviService.deleteSuivi(id).subscribe({
      next: () => {
        this.loadSuivis();
        this.successMessage = 'Suivi supprimé avec succès !';
        this.errorMessage = '';
        setTimeout(() => this.successMessage = '', 2500);
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la suppression du suivi.';
        this.successMessage = '';
        setTimeout(() => this.errorMessage = '', 2500);
      }
    });
  }

  cancelEdit() {
    this.editMode = false;
    this.selectedSuiviId = null;
    this.newSuivi = { date: '', message: '', action: '', reclamation: { id: null }, agent: { id: null } };
    this.showForm = false;
  }

  getReclamationLabel(reclamationId: number): string {
    const rec = this.reclamations.find(r => r.id === reclamationId);
    return rec ? rec.objet : 'N/A';
  }

  getAgentLabel(agentId: number): string {
    const ag = this.agents.find(a => a.id === agentId);
    return ag ? `${ag.nom} (${ag.competence})` : 'N/A';
  }
}
