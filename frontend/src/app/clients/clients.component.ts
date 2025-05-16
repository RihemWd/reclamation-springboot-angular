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
      this.clientService.updateClient(this.selectedClientId, this.newClient).subscribe(() => {
        this.loadClients();
        this.editMode = false;
        this.selectedClientId = null;
        this.newClient = { nom: '', email: '', telephone: '' };
      });
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
