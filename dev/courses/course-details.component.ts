import { Component, OnInit } 	from "angular2/core";
import { MATERIAL_DIRECTIVES } 	from "ng2-material/all";
import { DataService } 			from "../shared/services/data.service";
import { RouteParams, Router } 	from "angular2/router";

@Component({
	selector: 'course-details',
	templateUrl: 'app/courses/course-details.template.html',
	styleUrls: ['app/courses/course.styles.css'],
	directives: [MATERIAL_DIRECTIVES]
})

export class CourseDetailsComponent implements OnInit {
	course: any;
	private _name = this._routeParams.get('name');
	private _edit: string = 'edit';

	constructor(private _dataService: DataService, private _routeParams: RouteParams, private _router: Router) {}

	ngOnInit():any {
		return this._dataService.getSingleData(this._name).subscribe(
			data => {
				this.course = data;
			},
			error => console.log(error)
		);
	}

	onSelectEdit() {
		this._router.navigate(['CourseEdit', { name: this._name, edit: this._edit } ]);
	}

	onDelete() {
		 this._dataService.deleteDataSet(this._name).subscribe();
	}

	onAdd() {
		this._router.navigate(['CourseAdd'], { name: this._name, edit: this._edit }};
	}
}
