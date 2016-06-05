import {Component, OnInit} from "angular2/core";
import {ControlGroup, FORM_DIRECTIVES, FormBuilder, Validators} from "angular2/common";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {AuthService} from "../shared/services/auth.service";
import {MdPatternValidator} from "ng2-material/all";
import {Router} from "angular2/router";

@Component({
    selector: 'login-form',
    templateUrl: 'app/user/login.template.html',
    styleUrls: ['app/user/registration-login.styles.css'],
    directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES]
})

export class LoginComponent implements OnInit {
    userForm: ControlGroup;
    title: string = 'Login Form';
    error: string;

    userModel = {
        email: '',
        password: '',
        confirmPassword: ''
    };

    constructor(private _fb: FormBuilder, private _authService: AuthService, private _router: Router) {}

    onSignin() {
        this._authService.signinUser(this.userForm.value);
    }

    ngOnInit():any {
        let error = this._authService.onError().subscribe((error) => this.error = error);
        let success = this._authService.getLoggedInEvent().subscribe( () => this._router.navigate(['MoviesList']) );

        this.userForm = this._fb.group({
            email: ['', Validators.compose([
                MdPatternValidator.inline('^.+@.+\..+$'),
                Validators.required
            ])],
            password: ['', Validators.compose([
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(12)
            ])]
        });

        return { error, success };
    }
}
