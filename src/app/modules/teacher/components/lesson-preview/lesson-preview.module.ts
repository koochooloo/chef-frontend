import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicExperimentComponent } from './dynamic-experiment/dynamic-experiment.component';
import { ScrollDownComponent } from './scroll-down/scroll-down.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { LessonsFooterComponent } from './lessons-footer/lessons-footer.component';
import { LessonsHeaderbarComponent } from './lessons-headerbar/lessons-headerbar.component';

import { AssessmentQuestionComponent } from './stories/assessment-question/assessment-question.component';
import { CleaningComponent } from './stories/cleaning/cleaning.component';
import { ConversationalSentenceComponent } from './stories/conversational-sentence/conversational-sentence.component';
import { CookingPreparationComponent } from './stories/cooking-preparation/cooking-preparation.component';
import { CookingStepsComponent } from './stories/cooking-steps/cooking-steps.component';
import { CookingTechniqueComponent } from './stories/cooking-technique/cooking-technique.component';

import { ExperimentComponent } from './stories/experiment/experiment.component';

import { GreetingComponent } from './stories/greeting/greeting.component';
import { IngredientComponent } from './stories/ingredient/ingredient.component';
import { IngredientListComponent } from './stories/ingredient-list/ingredient-list.component';

import { LearningObjectiveComponent } from './stories/learning-objective/learning-objective.component';
import { LetStartComponent } from './stories/let-start/let-start.component';
import { LinguisticDetailsComponent } from './stories/linguistic-details/linguistic-details.component';

import { RecipeContentComponent } from './stories/recipe-content/recipe-content.component';
import { RecipeFactComponent } from './stories/recipe-fact/recipe-fact.component';
import { SafetyHygieneComponent } from './stories/safety-hygiene/safety-hygiene.component';

import { ServingComponent } from './stories/serving/serving.component';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { SensoryExerciseComponent } from './stories/sensory-exercise/sensory-exercise.component';
import { ExperimentStepsComponent } from './stories/experiment-steps/experiment-steps.component';
import { ExperimentDescriptionComponent } from './stories/experiment-description/experiment-description.component';
import { StartExperimentComponent } from './stories/start-experiment/start-experiment.component';
import { ExperimentQuestionComponent } from './stories/experiment-question/experiment-question.component';
import { DynamicExperimentQuestionsComponent } from './dynamic-experiment-questions/dynamic-experiment-questions.component';
import { IngreditentNavComponent } from '../ingreditent-nav/ingreditent-nav.component';
import { ChefIntroductionComponent } from './stories/chef-introduction/chef-introduction.component';



// import { IngreditentNavComponent } from '../ingreditent-nav/ingreditent-nav.component';




@NgModule({
  declarations: [LessonsHeaderbarComponent,LessonsFooterComponent,CookingPreparationComponent,
    CleaningComponent, ServingComponent,
    LearningObjectiveComponent,
    GreetingComponent,  RecipeFactComponent,
    RecipeContentComponent, ConversationalSentenceComponent,
    SafetyHygieneComponent, IngredientListComponent,
    IngredientComponent,  CookingTechniqueComponent,
    CookingStepsComponent, ExperimentComponent,
    AssessmentQuestionComponent,
    ScrollDownComponent,DynamicFormComponent, DynamicExperimentComponent,
    LinguisticDetailsComponent,
    LetStartComponent, SensoryExerciseComponent, ExperimentStepsComponent, 
    ExperimentDescriptionComponent, StartExperimentComponent, ExperimentQuestionComponent, 
    DynamicExperimentQuestionsComponent,IngreditentNavComponent, ChefIntroductionComponent],

  imports: [
    CommonModule,
    CKEditorModule,
    RouterModule,
    SharedModule,
    FormsModule
    
  ],
  entryComponents: [],
  exports: [ LessonsFooterComponent,LessonsHeaderbarComponent, IngreditentNavComponent]
})
export class LessonPreviewModule { }
