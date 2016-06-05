import {Component, OnInit} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig, Router} from "angular2/router";
import {AuthRouterOutlet} from "../shared/directives/auth-router-outlet.directive";
import {MovieDetailsComponent} from "./course-details.component";
import {DataService} from "../shared/services/data.service";
import {MATERIAL_DIRECTIVES, SidenavService} from "ng2-material/all";
import {MovieEditComponent} from "./course-edit.component";
import {MovieErrorPageComponent} from "./course-error-page.component";

@Component({
    selector: 'course-list',
    templateUrl: 'app/courses/course-list.template.html',
    styleUrls: ['app/courses/course.styles.css'],
    directives: [ROUTER_DIRECTIVES, AuthRouterOutlet, MATERIAL_DIRECTIVES],
    providers: [SidenavService]
})

@RouteConfig([
    { path: '/', name: 'MovieDetails', component: MovieDetailsComponent, useAsDefault: true },
    { path: '/error', name: 'ErrorPage', component: MovieErrorPageComponent },
    { path: '/:slug', name: 'CourseDetails', component: MovieDetailsComponent },
    { path: '/:slug/:edit', name: 'MovieEdit', component: MovieEditComponent }
])



export class CourseListComponent implements OnInit {
    courses: any = [];
    selectedMovie: any;

    constructor(private _dataService: DataService, private _router: Router, public sidenav: SidenavService) {}

    fetchcourses() {
        this._dataService.getAllData().subscribe(
            data => {
                this.courses.length = 0;
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        this.courses.push(data[key]);
                    }
                }
                this._router.navigate(['CourseDetails', {slug: this.courses[0].slug}]);
                return this.courses
            },
            error => console.log(error)
        );
    }

    ngOnInit():any {
        this.selectedMovie = 0;
        this._dataService.dataChanged.subscribe(
            (event) =>  setTimeout(() => {
                console.log('event in CourseList: ', event);
                this.selectedMovie = 0;
                this.fetchMovies();
            }, 500)
        );
        return this.fetchMovies();
    }

    open() {
        this.sidenav.show('left');
    }

    onSelect(index: string, slug: string) {
        this.selectedMovie = index;
        this.sidenav.hide('left');
        this._router.navigate(['CourseDetails', {slug: slug}]);
    }
}