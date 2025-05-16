import { Component, OnInit } from '@angular/core';
import { ReclamationService, Reclamation } from './reclamation.service';

@Component({
  selector: 'app-reclamations',
  templateUrl: './reclamations.component.html',
  styleUrls: ['./reclamations.component.scss']
})
export class ReclamationsComponent implements OnInit {
  reclamations: Reclamation[] = [];
  newReclamation: Reclamation = { objet: '', description: '', statut: '', clientId: 0 };
  editMode: boolean = false;
  selectedReclamationId: number | null = null;

  constructor(readonly reclamationService: ReclamationService) {}

  ngOnInit(): void {
    this.loadReclamations();
  }

  loadReclamations() {
    this.reclamationService.getReclamations().subscribe(data => this.reclamations = data);
  }

  addReclamation() {
    this.reclamationService.addReclamation(this.newReclamation).subscribe(() => {
      this.loadReclamations();
      this.newReclamation = { objet: '', description: '', statut: '', clientId: 0 };
    });
  }

  editReclamation(reclamation: Reclamation) {
    this.editMode = true;
    this.selectedReclamationId = reclamation.id!;
    this.newReclamation = { ...reclamation };
  }

  updateReclamation() {
    if (this.selectedReclamationId) {
      this.reclamationService.updateReclamation(this.selectedReclamationId, this.newReclamation).subscribe(() => {
        this.loadReclamations();
        this.editMode = false;
        this.selectedReclamationId = null;
        this.newReclamation = { objet: '', description: '', statut: '', clientId: 0 };
      });
    }
  }

  deleteReclamation(id: number) {
    this.reclamationService.deleteReclamation(id).subscribe(() => this.loadReclamations());
  }

  cancelEdit() {
    this.editMode = false;
    this.selectedReclamationId = null;
    this.newReclamation = { objet: '', description: '', statut: '', clientId: 0 };
  }
}
