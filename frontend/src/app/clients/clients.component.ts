import { Component, OnInit } from '@angular/core';
import { ClientService, Client } from '../client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  newClient: Client = { nom: '', email: '', telephone: '' };
  editMode: boolean = false;
  selectedClientId: number | null = null;
  showForm: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(readonly clientService: ClientService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getClients().subscribe(data => this.clients = data);
  }

  addClient() {
    if (!this.newClient.nom || !this.newClient.email || !this.newClient.telephone) {
      this.errorMessage = 'Tous les champs sont obligatoires.';
      this.successMessage = '';
      setTimeout(() => this.errorMessage = '', 2500);
      return;
    }
    this.clientService.addClient(this.newClient).subscribe(() => {
      this.loadClients();
      this.newClient = { nom: '', email: '', telephone: '' };
      this.successMessage = 'Client ajouté avec succès !';
      this.errorMessage = '';
      setTimeout(() => this.successMessage = '', 2500);
      this.showForm = false;
    });
  }

  editClient(client: Client) {
    this.editMode = true;
    this.selectedClientId = client.id!;
    this.newClient = { ...client };
  }

  updateClient() {
    if (!this.newClient.nom || !this.newClient.email || !this.newClient.telephone) {
      this.errorMessage = 'Tous les champs sont obligatoires.';
      this.successMessage = '';
      setTimeout(() => this.errorMessage = '', 2500);
      return;
    }
    if (this.selectedClientId) {
      console.log('Updating client with ID:', this.selectedClientId);
      console.log('Client data:', this.newClient);

      this.clientService.updateClient(this.selectedClientId, this.newClient).subscribe(
        (response) => {
          console.log('Update successful:', response);
          this.loadClients();
          this.successMessage = 'Client modifié avec succès !';
          this.errorMessage = '';
          setTimeout(() => this.successMessage = '', 2500);
          this.editMode = false;
          this.selectedClientId = null;
          this.newClient = { nom: '', email: '', telephone: '' };
          this.showForm = false;
        },
        (error) => {
          console.error('Error updating client:', error);
          this.errorMessage = 'Erreur lors de la mise à jour du client.';
          this.successMessage = '';
          setTimeout(() => this.errorMessage = '', 2500);
        }
      );
    }
  }

  deleteClient(id: number) {
    this.clientService.deleteClient(id).subscribe({
      next: () => {
        this.loadClients();
        this.successMessage = 'Client supprimé avec succès !';
        this.errorMessage = '';
        setTimeout(() => this.successMessage = '', 2500);
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la suppression du client.';
        this.successMessage = '';
        setTimeout(() => this.errorMessage = '', 2500);
      }
    });
  }

  cancelEdit() {
    this.editMode = false;
    this.selectedClientId = null;
    this.newClient = { nom: '', email: '', telephone: '' };
    this.showForm = false;
  }
}
