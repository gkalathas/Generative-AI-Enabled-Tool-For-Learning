package com.college.learningtool.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class StudentInfoDto {
    
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String school;
    private String department;
    private String course;
    private String educationLevel; // Values: "bachelor", "master", "phd"
    private Integer academicYear;
    private String questionType; // Values: "multiple_choice", "elaboration", "both"
    private Integer numberOfMultipleChoiceQuestions;
    private Integer numberOfElaborationQuestions;
    
    private OpenAiChatModelDto openAiChatModel;
}
