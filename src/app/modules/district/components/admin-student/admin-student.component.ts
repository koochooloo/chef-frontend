import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from '@appcore/services/toaster.service';
import { UtilityService } from '@appcore/services/utility.service';
import {
  faChevronRight,
  faPlus,
  faList,
  faTh,
  faSearch,
  faSort,
  faAngleDoubleRight,
  faExclamationTriangle,
  faThLarge,
  faEllipsisV,
  faDownload
} from '@fortawesome/free-solid-svg-icons';
import { DistrictService } from '@modules/district/services/district.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
@Component({
  selector: 'app-admin-student',
  templateUrl: './admin-student.component.html',
  styleUrls: ['./admin-student.component.scss']
})
export class AdminStudentComponent implements OnInit {
  gridview = false;
  listview = true;
  ViewIcon = faList;
  PlusIcon = faPlus;
  rightArrow = faChevronRight;
  NextArrow = faAngleDoubleRight;
  exclamationTriangle = faExclamationTriangle;
  TileView = faList;
  GridView = faTh;
  SearchIcon = faSearch;
  faDots = faEllipsisV;
  faImport = faDownload;
  ViewTitle = "List View";
  ViewList = [
    {
      id: '1',
      menu: 'Tile View',
      link: '',
      icon: faThLarge,
    },
    {
      id: '2',
      menu: 'List View',
      link: '',
      icon: faList
    }
  ];
  classesListtitle = "All Students";
  filterList = [
    {
      menu: 'All Students'
    },
    {
      id: '1',
      menu: 'Active'
    },
    {
      id: '0',
      menu: 'Inactive'
    }
  ];
  SortByGradeTitle = "Sort by Grade";
  SortByGradeList = [
    {
      id: '1',
      menu: 'Sort by Grade:None'
    },
    {
      id: '1',
      menu: 'Ascending',
      value: 'asc'
    },
    {
      id: '2',
      menu: 'Descending',
      value: 'desc'
    }
  ];
  studentList = [];
  allergenList=[];

  // userList = [
  //   {
  //     userPhoto: "./assets/images/student-icon.svg",
  //     userName: "Samuel, Aaron",
  //     userFirstName: "Samuel",
  //     userLastName: "Aaron",
  //     userId: "36273",
  //     email: "samual.aron@xyzschools.net",
  //     contactNumber: "1234567890",
  //     status: "Active",
  //     role: "admin",
  //     grade: "H",
  //     gender: "M",
  //     dateOfBirth: "03-03-2015",
  //     allergie: "Shell Fish",
  //     dots: "...",
  //   },
  //   {
  //     userPhoto: "./assets/images/student-icon.svg",
  //     userName: "Ruaz, Kevin",
  //     userFirstName: "Ruaz",
  //     userLastName: "Kevin",
  //     userId: "36272",
  //     email: "ruaz.kevin@xyzschools.net",
  //     contactNumber: "1234567890",
  //     status: "Inactive",
  //     role: "sub-admin",
  //     grade: "H",
  //     gender: "F",
  //     dateOfBirth: "03-03-2015",
  //     allergie: "-",
  //     dots: "...",
  //   },
  //   {
  //     userPhoto: "./assets/images/student-icon.svg",
  //     userName: "Keil, Exie",
  //     userFirstName: "Keil",
  //     userLastName: "Exie",
  //     userId: "36271",
  //     email: "keil.exie@xyzschools.net",
  //     contactNumber: "1234567890",
  //     status: "Inactive",
  //     role: "admin",
  //     grade: "A",
  //     gender: "F",
  //     dateOfBirth: "03-03-2015",
  //     allergie: "Peanut",
  //     dots: "...",
  //   },
  //   {
  //     userPhoto: "./assets/images/student-icon.svg",
  //     userName: "Samuel, Aaron",
  //     userFirstName: "Samuel",
  //     userLastName: "Aaron",
  //     userId: "36274",
  //     email: "samual.aron@xyzschools.net",
  //     contactNumber: "1234567890",
  //     status: "Active",
  //     role: "sub-admin",
  //     grade: "K",
  //     gender: "M",
  //     dateOfBirth: "03-03-2015",
  //     allergie: "Peanut",
  //     dots: "...",
  //   }
  // ];
  userHeaders = [
    {
      title: "First Name",
      data: "userFirstName"
    },
    {
      title: "last Name",
      data: "userLastName"
    },
    {
      title: "Id",
      data: "userId"
    },
    {
      title: "Grade",
      data: "grade"
    },
    {
      title: "Gender",
      data: "gender"
    },
    {
      title: "DATE OF BIRTH",
      data: "dateOfBirth"
    },
    {
      title: "Email Id",
      data: "email"
    },
    {
      title: "Role",
      data: "role"
    },
    {
      title: "Allergies",
      data: "allergie"
    },
    {
      title: "",
      data: "dots",
      isClickable: true
    }
  ];
  closeModal;
  term: string;
  isLoadUser = false;
  closeResult = '';
  createClassForm: FormGroup;
  constructor(private router: Router, private utilityService: UtilityService, private toast: ToasterService,
    private districtService: DistrictService) { }

  ngOnInit(): void {
    this.getStudentList();
  }

  /**
* API call to get all classes.
*/
  getStudentList(filter?: any, sortByGrade?: string): void {
    this.districtService.getAllStudents(filter, sortByGrade).subscribe(
      (response) => {
        if (response && response.data && response.data.rows) {
          this.studentList = _.map(response.data.rows, item => {
            this.allergenList=[];
            
            _.map(item.allergens,allergen =>{
              this.allergenList.push(allergen.allergen.allergenTitle)
            });
            let obj = {
              userName: item.userName,
              userFirstName: item.firstName,
              userLastName: item.lastName,
              userId: item.id,
              email: item.contactPersonEmail,
              contactNumber: item.contactPersonNumber ? this.utilityService.formatPhoneNumber(item.contactPersonNumber) : '',
              status: item.status === true ? 'Active' : 'Inactive',
              role: 'Student',
              grade: item.grade && item.grade.grade,
              gender: item && item.gender && item.gender.charAt(0).toUpperCase() + item.gender.slice(1),
              dateOfBirth: this.utilityService.formatDate(item.dob),
              allergie: this.allergenList,
            }
            return obj;
          });
          this.studentList.forEach(element => {
            element.userPhoto = "./assets/images/student-icon.svg"
            // element.dots = "..."

            // element.dots = [
            //   'Info',
            //   'Students',
            //   'Reports'
            // ].join(',');
          });
          this.isLoadUser = true;
        }
      },
      (error) => {
        console.log(error);
        this.toast.showToast(error.error.message, '', 'error');
      }
    );
  }

  changeView(event) {
    if (event.menu === 'Tile View') {
      this.ViewTitle = 'Tile View';
      this.gridview = true;
      this.listview = false;
      this.ViewIcon = faThLarge;
    } else {
      this.ViewTitle = 'List View';
      this.gridview = false;
      this.listview = true;
      this.ViewIcon = faList;
    }
  }
  /**
   * On grade filter dropdown value change
   */
  gradeFilter(event) {
    this.SortByGradeTitle = event.menu;
    if (event && event.value) {
      this.getStudentList(undefined, event.value);
    } else {
      this.getStudentList();
    }
  }

  studentFilter(item: any): void {
    this.classesListtitle = item.menu;
    if (item && item.id) {
      this.getStudentList(item.id);
    } else {
      this.getStudentList();
    }
  }
  addStudent(item?: any): void {
    let studId = item && item.userId;
    if (studId) {
      this.router.navigate(['/district/add-student'], { queryParams: { id: studId } });
    } else {
      this.router.navigate(['/district/add-student']);
    }
  }
  onImportStudent(): void {
    this.router.navigate(['/district/import-user'], { queryParams: { type: 'Students' } });
  }
}
