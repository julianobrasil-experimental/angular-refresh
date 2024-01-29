import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { UsersListComponent } from "./users-list.component";
import { UsersStoreService } from "../../../data/store/users-store.service";

@Component({
    selector: 'app-users-list-container',
    standalone: true,
    imports: [UsersListComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <app-users-list [users]="usersService.users()" [showSpinner]="usersService.isLoading()" />
    `
})
export class UsersListContainerComponent {
    usersService = inject(UsersStoreService);
}