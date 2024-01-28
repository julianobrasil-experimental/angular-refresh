import { Component, ViewEncapsulation, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { debounceTime } from 'rxjs/operators';

import { UsersStoreService } from './data/store/users-store.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-root'
  }
})
export class AppComponent {
  usersStoreService = inject(UsersStoreService);

  router = inject(Router);

  title = 'refresh';

  constructor() {
    this.router.events.pipe(debounceTime(500)).subscribe(evt => {
      if (evt instanceof NavigationStart) {
        this.usersStoreService.setLoadingStatus(true);
      } else if (evt instanceof NavigationEnd || evt instanceof NavigationCancel) {
        this.usersStoreService.setLoadingStatus(false);
      }
    })
  }
}
