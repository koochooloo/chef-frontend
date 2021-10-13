import { Component, OnInit } from '@angular/core';
import { ToasterService } from '@appcore/services/toaster.service';
import { UtilityService } from '@appcore/services/utility.service';
import { SchoolService } from '@modules/school/services/school.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-get-help',
  templateUrl: './get-help.component.html',
  styleUrls: ['./get-help.component.scss']
})
export class GetHelpComponent implements OnInit {

  contactList = [];
  constructor(private toast: ToasterService,
    private utiltiService: UtilityService, private schoolService: SchoolService) { }

  ngOnInit(): void {
    this.getContactDetails();
  }
  getContactDetails(): void {
    this.schoolService.getContactUsDetails().subscribe((response) => {
      if (response && response.data && response.data.rows) {
        response.data.rows.forEach(element => {
          element.photo = "./assets/images/help-profile1.png",
          element.phoneNumber = this.utiltiService.formatPhoneNumber(element.phoneNumber)
        });
        this.contactList = response.data.rows;
      }
    }, (error) => {
      console.log('error', error);
      this.toast.showToast(error.error.message, '', 'error');
    });
  }
}