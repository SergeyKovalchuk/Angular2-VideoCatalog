import { Component, OnInit }                        from "angular2/core";
import { ROUTER_DIRECTIVES, RouteConfig, Router }   from "angular2/router";
import { AuthRouterOutlet }                         from "../shared/directives/auth-router-outlet.directive";

//Components
import { CourseDetailsComponent }               from "./course-details.component";
import { DataService }                          from "../shared/services/data.service";
import { MATERIAL_DIRECTIVES, SidenavService }  from "ng2-material/all";
import { CourseEditComponent }                  from "./course-edit.component";
import { CourseErrorPageComponent }             from "./course-error-page.component";

@Component({
    selector: 'course-list',
    templateUrl: 'app/courses/course-list.template.html',
    styleUrls: ['app/courses/course.styles.css'],
    directives: [ROUTER_DIRECTIVES, AuthRouterOutlet, MATERIAL_DIRECTIVES],
    providers: [SidenavService]
})

@RouteConfig([
    { path: '/', name: 'CourseDetails', component: CourseDetailsComponent, useAsDefault: true },
    { path: '/error', name: 'ErrorPage', component: CourseErrorPageComponent },
    { path: '/:name', name: 'CourseDetails', component: CourseDetailsComponent },
    { path: '/:name/:edit', name: 'CourseEdit', component: CourseEditComponent },
])



export class CourseListComponent implements OnInit {
    courses: any = [];
    selectedCourse: any;

    constructor(private _dataService: DataService, private _router: Router, public sidenav: SidenavService) {}

    fetchCourses() {
        this._dataService.getAllData().subscribe(
            data => {
                this.courses.length = 0;
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        this.courses.push(data[key]);
                    }
                }
                this._router.navigate(['CourseDetails', {name: this.courses[0].name}]);
                return this.courses
            },
            error => console.log(error)
        );
    }

    ngOnInit():any {
        this.selectedCourse = 0;
        this._dataService.dataChanged.subscribe(
            (event) =>  setTimeout(() => {
                this.selectedCourse = 0;
                this.fetchCourses();
            }, 500)
        );
        return this.fetchCourses();
    }

    open() {
        this.sidenav.show('courseslist');
    }

    openAdd() {
        this.sidenav.show('courseadd');
    }

    onSelect(index: string, name: string) {
        this.selectedCourse = index;
        this.sidenav.hide('courseslist');
        this._router.navigate(['CourseDetails', {name: name}]);
    }
}
