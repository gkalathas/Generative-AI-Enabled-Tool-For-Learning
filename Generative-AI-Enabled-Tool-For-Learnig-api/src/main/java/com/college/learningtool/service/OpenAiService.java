package com.college.learningtool.service;

import com.college.learningtool.dto.StudentInfoDto;
import net.minidev.json.JSONObject;

public interface OpenAiService {
    
    JSONObject generateStudentsTest(StudentInfoDto studentInfoDto);
    
    JSONObject evaluateStudentPerformance(JSONObject test, JSONObject studentAnswers);
}
