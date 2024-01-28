import { ChangeDetectionStrategy, Component, ViewEncapsulation, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-users-list-routing',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, RouterLink, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatButtonModule],
  encapsulation: ViewEncapsulation.None,
  styles: `
.app-users-list-routing {
  display: flex;
  flex-direction: column;

  height: 100vh;

  .sidenav-container {
    flex: 1;
  }
}
  `,
  host: {
    class: 'app-users-list-routing'
  },
  template: `
<mat-toolbar color="primary">
  <button mat-icon-button (click)="toggleSidenav()">
    <mat-icon>menu</mat-icon>
  </button>
  <span>Angular Refresh</span>
</mat-toolbar>
<mat-sidenav-container class="sidenav-container">
  <mat-sidenav mode="side" [opened]="sidenavOpened()">
    <mat-nav-list>
      <a mat-list-item [routerLink]="['/', 'users']">Users</a>
    </mat-nav-list>
  </mat-sidenav>
  <mat-sidenav-content>
    <router-outlet/> 
  </mat-sidenav-content>
</mat-sidenav-container>
  `,
})
export class AuthenticatedRoutingComponent {
  sidenavOpened = signal(false);

  toggleSidenav() {
    this.sidenavOpened.update(v => !v);
  }
}
