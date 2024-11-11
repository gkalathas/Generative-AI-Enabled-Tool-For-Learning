package com.college.learningtool.controller;

import com.college.learningtool.dto.StudentInfoDto;
import com.college.learningtool.service.OpenAiService;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/openai")
@CrossOrigin(origins = "http://localhost:4200")
public class OpenAiController {
    
    @Autowired
    private OpenAiService openAiService;
    
    @PostMapping("/generate")
    public JSONObject generateTest(@RequestBody StudentInfoDto studentInfoDto) {
        return openAiService.generateStudentsTest(studentInfoDto);
    }
    
    @PostMapping("/evaluate")
    public JSONObject evaluateTest(@RequestBody LinkedHashMap<String, Object> testAndAnswers) {
        JSONObject test = new JSONObject((Map<String, Object>) testAndAnswers.get("generatedTest"));
        JSONObject answers = new JSONObject((Map<String, Object>) testAndAnswers.get("studentAnswers"));
        return openAiService.evaluateStudentPerformance(test, answers);
    }
}
