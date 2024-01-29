import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, computed, inject, input } from '@angular/core';
import { UserDetailsComponent } from './user-details.component';
import { ActivatedRouteSnapshot, } from '@angular/router';
import { UsersStoreService } from '../../../data/store/users-store.service';

@Component({
    selector: 'app-user-details-container',
    imports: [UserDetailsComponent],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <app-user-details [value]="formData()"/>
    `
})

export class UserDetailsContainerComponent {
    usersStore = inject(UsersStoreService);

    // There is bound to route path params
    email = input();

    formData = computed(() => this.usersStore.users().find(v => v.email === this.email()));
}