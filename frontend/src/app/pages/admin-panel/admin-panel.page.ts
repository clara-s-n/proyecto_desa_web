import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './admin-panel.page.html',
  styleUrl: './admin-panel.page.css',
})
export class AdminPanelPage {
  private router: Router = inject(Router);

  goToUserList() {
    this.router.navigate(['admin-panel', 'users']);
  }
  goToPropertyList() {
    this.router.navigate(['/all-properties']);
  }
}