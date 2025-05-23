import { Component, OnInit } from '@angular/core';
import { AgentSAVService, AgentSAV } from './agent-sav.service';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss']
})
export class AgentsComponent implements OnInit {
  agents: AgentSAV[] = [];
  newAgent: AgentSAV = { nom: '', competence: '' };
  editMode: boolean = false;
  selectedAgentId: number | null = null;
  showForm: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(readonly agentService: AgentSAVService) {}

  ngOnInit(): void {
    this.loadAgents();
  }

  loadAgents() {
    this.agentService.getAgents().subscribe(data => this.agents = data);
  }

  addAgent() {
    if (!this.newAgent.nom || !this.newAgent.competence) {
      this.errorMessage = 'Tous les champs sont obligatoires.';
      this.successMessage = '';
      setTimeout(() => this.errorMessage = '', 2500);
      return;
    }
    this.agentService.addAgent(this.newAgent).subscribe(() => {
      this.loadAgents();
      this.newAgent = { nom: '', competence: '' };
      this.successMessage = 'Agent ajouté avec succès !';
      this.errorMessage = '';
      setTimeout(() => this.successMessage = '', 2500);
      this.showForm = false;
    });
  }

  editAgent(agent: AgentSAV) {
    this.editMode = true;
    this.selectedAgentId = agent.id!;
    this.newAgent = { ...agent };
  }

  updateAgent() {
    if (!this.newAgent.nom || !this.newAgent.competence) {
      this.errorMessage = 'Tous les champs sont obligatoires.';
      this.successMessage = '';
      setTimeout(() => this.errorMessage = '', 2500);
      return;
    }
    if (this.selectedAgentId) {
      this.agentService.updateAgent(this.selectedAgentId, this.newAgent).subscribe(() => {
        this.loadAgents();
        this.successMessage = 'Agent modifié avec succès !';
        this.errorMessage = '';
        setTimeout(() => this.successMessage = '', 2500);
        this.editMode = false;
        this.selectedAgentId = null;
        this.newAgent = { nom: '', competence: '' };
        this.showForm = false;
      });
    }
  }

  deleteAgent(id: number) {
    this.agentService.deleteAgent(id).subscribe({
      next: () => {
        this.loadAgents();
        this.successMessage = 'Agent supprimé avec succès !';
        this.errorMessage = '';
        setTimeout(() => this.successMessage = '', 2500);
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la suppression de l\'agent.';
        this.successMessage = '';
        setTimeout(() => this.errorMessage = '', 2500);
      }
    });
  }

  cancelEdit() {
    this.editMode = false;
    this.selectedAgentId = null;
    this.newAgent = { nom: '', competence: '' };
    this.showForm = false;
  }
}
