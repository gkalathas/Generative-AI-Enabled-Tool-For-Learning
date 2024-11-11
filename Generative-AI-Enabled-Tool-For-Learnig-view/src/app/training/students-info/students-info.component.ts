import { Component, OnInit } from '@angular/core';
import { StudentsInfo } from './students-info.model';
import { OpenAiService } from './open-ai.service';
import { ToitsuSharedService } from '../../toitsu-shared/toitsu-shared.service';
import { ToitsuBlockUiService } from '../../toitsu-shared/toitsu-blockui/toitsu-block-ui.service';
import { ToitsuToasterService } from '../../toitsu-shared/toitsu-toaster/toitsu-toaster.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import { DialogService } from 'primeng/dynamicdialog';
import { ChangeOpenAirCredentialsComponent } from './change-open-ai-credentials.component';
import { TestStructureDialogComponent } from './test-structure-dialog.component';

@Component({
  selector: 'app-students-info',
  templateUrl: 'students-info.component.html'
})
export class StudentsInfoComponent implements OnInit {

  studentInfo = new StudentsInfo();
  username = null;
  password = null;

  test: any = null;
  suggestions = false;
  evaluation: any = null;

  loginPanelDisplayed = true;
  registerPanelDisplayed = false;
  user: User = new User();

  educationLevels = [
    {value: 'Bachelor', label: 'Bachelor'},
    {value: 'Master', label: 'Master'},
    {value: 'PHD', label: 'PHD'},
  ];

  studentAnswers = {
    multiple_choice_answers: {},
    elaboration_answers: {}
  };

  constructor(
    private openAiService: OpenAiService,
    private toitsuSharedService: ToitsuSharedService,
    private toitsuBlockUiService: ToitsuBlockUiService,
    private toitsuToasterService: ToitsuToasterService,
    private userService: UserService,
    private dialogService: DialogService) {}

  ngOnInit(): void {}

  login() {

    if (!this.username || !this.password) {
      this.toitsuToasterService.showInfoStay('Username and password are required');
    }
    else {
      this.userService.getByUsernameAndPassword(this.username, this.password).subscribe({
        next: (responseData: User) => {
          this.studentInfo.lastName = responseData.lastName;
          this.studentInfo.firstName = responseData.firstName;
          this.studentInfo.phone = responseData.phone;
          this.studentInfo.email = responseData.email;

          this.loginPanelDisplayed = false;
          this.registerPanelDisplayed = false;
        },
        error: (responseError) => {
          this.toitsuToasterService.apiValidationErrors(responseError);
        }
      });
    }
  }

  generateNewTest() {
    this.userService.getByUsernameAndPassword(this.username, this.password).subscribe({
      next: (responseData: User) => {
        this.studentInfo.lastName = responseData.lastName;
        this.studentInfo.firstName = responseData.firstName;
        this.studentInfo.phone = responseData.phone;
        this.studentInfo.email = responseData.email;

        this.loginPanelDisplayed = false;
        this.registerPanelDisplayed = false;
        this.test = null;
        this.suggestions = false;
      },
      error: (responseError) => {
        this.toitsuToasterService.apiValidationErrors(responseError);
      }
    });
  }

  goToRegister() {
    this.loginPanelDisplayed = false;
    this.registerPanelDisplayed = true;
  }

  goToLogin() {

    this.studentInfo.lastName = null;
    this.studentInfo.firstName = null;
    this.studentInfo.phone = null;
    this.studentInfo.email = null;

    this.username = null;
    this.password = null;

    this.user = new User();

    this.loginPanelDisplayed = true;
    this.registerPanelDisplayed = false;
  }

  changeModel() {
    const ref = this.dialogService.open(ChangeOpenAirCredentialsComponent, {
      header: 'OpenAi Credentials',
      width: '40%',
    });

    ref.onClose.subscribe((result) => {
      if (result) {
        this.studentInfo.openAiChatModel.chatModel = result.chatModel;
        this.studentInfo.openAiChatModel.apiKey = result.apiKey;
      }
    });
  }

  register() {

    if (!this.user.username || !this.user.password) {
      this.toitsuToasterService.showInfoStay('Username and password are required');
    }
    else {
      this.userService.saveUser(this.user).subscribe({
        next: (responseData: User) => {
          this.studentInfo.lastName = responseData.lastName;
          this.studentInfo.firstName = responseData.firstName;
          this.studentInfo.phone = responseData.phone;
          this.studentInfo.email = responseData.email;

          this.loginPanelDisplayed = false;
          this.registerPanelDisplayed = false;
        },
        error: (responseError) => {
          this.toitsuToasterService.apiValidationErrors(responseError);
        }
      });
    }
  }

  generateTest() {
    const ref = this.dialogService.open(TestStructureDialogComponent, {
      header: 'Test Structure',
      width: '40%'
    });
    ref.onClose.subscribe((result) => {
      if (result) {

        this.studentInfo.questionType = result.questionType;
        this.studentInfo.numberOfMultipleChoiceQuestions = result.numberOfMultipleChoiceQuestions;
        this.studentInfo.numberOfElaborationQuestions = result.numberOfElaborationQuestions;
        this.studentInfo.course = result.course;

        this.toitsuToasterService.clearMessages();
        this.toitsuBlockUiService.blockUi();

        this.openAiService.generateTest(this.studentInfo).subscribe({
          next: (responseData) => {
            console.log(responseData);
            const result = responseData['result'];

            if (result) {
              if (this.studentInfo.questionType === 'multiple_choice') {
                this.test = this.parseMultipleChoiceQuestions(result);
              } else if (this.studentInfo.questionType === 'elaboration') {
                this.test = this.parseElaborationQuestions(result);
              } else {
                this.test = this.parseGeneratedTest(result);
              }
              this.composeTestFields();
            }
          },
          error: (responseError) => {
            this.toitsuToasterService.apiValidationErrors(responseError);
          }
        }).add(() => {
          this.toitsuBlockUiService.unblockUi();
        });
      }
    });
  }

  evaluateTest() {

    const data = {
      generatedTest: this.test,
      studentAnswers: this.studentAnswers
    };
    console.log(data);

    this.toitsuToasterService.clearMessages();
    this.toitsuBlockUiService.blockUi();

    this.openAiService.evaluateTest(data).subscribe({
      next: (responseData) => {

        if (responseData['result']) {

          const evaluationFullText = responseData['result'].slice(57);
          const unwantedTextIndex = (evaluationFullText) ? evaluationFullText.indexOf('\', properties=') : -1;
          let clearedEvaluationSting = '';
          if (unwantedTextIndex !== -1) {
            clearedEvaluationSting = evaluationFullText.substring(0, unwantedTextIndex).trim();
          }

          console.log('responseDataResult', responseData['result']);
          console.log('evaluationFullText', evaluationFullText);
          console.log('unwantedTextIndex', unwantedTextIndex);
          console.log('clearedEvaluationSting', clearedEvaluationSting);

          this.evaluation = this.parseEvaluationString(clearedEvaluationSting);
          this.suggestions = true;
        }
      },
      error: (responseError) => {
        this.toitsuToasterService.apiValidationErrors(responseError);
      }
    }).add(() => {
      this.toitsuBlockUiService.unblockUi();
    });
  }

  parseEvaluationString(evaluationString: string) {
    const evaluation = {
      totalScore: '',
      areasOfWeakness: [],
      suggestionsForImprovement: []
    };

    const totalScoreMatch = evaluationString.match(/Total score:\s*([\d.]+%)/);
    if (totalScoreMatch) {
      evaluation.totalScore = totalScoreMatch[1];
    }

    const areasOfWeaknessMatch = evaluationString.match(/2\. Areas of weakness:\s*((?:- .+\s*)*)/);
    if (areasOfWeaknessMatch) {
      evaluation.areasOfWeakness = areasOfWeaknessMatch[1].split('\n').map(line => line.trim()).filter(line => line.startsWith('-')).map(line => line.slice(2));
    }

    const suggestionsForImprovementMatch = evaluationString.match(/3\. Suggestions for improvement:\s*((?:- .+\s*)*)/);
    if (suggestionsForImprovementMatch) {
      evaluation.suggestionsForImprovement = suggestionsForImprovementMatch[1].split('\n').map(line => line.trim()).filter(line => line.startsWith('-')).map(line => line.slice(2));
    }

    console.log(evaluation);

    return evaluation;
  }

  parseMultipleChoiceQuestions(testString: string): any {
    const test = {
      multiple_choice_questions: []
    };

    // Remove the prefix if it starts with "Generation{assistantMessage=AssistantMessage{content='"
    let cleanedString = testString;
    if (testString.startsWith('Generation{assistantMessage=AssistantMessage{content=\'')) {
      cleanedString = testString.replace('Generation{assistantMessage=AssistantMessage{content=\'', '').trim();
    }

    // Remove metadata starting from ', properties='
    cleanedString = cleanedString.split(', properties=')[0].trim();

    // Split questions based on numbered format (e.g., "1.", "2.")
    const mcQuestions = cleanedString.split(/\n\s*\n|\d+\.\s/).filter(question => question.trim().length > 0);

    mcQuestions.forEach((question) => {
      // Split each question and its options
      const lines = question.split('\n').filter(line => line.trim().length > 0);

      if (lines.length > 0) {
        const q = {
          question: lines[0].trim(),
          options: lines.slice(1).map(option => option.trim())
        };
        test.multiple_choice_questions.push(q);
      }
    });

    return test;
  }

  parseElaborationQuestions(testString: string): any {
    const test = {
      elaboration_questions: []
    };

    try {
      // Remove the metadata at the end
      let cleanedString = testString.split(', properties=')[0].trim();

      // Remove the prefix if it exists
      if (cleanedString.startsWith('Generation{assistantMessage=AssistantMessage{content=\'')) {
        cleanedString = cleanedString.replace('Generation{assistantMessage=AssistantMessage{content=\'', '').trim();
      }

      // Remove the "### Elaboration Questions:" header if it exists
      if (cleanedString.includes('### Elaboration Questions:')) {
        cleanedString = cleanedString.replace('### Elaboration Questions:', '').trim();
      }

      // Split the questions based on numbered format (e.g., "1.", "2.")
      const elQuestions = cleanedString.split(/\d+\.\s/).filter(question => question.trim().length > 0);

      // Iterate through questions and add them to the response
      elQuestions.forEach((question) => {
        if (question.trim().length > 0) {
          test.elaboration_questions.push({ question: question.trim() });
        }
      });

      console.log('Parsed Test Object:', test);
    } catch (error) {
      console.error('Error parsing elaboration questions:', error);
    }

    return test;
  }

  parseGeneratedTest(testString: string): any {
    const test = {
      multiple_choice_questions: [],
      elaboration_questions: []
    };

    const parts = testString.split('### Elaboration Questions:');
    const mcQuestions = parts[0].split('### Multiple-Choice Questions:')[1].trim().split('\n\n');
    const elQuestionsString = parts[1].trim().split('\n\n');

    mcQuestions.forEach((question, index) => {
      const lines = question.split('\n');
      const q = {
        question: lines[0],
        options: lines.slice(1)
      };
      test.multiple_choice_questions.push(q);
    });

    const elQuestions = elQuestionsString[0].split(/(?=\d+\.\s)/);

    elQuestions.forEach((question, index) => {
      if (question.trim().length > 0) {
        test.elaboration_questions.push({ question: question.trim() });
      }
    });

    const lastIndex = test.elaboration_questions.length - 1;
    if (test.elaboration_questions[lastIndex]) {
      const unwantedTextIndex = test.elaboration_questions[lastIndex].question.indexOf('\', properties=');
      if (unwantedTextIndex !== -1) {
        test.elaboration_questions[lastIndex].question = test.elaboration_questions[lastIndex].question.substring(0, unwantedTextIndex).trim();
      }
    }

    return test;
  }

  composeTestFields(): void {

    if (this.studentInfo.questionType === 'multiple_choice') {
      this.test.multiple_choice_questions.forEach((question, index) => {
        this.studentAnswers.multiple_choice_answers[index + 1] = '';
      });
    } else if (this.studentInfo.questionType === 'elaboration') {
      this.test.elaboration_questions.forEach((question, index) => {
        this.studentAnswers.elaboration_answers[index + 1] = '';
      });
    } else {
      this.test.multiple_choice_questions.forEach((question, index) => {
        this.studentAnswers.multiple_choice_answers[index + 1] = '';
      });
      this.test.elaboration_questions.forEach((question, index) => {
        this.studentAnswers.elaboration_answers[index + 1] = '';
      });
    }
  }
}
