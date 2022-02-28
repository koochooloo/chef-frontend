import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from '@appcore/services/toaster.service';
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
import { SchoolService } from '@modules/school/services/school.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-admin-teacher',
  templateUrl: './admin-teacher.component.html',
  styleUrls: ['./admin-teacher.component.scss']
})
export class AdminTeacherComponent implements OnInit {

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
  userTitle = "All Teachers";
  userList = [
    {
      menu: 'All Teachers'
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
  SortByIdTitle = "Sort by Teacher ID";
  SortByIdList = [
    {
      id: '1',
      menu: 'Sort by Teacher ID:None'
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
      title: "Gender",
      data: "gender"
    },
    {
      title: "Contact Number",
      data: "contactNumber"
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
      title: "Status",
      data: "status"
    },
    {
      title: "",
      data: "dots"
    }
  ];
  closeModal;
  closeResult = '';
  schoolList = [];
  isLoadUser = false;
  term: string;
  sortById;
  status;
  profilePic: string;
  createClassForm: FormGroup;
  activateUserData: any;
  constructor(private router: Router,
    private toast: ToasterService,
    private schoolService: SchoolService
  ) {
    this.profilePic = './assets/images/user-profile.png'
  }

  ngOnInit(): void {
    this.activateUserData = JSON.parse(window.sessionStorage.getItem('currentUser'));
    this.getAllTeacherList();
  }

  getAllTeacherList(): void {
    this.schoolService.getSchoolDetailsByUserId(this.activateUserData.id).subscribe(
      (schoolResponse) => {
        if (schoolResponse && schoolResponse.data && schoolResponse.data[0].id) {
          this.schoolService.getAllTeacher(this.status, schoolResponse.data[0].id, this.sortById).subscribe(
            (response) => {
              if (response && response.data && response.data.rows) {
                this.schoolList = _.map(response.data.rows, item => {
                  let obj = {
                    id: item.id,
                    userFirstName: item.teacher.first_name,
                    userLastName: item.teacher.last_name,
                    userId: item.teacher.id,
                    email: item.email,
                    gender: item && item.teacher && item.teacher.gender ? item.teacher.gender.charAt(0).toUpperCase() + item.teacher.gender.slice(1) : undefined,
                    contactNumber: item.phone_number,
                    userPhoto: item.profile_image || this.profilePic,
                    status: item.status === true ? 'Active' : 'Inactive',
                    role: item.role.title,
                    roleID: item.role.id,
                    dots: "..."
                  }
                  return obj;
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
      });
  }

  editTeacher(item: any): void {
    this.router.navigate(['school/add-teacher'], { queryParams: { id: item.id } });
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

  teacherFilter(item: any): void {
    this.userTitle = item.menu;
    this.userTitle = item.menu;
    this.status = item.id;
    this.getAllTeacherList();
  }
  teacherIdFilter(event): void {
    this.SortByIdTitle = event.menu;
    this.sortById = event.value;
    this.getAllTeacherList();
  }

  importUser(): void {
    this.router.navigate(['/school/import-user'], { queryParams: { type: 'Teachers', roleID: this.schoolList && this.schoolList[0].roleID } });
  }

  addTeacher(): void {
    this.router.navigate(['/school/add-teacher']);
  }
}
