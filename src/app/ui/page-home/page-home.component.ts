import { Component } from '@angular/core';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrl: './page-home.component.css'
})
export class PageHomeComponent {
  amigos: any[] = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 }
  ];

  agregarAmigo() {
    const nuevoAmigo = { id: this.amigos.length + 1 };
    this.amigos.push(nuevoAmigo);
  }
}
