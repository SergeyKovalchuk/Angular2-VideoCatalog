import {Directive, ElementRef, DynamicComponentLoader, Attribute} from "angular2/core";
import {RouterOutlet, Router, ComponentInstruction} from "angular2/router";
import {AuthService} from "../services/auth.service";

@Directive({
    selector: 'auth-router-outlet'
})

export class AuthRouterOutlet extends RouterOutlet {
    private _protectedRoutes = {
        'movies': true
    };

    constructor(_elementRef: ElementRef, _loader: DynamicComponentLoader, private _mainRouter: Router, @Attribute('name') _nameAttr: string, private _authService: AuthService) {
        super(_elementRef, _loader, _mainRouter, _nameAttr);
    }

    activate(nextInstruction: ComponentInstruction): Promise<any> {
        const url = nextInstruction.urlPath;

        if (this._protectedRoutes[url] && !this. _authService.isAuthenticated()) {
            this._mainRouter.navigate(['Login']);
        }

        return super.activate(nextInstruction);
    }
}
