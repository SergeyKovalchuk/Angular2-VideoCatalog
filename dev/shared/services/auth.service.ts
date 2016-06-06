import {Injectable, EventEmitter} from "angular2/core";
import {User} from "../interfaces/user.interface";
declare var Firebase: any;

@Injectable()

export class AuthService {
    private _url = 'https://videocatalog-angular2.firebaseio.com';
    private _firebaseRef = new Firebase(this._url);
    private _userLoggedOut = new EventEmitter<any>();
    private _userLoggedIn = new EventEmitter<any>();
    private _error = new EventEmitter<any>();
    private _registrationSuccess = new EventEmitter<any>();

    signupUser(user: User) {
        this._firebaseRef.createUser({
            email: user.email,
            password: user.password
        }, (error, userData) => {
            if (error) {
                this._error.emit(error);
            } else {
                localStorage.setItem('registered', userData.uid);
                this._registrationSuccess.emit(userData.uid);
            }
        });
    }

    signinUser(user: User) {
        this._firebaseRef.authWithPassword({
            email: user.email,
            password: user.password
        }, (error, authData) => {
            if (error) {
                this._error.emit(error);
            } else {
                localStorage.setItem('token', authData.token);
                this._userLoggedIn.emit(authData.token);
            }
        });
    }

    logout() {
        localStorage.removeItem('token');
        this._userLoggedOut.emit(null);
    }

    onError(): EventEmitter<any> {
        return this._error;
    }

    getRegistrationSuccessEvent(): EventEmitter<any> {
        return this._registrationSuccess;
    }

    getLoggedOutEvent(): EventEmitter<any> {
        return this._userLoggedOut;
    }

    getLoggedInEvent(): EventEmitter<any> {
        return this._userLoggedIn;
    }

    isAuthenticated(): boolean {
        return localStorage.getItem('token') !== null;
    }

    isRegistered(): boolean {
        return localStorage.getItem('registered') !== null;
    }
}
