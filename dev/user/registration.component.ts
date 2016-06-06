import {Component, OnInit} from "angular2/core";
import {FormBuilder, FORM_DIRECTIVES, ControlGroup, Validators, Control} from "angular2/common";
import {AuthService} from "../shared/services/auth.service";
import {MATERIAL_DIRECTIVES, MdPatternValidator} from "ng2-material/all";
import {Router} from "angular2/router";

@Component({
    selector: 'registration-form',
    templateUrl: 'app/user/registration.template.html',
    styleUrls: ['app/user/registration-login.styles.css'],
    directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES]
})

export class RegistrationComponent implements OnInit {
    userForm: ControlGroup;
    error: string;
    title: string = 'Registration Form';

    userModel = {
        email: '',
        password: '',
        confirmPassword: ''
    };

    constructor(private _fb: FormBuilder, private _authService: AuthService, private _router: Router) {}

    onSignup() {
        this. _authService.signupUser(this.userForm.value);
    }

    ngOnInit():any {
        let error = this._authService.onError().subscribe((error) => this.error = error);
        let success = this._authService.getRegistrationSuccessEvent().subscribe( () => this._router.navigate(['Start']) );

        this.userForm = this._fb.group({
            email: ['', Validators.compose([
                MdPatternValidator.inline('^.+@.+\..+$'),
                Validators.required
            ])],
            password: ['', Validators.compose([
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(12)
            ])],
            confirmPassword: ['', Validators.compose([
                Validators.required,
                this.isEqualPassword.bind(this)
            ])]
        });

        return { error, success };
    }

    isEqualPassword(control:Control):{[s: string]: boolean} {
        if (!this.userForm) {
            return { passwordsNotMatch: true };
        }
        if (control.value !== this.userForm.controls['password'].value) {
            return { passwordsNotMatch: true };
        }
    }
}
