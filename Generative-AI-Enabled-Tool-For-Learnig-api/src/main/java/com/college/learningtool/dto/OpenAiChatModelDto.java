package com.college.learningtool.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OpenAiChatModelDto {
    
    private String chatModel;
    
    private String apiKey;
}
