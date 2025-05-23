import { Component, OnInit } from '@angular/core';
import { SuiviReclamationService, SuiviReclamation } from './suivi-reclamation.service';

@Component({
  selector: 'app-suivis',
  templateUrl: './suivis.component.html',
  styleUrls: ['./suivis.component.scss']
})
export class SuivisComponent implements OnInit {
  suivis: SuiviReclamation[] = [];
  newSuivi: SuiviReclamation = { date: '', commentaire: '', reclamationId: 0, agentId: 0 };
  editMode: boolean = false;
  selectedSuiviId: number | null = null;

  constructor(readonly suiviService: SuiviReclamationService) {}

  ngOnInit(): void {
    this.loadSuivis();
  }

  loadSuivis() {
    this.suiviService.getSuivis().subscribe(data => this.suivis = data);
  }

  addSuivi() {
    this.suiviService.addSuivi(this.newSuivi).subscribe(() => {
      this.loadSuivis();
      this.newSuivi = { date: '', commentaire: '', reclamationId: 0, agentId: 0 };
    });
  }

  editSuivi(suivi: SuiviReclamation) {
    this.editMode = true;
    this.selectedSuiviId = suivi.id!;
    this.newSuivi = { ...suivi };
  }

  updateSuivi() {
    if (this.selectedSuiviId) {
      this.suiviService.updateSuivi(this.selectedSuiviId, this.newSuivi).subscribe(() => {
        this.loadSuivis();
        this.editMode = false;
        this.selectedSuiviId = null;
        this.newSuivi = { date: '', commentaire: '', reclamationId: 0, agentId: 0 };
      });
    }
  }

  deleteSuivi(id: number) {
    this.suiviService.deleteSuivi(id).subscribe(() => this.loadSuivis());
  }

  cancelEdit() {
    this.editMode = false;
    this.selectedSuiviId = null;
    this.newSuivi = { date: '', commentaire: '', reclamationId: 0, agentId: 0 };
  }
}
