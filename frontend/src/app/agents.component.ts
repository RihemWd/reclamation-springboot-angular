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

  constructor(readonly agentService: AgentSAVService) {}

  ngOnInit(): void {
    this.loadAgents();
  }

  loadAgents() {
    this.agentService.getAgents().subscribe(data => this.agents = data);
  }

  addAgent() {
    this.agentService.addAgent(this.newAgent).subscribe(() => {
      this.loadAgents();
      this.newAgent = { nom: '', competence: '' };
    });
  }

  editAgent(agent: AgentSAV) {
    this.editMode = true;
    this.selectedAgentId = agent.id!;
    this.newAgent = { ...agent };
  }

  updateAgent() {
    if (this.selectedAgentId) {
      this.agentService.updateAgent(this.selectedAgentId, this.newAgent).subscribe(() => {
        this.loadAgents();
        this.editMode = false;
        this.selectedAgentId = null;
        this.newAgent = { nom: '', competence: '' };
      });
    }
  }

  deleteAgent(id: number) {
    this.agentService.deleteAgent(id).subscribe(() => this.loadAgents());
  }

  cancelEdit() {
    this.editMode = false;
    this.selectedAgentId = null;
    this.newAgent = { nom: '', competence: '' };
  }
}
