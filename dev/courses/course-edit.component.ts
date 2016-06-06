import { Component, OnInit }                        from "angular2/core";
import { DataService }                              from "../shared/services/data.service";
import { RouteParams, Router, ROUTER_DIRECTIVES }   from "angular2/router";

@Component({
    selector: 'course-edit',
    templateUrl: 'app/courses/course-edit.template.html',
    styleUrls: ['app/courses/course.styles.css'],
    directives: [ROUTER_DIRECTIVES]
})

export class CourseEditComponent implements OnInit {
    course: any;
    private _name = this._routeParams.get('name');

    constructor(private _dataService: DataService, private _routeParams: RouteParams, private _router: Router) {}


    ngOnInit():any {
        return this._dataService.getSingleData(this._name).subscribe(
            data => {
                this.course = data;
            },
            error => console.log(error)
        );
    }

    onSave() {
        this._dataService.updateData(this._name, this.course).subscribe(
            () => {
               this._router.navigate(['CourseDetails', { name: this._name }]);
            },
            error => console.log(error)
        )
    }

    onCancel() {
        this._router.navigate(['CourseDetails', { name: this._name }]);
    }
}
