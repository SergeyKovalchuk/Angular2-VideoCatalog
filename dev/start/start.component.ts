import {Component} from "angular2/core";
import {Router} from "angular2/router";
import {AuthService} from "../shared/services/auth.service";

@Component({
    selector: 'start-component',
    templateUrl: 'app/start/start.template.html',
    styleUrls: ['app/start/start.styles.css'],
})

export class StartComponent {
    routes = {
        register: { text: 'register', component: 'Registration' },
        signin: { text: 'sign in', component: 'Login' }
    };

    constructor(private _router: Router, private _authService: AuthService) {}

    navigateTo(route: string) {
        this._router.navigate([route]);
    }

    isReg() {
       return this._authService.isRegistered();
    }

    isAuth() {
        return this._authService.isAuthenticated();
    }
}
