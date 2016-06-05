import { bootstrap }    		from 'angular2/platform/browser';
import { AppComponent } 		from './app.component';
import { ROUTER_PROVIDERS } 	from "angular2/router";
import { HTTP_PROVIDERS } 		from "angular2/http";
import { AuthService } 			from "./shared/services/auth.service";
import { MATERIAL_PROVIDERS } 	from "ng2-material/all";

bootstrap(AppComponent, [ROUTER_PROVIDERS, HTTP_PROVIDERS, MATERIAL_PROVIDERS, AuthService]);
