import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeacherAuthGuard } from './guards/teacher-auth-guard';
import { AddClassComponent } from './components/add-class/add-class.component';
import { ClassesComponent } from './components/classes/classes.component';
import { TeacherComponent } from './teacher.component';
import { ImportStudentComponent } from './components/import-student/import-student.component';

import { StudentsListComponent } from './components/students-list/students-list.component';
import { ClassInfoComponent } from './components/class-info/class-info.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UpcomingAssignmentComponent } from './components/upcoming-assignment/upcoming-assignment.component';
import { TeacherSettingComponent } from './components/teacher-setting/teacher-setting.component';
import { ExploreLessonsComponent } from './components/explore-lessons/explore-lessons.component';
import { ExploreLessonsListComponent } from './components/explore-lessons-list/explore-lessons-list.component';
import { ExploreLessonsSettingsComponent } from './components/explore-lessons-settings/explore-lessons-settings.component';
import { IndividualStudentAssignmentDetailsComponent } from './components/individual-student-assignment-details/individual-student-assignment-details.component';
import { TeacherProfileComponent } from './components/teacher-profile/teacher-profile.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CurrentAssignmentsComponent } from './components/current-assignments/current-assignments.component';
import { TabularNotificationsComponent } from './components/tabular-notifications/tabular-notifications.component';
import { CustomizeAssignLessonComponent } from './components/customize-assign-lesson/customize-assign-lesson.component';
import { FirstTimeLoginComponent } from './components/first-time-login/first-time-login.component';
import { EditMemberShipComponent } from './components/edit-membership/edit-membership.component';
import { TeacherInstructionsComponent } from './components/teacher-instructions/teacher-instructions.component';
import { TeacherBookmarkComponent } from './components/teacher-bookmark/teacher-bookmark.component';
import { CurrentMembershipPlanComponent } from './components/current-membership-plan/current-membership-plan.component';
import { OrderIngredientsComponent } from './components/order-ingredients/order-ingredients.component';
import { AddRosterComponent } from './components/add-roster/add-roster.component';
import { RosterGroupTabsComponent } from './components/roster-group-tabs/roster-group-tabs.component';
import { ArchivedClassesComponent } from './components/archived-classes/archived-classes.component'
import { RosterAssignmentDetailsComponent } from './components/roster-assignment-details/roster-assignment-details.component';
import { TeacherPerformanceComponent } from './components/teacher-performance/teacher-performance.component';
import { TeacherHomepageComponent } from './components/teacher-homepage/teacher-homepage.component';
import{AdminBillingComponent} from './components/admin-billing/admin-billing.component'
import{MembershipDetailsComponent} from './components/membership-details/membership-details.component';
import { ActionActivityComponent } from './components/lesson-preview/stories/add-action-activity/add-action-activity.component';
import { JournalComponent } from './components/lesson-preview/stories/journal/journal.component';
import { ConversationalSentenceComponent } from './components/lesson-preview/stories/conversational-sentence/conversational-sentence.component';
import { AssessmentQuestionComponent } from './components/lesson-preview/stories/assessment-question/assessment-question.component';
import { CleaningComponent } from './components/lesson-preview/stories/cleaning/cleaning.component';
import { CookingPreparationComponent } from './components/lesson-preview/stories/cooking-preparation/cooking-preparation.component';
import { CookingTechniqueComponent } from './components/lesson-preview/stories/cooking-technique/cooking-technique.component';
import { IntroductionComponent } from './components/lesson-preview/stories/introduction/introduction.component';
import { FindCountryComponent } from './components/lesson-preview/stories/find-country/find-country.component';
import { CountryLocationComponent } from './components/lesson-preview/stories/country-location/country-location.component';
import { ExperimentComponent } from './components/lesson-preview/stories/experiment/experiment.component';
import { ServingComponent } from './components/lesson-preview/stories/serving/serving.component';
import { LearningObjectiveComponent } from './components/lesson-preview/stories/learning-objective/learning-objective.component';
import { SummaryViewComponent } from './components/lesson-preview/stories/summary-view/summary-view.component';
import { GreetingComponent } from './components/lesson-preview/stories/greeting/greeting.component';
import { IngredientListComponent } from './components/lesson-preview/stories/ingredient-list/ingredient-list.component';
import { IngredientComponent } from './components/lesson-preview/stories/ingredient/ingredient.component';
import { RecipeFactComponent } from './components/lesson-preview/stories/recipe-fact/recipe-fact.component';
import { RecipeContentComponent } from './components/lesson-preview/stories/recipe-content/recipe-content.component';
import { LinguisticDetailsComponent } from './components/lesson-preview/stories/linguistic-details/linguistic-details.component';
import { LetStartComponent } from './components/lesson-preview/stories/let-start/let-start.component';
import { SocialStudiesFactComponent } from './components/lesson-preview/stories/social-studies-fact/social-studies-fact.component';
import { NutrientQuestionComponent } from './components/lesson-preview/stories/nutrient-question/nutrient-question.component';
import { SensoryQuestionComponent } from './components/lesson-preview/stories/sensory-question/sensory-question.component';
import { CookingStepsComponent } from './components/lesson-preview/stories/cooking-steps/cooking-steps.component';
import { SafetyHygieneComponent } from './components/lesson-preview/stories/safety-hygiene/safety-hygiene.component';
import { SensoryExerciseComponent } from './components/lesson-preview/stories/sensory-exercise/sensory-exercise.component';
import { ExperimentStepsComponent } from './components/lesson-preview/stories/experiment-steps/experiment-steps.component';
import { ExperimentDescriptionComponent } from './components/lesson-preview/stories/experiment-description/experiment-description.component';
import { StartExperimentComponent } from './components/lesson-preview/stories/start-experiment/start-experiment.component';
import { ExperimentQuestionComponent } from './components/lesson-preview/stories/experiment-question/experiment-question.component';
import { DiscussionForumInnerComponent } from './components/discussion-forum-inner/discussion-forum-inner.component';
import { DiscussionForumComponent } from './components/discussion-forum/discussion-forum.component';
import { ExploreAllLessonComponent } from './components/explore-all-lesson/explore-all-lesson.component';
import { LessonStandardListComponent } from './components/lesson-standard-list/lesson-standard-list.component';
import { NotificationsComponent } from './components/notifications/notifications.component';

const routes: Routes = [
  {
    path: '',
    component: TeacherComponent,
    children: [
      {
        path: '',
        component: ClassesComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'class-list',
        component: ClassesComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path:'user-profile',
        component:UserProfileComponent,
        canActivate:[TeacherAuthGuard]
      },
      {
        path: 'add-student',
        component: AddClassComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'edit-student/:id',
        component: AddClassComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'import-student',
        component: ImportStudentComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'student-list',
        component: StudentsListComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'class-info',
        component: ClassInfoComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'upcoming-assignment',
        component: UpcomingAssignmentComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'setting',
        component: TeacherSettingComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path:'teacher-profile',
        component:TeacherProfileComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'explore-lessons',
        component: ExploreLessonsComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'explore-lessons-list',
        component: ExploreLessonsListComponent,
        canActivate: [TeacherAuthGuard]
       },
      {
        path: 'explore-lessons-setting/:id',
        component: ExploreLessonsSettingsComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'individual-student-assignment-details',
        component: IndividualStudentAssignmentDetailsComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'current-assignments',
        component: CurrentAssignmentsComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'tabular-notifications',
        component: TabularNotificationsComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'customize-assign-lesson',
        component: CustomizeAssignLessonComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'first-time-login',
        component: FirstTimeLoginComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'edit-membership',
        component: EditMemberShipComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'teacher-instructions',
        component: TeacherInstructionsComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'teacher-bookmark',
        component: TeacherBookmarkComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'current-membership-plan',
        component: CurrentMembershipPlanComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'order-ingredients',
        component: OrderIngredientsComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'add-roster',
        component: AddRosterComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'roster-group-tabs',
        component: RosterGroupTabsComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'archived-classes',
        component: ArchivedClassesComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'roster-assignment-details/:id',
        component: RosterAssignmentDetailsComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'teacher-performance',
        component: TeacherPerformanceComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'teacher-performance/:id',
        component: TeacherPerformanceComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'teacher-homepage',
        component: TeacherHomepageComponent
      },
      {
        path: 'membership-details',
        component: MembershipDetailsComponent,
        canActivate: [TeacherAuthGuard]
    },
    {
        path: 'edit-membership',
        component: EditMemberShipComponent,
        canActivate: [TeacherAuthGuard]
    },
      {
        path: 'billing',
        component: AdminBillingComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'action-activity',
        component: ActionActivityComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'journal',
        component: JournalComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'conversional-sentence',
        component: ConversationalSentenceComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'assessment-question',
        component: AssessmentQuestionComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'cleaning',
        component: CleaningComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'cooking-preparation',
        component: CookingPreparationComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'cooking-technique',
        component: CookingTechniqueComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'introduction',
        component: IntroductionComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'find-country',
        component: FindCountryComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'country-location',
        component: CountryLocationComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'experiment',
        component: ExperimentComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'cleaning',
        component: CleaningComponent,
        canActivate: [TeacherAuthGuard]
      }
      ,
      {
        path: 'serving',
        component: ServingComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'learning-objective',
        component: LearningObjectiveComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'summary-view',
        component: SummaryViewComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'greeting',
        component: GreetingComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'ingredient-list',
        component: IngredientListComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'ingredient/:id',
        component: IngredientComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'social-studies-fact',
        component: SocialStudiesFactComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'recipe-fact',
        component: RecipeFactComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'recipe-content',
        component: RecipeContentComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'linguistic-details',
        component: LinguisticDetailsComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'let-start',
        component: LetStartComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'nutrient-question',
        component: NutrientQuestionComponent,
        canActivate: [TeacherAuthGuard]
      }, {
        path: 'sensory-question',
        component: SensoryQuestionComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'cooking-steps',
        component: CookingStepsComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'safety-hygiene',
        component: SafetyHygieneComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'sensory-exercise',
        component: SensoryExerciseComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'experiment-steps',
        component: ExperimentStepsComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'experiment-description',
        component: ExperimentDescriptionComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'experiment-question',
        component: ExperimentQuestionComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'start-experiment',
        component: StartExperimentComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'discussion-forum',
        component: DiscussionForumComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'discussion-forum-inner',
        component: DiscussionForumInnerComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'explore-all-lesson',
        component: ExploreAllLessonComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'lesson-standard-list',
        component: LessonStandardListComponent,
        canActivate: [TeacherAuthGuard]
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
        canActivate: [TeacherAuthGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule {}