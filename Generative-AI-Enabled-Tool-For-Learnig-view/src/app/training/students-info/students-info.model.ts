export class StudentsInfo {

public firstName: string = null;
public lastName: string = null;
public email: string = null;
public phone: string = null;
public school: string = null;
public course: string = null;
public department: string = null;
public educationLevel: string = null;
public questionType: string = null;
public numberOfMultipleChoiceQuestions: number = null;
public numberOfElaborationQuestions: number = null;
public academicYear: number = 1;

public openAiChatModel: OpenAiChatModel = new OpenAiChatModel();
}

class OpenAiChatModel {
  public chatModel = null;
  public apiKey = null;
}
