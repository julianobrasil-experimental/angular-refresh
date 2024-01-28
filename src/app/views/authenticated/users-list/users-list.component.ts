import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  HostListener,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import {
  UsersListComponentData,
  UsersListComponentService,
} from './users-list-component.service';
import { User } from '../../../models/user.type';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  standalone: true,
  imports: [RouterLink, MatProgressSpinnerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-users-list'
  },
})
export class UsersListComponent {
  users = input<User[]>([]);
  showSpinner = input(false);
}
