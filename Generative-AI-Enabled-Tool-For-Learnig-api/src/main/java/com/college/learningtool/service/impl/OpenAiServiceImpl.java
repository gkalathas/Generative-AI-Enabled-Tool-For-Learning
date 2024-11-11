package com.college.learningtool.service.impl;

import com.college.learningtool.dto.StudentInfoDto;
import com.college.learningtool.service.OpenAiService;
import net.minidev.json.JSONObject;
import org.jetbrains.annotations.Nullable;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.model.Generation;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.ai.openai.api.OpenAiApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class OpenAiServiceImpl implements OpenAiService {

    private final RestTemplate restTemplate;

    @Value("${spring.ai.openai.api-key}")
    private String openAiKey;

    @Autowired
    public OpenAiServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public JSONObject generateStudentsTest(StudentInfoDto studentInfoDto) {

        // Generate the prompt with the extended information
        String prompt = generatePrompt(studentInfoDto.getFirstName(),
                studentInfoDto.getLastName(), studentInfoDto.getSchool(),
                studentInfoDto.getDepartment(), studentInfoDto.getCourse(), studentInfoDto.getAcademicYear(),
                studentInfoDto.getEducationLevel(), studentInfoDto.getQuestionType(),
                studentInfoDto.getNumberOfMultipleChoiceQuestions(), studentInfoDto.getNumberOfElaborationQuestions());

        Prompt openAiPrompt = new Prompt(prompt,
                OpenAiChatOptions.builder()
                        .withModel(studentInfoDto.getOpenAiChatModel() != null &&
                                studentInfoDto.getOpenAiChatModel().getChatModel() != null &&
                                !studentInfoDto.getOpenAiChatModel().getChatModel().isEmpty()
                                ? studentInfoDto.getOpenAiChatModel().getChatModel() : "gpt-3.5-turbo")
                        .withTemperature(0.7F)
                        .withMaxTokens(1500)
                        .build());

        String openNewAiKey = studentInfoDto.getOpenAiChatModel() != null &&
                studentInfoDto.getOpenAiChatModel().getApiKey() != null &&
                !studentInfoDto.getOpenAiChatModel().getApiKey().isEmpty()
                ? studentInfoDto.getOpenAiChatModel().getApiKey() : openAiKey;
        ChatModel chatModel = new OpenAiChatModel(new OpenAiApi(openNewAiKey));

        JSONObject test = new JSONObject();

        try {
            test = getJsonObject(openAiPrompt, chatModel);
        } catch (Exception e) {
            test = null;
        }

        return test;
    }

    @Override
    public JSONObject evaluateStudentPerformance(JSONObject test, JSONObject studentAnswers) {
        String prompt = generateEvaluationPrompt(test, studentAnswers);

        Prompt openAiPrompt = new Prompt(prompt,
                OpenAiChatOptions.builder()
                        .withModel("gpt-3.5-turbo")
                        .withTemperature(0.7F)
                        .withMaxTokens(1500)
                        .build());

        ChatModel chatModel = new OpenAiChatModel(new OpenAiApi(openAiKey));

        try {
            JSONObject object = getJsonObject(openAiPrompt, chatModel);
            if (object != null) return object;
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

    @Nullable
    private JSONObject getJsonObject(Prompt openAiPrompt, ChatModel chatModel) {
        
        // Http call to openai api
        List<Generation> response = chatModel.call(openAiPrompt).getResults();
        if (response != null && !response.isEmpty()) {
            String resultText = response.getFirst().toString();

            JSONObject object = new JSONObject();

            object.put("result", resultText);

            return object;
        }
        return null;
    }

    private String generateEvaluationPrompt(JSONObject generatedTest, JSONObject studentAnswers) {
        return String.format("""
                Evaluate the student's performance based on the test and the provided answers.
                
                Test:
                %s
                
                Student's Answers:
                %s
                
                Please provide:
                1. A total score as a percentage.
                2. Identification of areas of weakness.
                3. Suggestions for improvement.
                """, generatedTest.toString(), studentAnswers.toString());
    }

    private String getExampleQuestions(String subject, String difficulty, String questionType, int mcqCount, int elaborationCount) {
        // A map to hold questions based on subject and difficulty levels
        Map<String, Map<String, String>> subjectExamples = new HashMap<>();

        // Example questions for different difficulty levels for Biology
        Map<String, String> biologyExamples = new HashMap<>();
        biologyExamples.put("basic", """
                ### Multiple-Choice Questions:
                1. What is the powerhouse of the cell?
                A. Nucleus
                B. Mitochondria
                C. Ribosome
                D. Endoplasmic Reticulum
                
                2. Which process is used by plants to convert sunlight into food?
                A. Photosynthesis
                B. Respiration
                C. Fermentation
                D. Transpiration
                
                ### Elaboration Questions:
                1. Explain the basic structure of a plant cell.
                2. Describe the water cycle in nature.
                """);
        biologyExamples.put("intermediate", """
                ### Multiple-Choice Questions:
                1. Which stage of cellular respiration produces the most ATP?
                A. Glycolysis
                B. Krebs Cycle
                C. Electron Transport Chain
                D. Fermentation
                
                2. What is the main function of ribosomal RNA?
                A. Catalyze protein synthesis
                B. Transport amino acids
                C. Regulate gene expression
                D. Form the structure of ribosomes
                
                ### Elaboration Questions:
                1. Compare and contrast mitosis and meiosis.
                2. Discuss the role of enzymes in metabolic pathways.
                """);
        biologyExamples.put("advanced", """
                ### Multiple-Choice Questions:
                1. Which of the following best describes the mechanism of action of CRISPR-Cas9?
                A. It inhibits ribosome function.
                B. It introduces double-strand breaks in DNA at specific sites.
                C. It prevents the formation of mRNA.
                D. It accelerates the rate of glycolysis.
                
                2. How does the lac operon regulate gene expression in prokaryotes?
                A. By phosphorylation of RNA polymerase.
                B. Through allosteric inhibition of the repressor protein.
                C. Via binding of a repressor to the operator sequence.
                D. By modifying the promoter region.
                
                ### Elaboration Questions:
                1. Explain the role of epigenetic modifications in gene expression regulation.
                2. Analyze the ethical implications of genetic engineering in agriculture.
                """);
        Map<String, String> csExamples = new HashMap<>();
        csExamples.put("basic", """
                ### Multiple-Choice Questions:
                1. What is the time complexity of binary search?
                A. O(n)
                B. O(log n)
                C. O(n log n)
                D. O(1)
                
                2. Which of the following is a commonly used programming language for web development?
                A. HTML
                B. Python
                C. CSS
                D. JavaScript
                
                ### Elaboration Questions:
                1. Describe the concept of a loop in programming.
                2. Explain the purpose of a function in a programming language.
                """);
        csExamples.put("intermediate", """
                ### Multiple-Choice Questions:
                1. What is the primary use of a hash table?
                A. To store data sequentially
                B. To implement queues
                C. For fast data retrieval using key-value pairs
                D. To handle recursive functions
                
                2. Which algorithm is used to find the shortest path in a graph?
                A. Quick Sort
                B. Dijkstra's Algorithm
                C. Depth-First Search
                D. Merge Sort
                
                ### Elaboration Questions:
                1. Discuss the pros and cons of different sorting algorithms.
                2. Explain the concept of dynamic programming with an example.
                """);
        csExamples.put("advanced", """
                ### Multiple-Choice Questions:
                1. What is the computational complexity of solving the Travelling Salesman Problem (TSP) using dynamic programming?
                A. O(n)
                B. O(n^2)
                C. O(2^n)
                D. O(n!)
                
                2. Which of the following techniques is commonly used in machine learning for feature selection?
                A. Cross-validation
                B. Regularization
                C. Backpropagation
                D. Stochastic Gradient Descent
                
                ### Elaboration Questions:
                1. Describe the importance of overfitting and underfitting in machine learning models.
                2. Analyze the use of convolutional neural networks in image recognition.
                """);
        subjectExamples.put("Computer Science", csExamples);
        subjectExamples.put("Biology", biologyExamples);
        // Similar examples for Computer Science, History, etc., would be defined here...

        // Get the example questions for the given subject and difficulty
        String selectedExamples = subjectExamples.getOrDefault(subject, new HashMap<>())
                .getOrDefault(difficulty, "");

        // Split the questions into multiple-choice and elaboration parts
        String[] parts = selectedExamples.split("### Elaboration Questions:");
        String mcqPart = parts.length > 0 ? parts[0].trim() : "";
        String elaborationPart = parts.length > 1 ? parts[1].trim() : "";

        // Generate the final set of questions based on the question type and count
        StringBuilder finalQuestions = new StringBuilder();

        if ("multiple_choice".equals(questionType) || "both".equals(questionType)) {
            finalQuestions.append("### Multiple-Choice Questions:\n");
            finalQuestions.append(getSelectedQuestions(mcqPart, mcqCount));
        }

        if ("elaboration".equals(questionType) || "both".equals(questionType)) {
            if (!finalQuestions.isEmpty()) {
                finalQuestions.append("\n\n"); // Add some space if both types are included
            }
            finalQuestions.append("### Elaboration Questions:\n");
            finalQuestions.append(getSelectedQuestions(elaborationPart, elaborationCount));
        }

        // Return the formatted set of questions
        return finalQuestions.toString();
    }

    private String getSelectedQuestions(String questionBlock, int count) {
        if (questionBlock == null || questionBlock.isEmpty()) {
            return "";
        }

        String[] questions = questionBlock.split("\n\n");
        StringBuilder selectedQuestions = new StringBuilder();

        // Pick the requested number of questions or as many as available
        for (int i = 0; i < Math.min(count, questions.length); i++) {
            selectedQuestions.append(questions[i].trim()).append("\n\n");
        }

        return selectedQuestions.toString().trim();
    }


    private String generatePrompt(String name, String lastName, String college, String department, String course, Integer academicYear,
                                  String educationLevel, String questionType, Integer mcqCount, Integer elaborationCount) {

        // Adjust difficulty based on a combination of education level and academic year
        String difficulty = calculateDifficulty(educationLevel, academicYear);

        String questionRequirement = "";
        String topic = (course != null && !course.isEmpty()) ? course : department;

        // Build question requirements based on student's choice
        if ("multiple_choice".equals(questionType) || "both".equals(questionType)) {
            questionRequirement += String.format("Please generate %d multiple-choice questions that are specific to the topic '%s' and test key concepts and knowledge related to it. ", mcqCount, topic);
        }
        if ("elaboration".equals(questionType) || "both".equals(questionType)) {
            questionRequirement += String.format("Please generate %d elaboration questions that require detailed answers and are specific to the topic '%s'. ", elaborationCount, topic);
        }

        // Generate examples for the subject
        String examples = getExampleQuestions(department, difficulty, questionType, mcqCount, elaborationCount);

        return String.format("""
                Create a knowledge test based on the following student's information:
                
                Name: %s
                Last Name: %s
                College: %s
                Department: %s
                Course: %s
                Academic Year: %s
                Education Level: %s (%s)
                
                The test should match the requested difficulty level: %s. %s
                
                Here are some example questions to guide the format and complexity:
                
                %s
                
                Now, generate similar questions based on the student's information provided above.
                """, name, lastName, college, department, course != null ? course : "General", academicYear, educationLevel, difficulty, difficulty, questionRequirement, examples);
    }

    private String calculateDifficulty(String educationLevel, Integer academicYear) {
        // Determine difficulty based on a combination of education level and academic year
        switch (educationLevel.toLowerCase()) {
            case "bachelor":
                if (academicYear <= 2) {
                    return "basic";
                } else {
                    return "intermediate";
                }
            case "master":
                if (academicYear == 1) {
                    return "intermediate";
                } else {
                    return "advanced";
                }
            case "phd":
                return "advanced";
            default:
                return "basic"; // Default difficulty level
        }
    }

}
