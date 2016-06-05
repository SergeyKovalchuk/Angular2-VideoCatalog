import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {AuthService} from "../shared/services/auth.service";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";

@Component({
    selector: 'navigation',
    templateUrl: 'app/navigation/navigation.template.html',
    directives: [ROUTER_DIRECTIVES, MATERIAL_DIRECTIVES]
})

export class NavigationComponent {
    constructor(private _authService: AuthService) {}

    isReg() {
        return this._authService.isRegistered();
    }

    isAuth() {
        return this._authService.isAuthenticated();
    }

    logout() {
        this._authService.logout();
    }
}
