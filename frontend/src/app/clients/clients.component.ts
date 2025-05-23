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

  constructor(readonly clientService: ClientService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getClients().subscribe(data => this.clients = data);
  }

  addClient() {
    this.clientService.addClient(this.newClient).subscribe(() => {
      this.loadClients();
      this.newClient = { nom: '', email: '', telephone: '' };
    });
  }

  editClient(client: Client) {
    this.editMode = true;
    this.selectedClientId = client.id!;
    this.newClient = { ...client };
  }

  updateClient() {
    if (this.selectedClientId) {
      console.log('Updating client with ID:', this.selectedClientId);
      console.log('Client data:', this.newClient);

      this.clientService.updateClient(this.selectedClientId, this.newClient).subscribe(
        (response) => {
          console.log('Update successful:', response);
          this.loadClients();
          this.editMode = false;
          this.selectedClientId = null;
          this.newClient = { nom: '', email: '', telephone: '' };
        },
        (error) => {
          console.error('Error updating client:', error);
          alert('Erreur lors de la mise à jour du client: ' + (error.message || 'Erreur inconnue'));
        }
      );
    }
  }

  deleteClient(id: number) {
    this.clientService.deleteClient(id).subscribe(() => this.loadClients());
  }

  cancelEdit() {
    this.editMode = false;
    this.selectedClientId = null;
    this.newClient = { nom: '', email: '', telephone: '' };
  }
}
