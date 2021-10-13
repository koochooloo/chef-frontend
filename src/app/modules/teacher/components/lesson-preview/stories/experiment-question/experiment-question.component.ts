import { Location } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild ,OnDestroy} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from '@appcore/services/toaster.service';
import { UtilityService } from '@appcore/services/utility.service';
import { faCheck, faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { DynamicExperimentQuestionsComponent } from '@modules/lesson-steps/dynamic-experiment-questions/dynamic-experiment-questions.component';
import { StudentService } from '@modules/student/services/student.service';
import { TeacherService } from '@modules/teacher/services/teacher.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';


@Component({
  selector: 'app-experiment-question',
  templateUrl: './experiment-question.component.html',
  styleUrls: ['./experiment-question.component.scss']
})
export class ExperimentQuestionComponent implements OnInit,OnDestroy {

  @ViewChild('dynamicExperimentQuestionsComponent') dynamicComponent: DynamicExperimentQuestionsComponent;
  @ViewChild('correctAnsModal') CorrectAnsModal: ElementRef;
  @Input() showPrevious: boolean;
  showNext = true;
  experimentGroup: FormGroup;
  form;
  attempt = 0;
  questionIndex: number = 0;
  isRightAns = false;
  isVisiblePrevious = false;
  isVisibleNext = true;
  closeModal;
  closeResult = '';
  check = faCheck;
  close = faTimes;
  RightArrow = faChevronRight;
  assignmentId: string;
  assignmentData: any;
  panelIndex;
  selectedEassyAns: string;
  getSingleSelectValue: any;
  draggedItem;
  hint: string;
  getMultiselectedValues;
  AllQuestionsList: any;
  currentAssignedLesson;
  isButtonSection = {};
  lessonData :any;
  constructor(private modalService: NgbModal,
    private router: Router,
    private toast: ToasterService,
    private location: Location,
    private utilityService: UtilityService,
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private teacherService : TeacherService) {
    this.panelIndex = this.activatedRoute.snapshot.queryParams && this.activatedRoute.snapshot.queryParams.index;
  }

  ngOnInit(): void {
    this.teacherService.setTeachersHeader(true);
    this.showPrevious = true;
    this.assignmentId = localStorage.getItem('assignmentId');
    this.lessonData = this.teacherService.getAssignLessonData();
    this.getStudentData(this.lessonData);
  }

  ngOnDestroy(){
    this.teacherService.setTeachersHeader(false);
  }
 

  getStudentData(data) {
    let correctAns = [];
    if (data && data.lesson) {
    this.currentAssignedLesson = data;
    this.isButtonSection = {
      title: data.lesson.experiment.experimentTitle ? data.lesson.experiment.experimentTitle : undefined
    };

    this.assignmentData = data.lesson.experiment.experimentQuestions;
    if (this.assignmentData && this.assignmentData.length > 0) {
      const mappedQuestion = _.map(this.assignmentData, item => {
        let ansType = item.answer_type.key;
        let correctAns = [];
        if (ansType === 'essay') {
          item.questionType = 'essay';
          item.form = [
            {
              "formCtrlName": `q1+${item.id}`,
              "formCtrlType": "text"
            }
          ];
        } else if (ansType === 'singleSelection') {
          item.questionType = 'singleSelection';
          item.form = [];
          item.options = item.answers;
        } else if (ansType === 'multipleSelection') {
          item.questionType = 'multipleSelection';
          item.form = [];
          if (item.answers && item.answers.length > 0) {
            _.forEach(item.answers, o => {
              if (o.isAnswer === true) {
                correctAns.push(o);
              }
            });
          }
          item.allCorrectAns = correctAns;
          item.options = item.answers;
        } else if (ansType === 'dragAndDrop') {
          item.questionType = 'dragAndDrop';
          item.form = [];
          item.options = item.answers;
        }

        return item;
      });
      this.AllQuestionsList = _.filter(mappedQuestion, item => {
        if (item && item.questionType) {
          return item;
        }
      });
      if (this.panelIndex) {
        this.questionIndex = parseInt(this.panelIndex);
      }
      this.form = this.AllQuestionsList[this.questionIndex];
      // this.updateLessonProgress();
    }
  }else{
    this.toast.showToast('No experiment question found', '', 'error');
  }
}

  /**
   * on Next click event
  */
  onNext(): void {
    this.questionIndex = this.questionIndex - 1;
    if (this.questionIndex < 0) {
      this.router.navigate(['/teacher/cleaning']);
    }
    //  this.checkCurrentAnswers();
  }

  /**
   * map submission and pass data to show popup.
   */
  checkCurrentAnswers(): void {
    let mappedIds = [];
    let submission = {
      assignLessonId: parseInt(this.assignmentId),
      questionId: this.AllQuestionsList[this.questionIndex] && this.AllQuestionsList[this.questionIndex].id ? this.AllQuestionsList[this.questionIndex].id : undefined,
      answerTypeId: this.AllQuestionsList[this.questionIndex] && this.AllQuestionsList[this.questionIndex].answerTypeId ? this.AllQuestionsList[this.questionIndex].answerTypeId : undefined,
    };
    if (this.AllQuestionsList[this.questionIndex].questionType === 'essay') {
      this.attempt = 0;
      submission['essay'] = this.selectedEassyAns;
      this.validateAndSaveData(submission, 'isEssay');
    } else if (this.AllQuestionsList[this.questionIndex].questionType === 'singleSelection') {
      submission['answerIds'] = this.getSingleSelectValue && this.getSingleSelectValue.id ? [this.getSingleSelectValue.id] : undefined;
      this.openResultPopup('single', this.getSingleSelectValue, undefined, undefined, submission);
    } else if (this.AllQuestionsList[this.questionIndex].questionType === 'multipleSelection') {
      _.forEach(this.getMultiselectedValues, item => {
        mappedIds.push(item.id);
      });
      submission['answerIds'] = mappedIds;
      this.openResultPopup('multiple', undefined, this.getMultiselectedValues, undefined, submission);
    } else if (this.AllQuestionsList[this.questionIndex].questionType === 'dragAndDrop') {
      submission['answerIds'] = this.draggedItem && this.draggedItem.id ? [this.draggedItem.id] : undefined;
      this.openResultPopup('drag', undefined, undefined, this.draggedItem, submission);
    }
  }

  /**
   * to check no. of attempt and correct answers.
   */
  validateAndSaveData(submission: any, isEssay?: any): void {
    if (isEssay) {
      this.isRightAns = true;
    }
    if (this.attempt < 2 && this.isRightAns) {
      this.onAnswerSubmit(submission);
    } else if (this.attempt === 2) {
      this.onAnswerSubmit(submission);
    } else if (this.attempt > 2) {
      this.showNextScreen();
    }
  }

  /**
   * API call to save answers.
   * @param submission 
   */
  onAnswerSubmit(submission: any): void {
    this.studentService.saveAnswerToAPI(submission).subscribe(
      (response: any) => {
        if (response && response.data) {
          this.showNextScreen();
        }
      },
      (error) => {
        console.log(error);
        if (error && error.error.status === 400) {
          this.toast.showToast(error.error.message, '', 'error');
          setTimeout(() => {
            this.showNextScreen();
          }, 2000);
        }
      }
    );
  }

  /**
   * to show next questions.
   */
  showNextScreen(): void {
    // if (this.questionIndex != 0) {
    //   this.questionIndex = parseInt(localStorage.getItem('expQuestionIndex'))
    // }
    let tempIndex = parseInt(this.panelIndex);
    if (tempIndex && this.AllQuestionsList.length === tempIndex && this.questionIndex === tempIndex) {
      this.questionIndex = this.AllQuestionsList.length;
    } else {
      this.questionIndex = this.questionIndex + 1;
    }
    // localStorage.setItem('expQuestionIndex', this.questionIndex.toString())
    this.form = this.AllQuestionsList[this.questionIndex];
    // this.updateLessonProgress();
    this.isVisibleNext = true;
    this.attempt = 0;
    this.dynamicComponent.isHint = false;
    if (this.AllQuestionsList.length === this.questionIndex) {
      if (this.currentAssignedLesson.customSetting && this.currentAssignedLesson.customSetting.content) {
        for (let ob of this.currentAssignedLesson.customSetting.content) {
          if (ob.title === 'Cooking' && ob.status === true) {
            this.router.navigate(['/student/cleaning']);
            break;
          } else if (ob.title === 'Assessments' && ob.status === true) {
            this.router.navigate(['/student/assessment-question']);
            break;
          } else {
            this.router.navigate(['/student/action-activities']);
          }
        }
      }
    }
  }

  ngAfterContentChecked(): void {
    if (this.assignmentData && this.AllQuestionsList.length - 1 === this.questionIndex) {
      this.showNext = false;
    } else {
      this.showNext = true;
    }
    if (this.questionIndex > 0) {
      this.isVisiblePrevious = true;
    }
  }

  /**
   * on Previous click event
  */
  onPrevious(): void {
    // if (this.questionIndex != 0) {
    //   this.questionIndex = parseInt(localStorage.getItem('expQuestionIndex'))
    // }
    this.questionIndex = this.questionIndex - 1;
    // localStorage.setItem('expQuestionIndex', this.questionIndex.toString())
    this.form = this.AllQuestionsList[this.questionIndex]
    if (this.questionIndex < 0) {
      this.router.navigate(['/teacher/start-experiment']);

      // if (this.currentAssignedLesson.customSetting && this.currentAssignedLesson.customSetting.content) {
      //   for (let ob of this.currentAssignedLesson.customSetting.content) {
      //     if (ob.title === 'Cooking' && ob.status === true) {
      //       this.router.navigate(['/student/serving']);
      //       break;
      //     } else if (ob.title === 'Learning Activities' && ob.status === true) {
      //       let isExperiment = _.find(ob.Activities, function (item) { return item.lable === 'Science Experiment'; });
      //       if (isExperiment && isExperiment.status === true) {
      //         this.router.navigate(['/student/experiment']);
      //         break;
      //       }
      //     } else if (ob.title === 'Story' && ob.status === true) {
      //       this.router.navigate(['/student/conversional-sentence'])
      //     }
      //   }
      // }
     }
  }

  /**
   * to get value of multi-select type of questions.
   * @param selectedItems
   */
  getMultiSelectedAns(selectedItems?: any): void {
    this.getMultiselectedValues = selectedItems;
    this.isVisibleNext = false;
  }
  /**
   * to get value of single select type of questions.
   * @param item 
   */
  getSingleSelectAns(item: any): void {
    if (item && item.id) {
      this.getSingleSelectValue = item;
      this.isVisibleNext = false;
    }
  }

  /**
   * to get value of drag-drop type of questions.
   * @param ev 
   */
  drag(ev) {
    if (ev.target && ev.target.id && ev.target.id != '') {
      ev.dataTransfer.setData("text", ev.item.id);
      this.draggedItem = ev.item;
    }
  }

  /**
  * to get value of drag-drop type of questions.
  * @param ev 
  */
  drop(ev) {
    let elementToUpdate;
    ev.preventDefault();
    if (ev.target && ev.target.firstChild != null) {
      elementToUpdate = ev.target.firstChild;
      ev.target.removeChild(elementToUpdate);
      let cardContainer: HTMLElement = document.getElementById('options');
      _.forEach(cardContainer.children, element => {
        if (element.children.length === 0) {
          element.appendChild(elementToUpdate);
        }
      });
    }
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    if (this.draggedItem) {
      this.isVisibleNext = false;
    }
  }

  /**
   * to show answers on popup for all type of questions.
   */
  openResultPopup(ansType?: any, singleData?: any, multiData?: any, dragData?: any, submission?: any): void {
    if (ansType === 'single') {
      if (singleData && singleData.isAnswer === true) {
        this.isRightAns = true;
      } else {
        this.isRightAns = false;
      }
    } else if (ansType === 'drag') {
      if (dragData.isAnswer === true) {
        this.isRightAns = true;
      } else {
        this.isRightAns = false;
      }
    } else if (ansType === 'multiple') {
      let isCorrect = this.calculateMultiSelectAnswer();
      if (multiData && multiData.length > 0 && isCorrect) {
        this.isRightAns = true;
      } else {
        this.isRightAns = false;
      }
    }
    this.hint = this.AllQuestionsList[this.questionIndex] && this.AllQuestionsList[this.questionIndex].hint ? this.AllQuestionsList[this.questionIndex].hint : undefined;
    this.modalService.open(this.CorrectAnsModal, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.attempt = this.attempt + 1;
      submission['isCorrect'] = this.isRightAns;
      if (this.attempt && this.attempt === 1) {
        submission['pointsEarned'] = 1;
      } else if (this.attempt === 2) {
        submission['pointsEarned'] = 0.25;
      }
      this.validateAndSaveData(submission);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  calculateMultiSelectAnswer(): boolean {
    let arr = [];
    _.forEach(this.getMultiselectedValues, op => {
      if (op.isAnswer) {
        arr.push(op);
      }
    });
    if ((arr.length === this.getMultiselectedValues.length) && (arr.length === this.AllQuestionsList[this.questionIndex].allCorrectAns.length)) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * to get value of essay type of questions.
   * @param item 
   */
  answerChange(data) {
    if (_.isEmpty(data) || data === undefined) {
      this.isVisibleNext = true;
    } else {
      this.selectedEassyAns = data;
      this.isVisibleNext = false;
    }
  }
}

