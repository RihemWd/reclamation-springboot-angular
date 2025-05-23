import { Component, OnInit } from '@angular/core';
import { ReclamationService, Reclamation } from './reclamation.service';
import { ClientService, Client } from './client.service';

@Component({
  selector: 'app-reclamations',
  templateUrl: './reclamations.component.html',
  styleUrls: ['./reclamations.component.scss']
})
export class ReclamationsComponent implements OnInit {
  reclamations: Reclamation[] = [];
  clients: Client[] = [];
  newReclamation: any = {
    objet: '',
    produit: '',
    description: '',
    statut: '',
    date: '',
    note: 1,
    client: { id: null }
  };
  editMode: boolean = false;
  selectedReclamationId: number | null = null;
  showForm: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    readonly reclamationService: ReclamationService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.loadReclamations();
    this.clientService.getClients().subscribe(data => this.clients = data);
  }

  loadReclamations() {
    this.reclamationService.getReclamations().subscribe(data => this.reclamations = data);
  }

  addReclamation() {
    if (!this.newReclamation.objet || !this.newReclamation.produit || !this.newReclamation.description || !this.newReclamation.statut || !this.newReclamation.date || !this.newReclamation.note || !this.newReclamation.client.id) {
      this.errorMessage = 'Tous les champs sont obligatoires.';
      this.successMessage = '';
      setTimeout(() => this.errorMessage = '', 2500);
      return;
    }
    // Correction : le client doit être un objet {id: ...}
    this.reclamationService.addReclamation(this.newReclamation).subscribe(() => {
      this.loadReclamations();
      this.newReclamation = {
        objet: '',
        produit: '',
        description: '',
        statut: '',
        date: '',
        note: 1,
        client: { id: null }
      };
      this.successMessage = 'Réclamation ajoutée avec succès !';
      this.errorMessage = '';
      setTimeout(() => this.successMessage = '', 2500);
      this.showForm = false;
    });
  }

  editReclamation(reclamation: Reclamation) {
    this.editMode = true;
    this.selectedReclamationId = reclamation.id!;
    // Conversion de la date pour le champ input type="date"
    let dateStr = '';
    if (reclamation.date) {
      const d = new Date(reclamation.date);
      dateStr = d.toISOString().substring(0, 10);
    }
    this.newReclamation = {
      objet: reclamation.objet,
      produit: reclamation.produit,
      description: reclamation.description,
      statut: reclamation.statut,
      date: dateStr,
      note: reclamation.note,
      client: { id: reclamation.client && reclamation.client.id ? reclamation.client.id : null }
    };

  }

  updateReclamation() {
    if (!this.newReclamation.objet || !this.newReclamation.produit || !this.newReclamation.description || !this.newReclamation.statut || !this.newReclamation.date || !this.newReclamation.note || !this.newReclamation.client.id) {
      this.errorMessage = 'Tous les champs sont obligatoires.';
      this.successMessage = '';
      setTimeout(() => this.errorMessage = '', 2500);
      return;
    }
    if (this.selectedReclamationId) {
      this.reclamationService.updateReclamation(this.selectedReclamationId, this.newReclamation).subscribe(() => {
        this.loadReclamations();
        this.successMessage = 'Réclamation modifiée avec succès !';
        this.errorMessage = '';
        setTimeout(() => this.successMessage = '', 2500);
        this.editMode = false;
        this.selectedReclamationId = null;
        this.newReclamation = {
          objet: '',
          produit: '',
          description: '',
          statut: '',
          date: '',
          note: 1,
          client: { id: null }
        };
        this.showForm = false;
      });
    }
  }

  deleteReclamation(id: number) {
    this.reclamationService.deleteReclamation(id).subscribe({
      next: () => {
        this.loadReclamations();
        this.successMessage = 'Réclamation supprimée avec succès !';
        this.errorMessage = '';
        setTimeout(() => this.successMessage = '', 2500);
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la suppression de la réclamation.';
        this.successMessage = '';
        setTimeout(() => this.errorMessage = '', 2500);
      }
    });
  }

  cancelEdit() {
    this.editMode = false;
    this.selectedReclamationId = null;
    this.newReclamation = {
      objet: '',
      produit: '',
      description: '',
      statut: '',
      date: '',
      note: 1,
      client: { id: null }
    };
    this.showForm = false;
  }

  getClientName(clientId: number): string {
    const client = this.clients.find(c => c.id === clientId);
    return client ? client.nom : 'N/A';
  }
}
