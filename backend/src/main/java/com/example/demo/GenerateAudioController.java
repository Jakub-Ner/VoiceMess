package com.example.demo;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@RestController // This means endpoint returns a JSON response
public class GenerateAudioController {
    private class Message {
        public String message;
        public String author;

        public Message(String message) {
            this.message = message;
            author = "Anonymous";
        }
    }

    public static class Body {
        public String contactId;
        public String message;
    }

    public static class VoiceRequestBody {
        public String text;
        @JsonProperty("model_id")
        public String modelId;
        @JsonProperty("voice_settings")
        public VoiceSettings voiceSettings;

        public static class VoiceSettings {
            public int stability;
            public int similarityBoost;
            public int style;
            @JsonProperty("use_speaker_boost")
            public boolean useSpeakerBoost;

        }
    }

    @PostMapping(
            value="/generate",
            consumes = {MediaType.APPLICATION_JSON_VALUE}
    )
    public Message generate(@RequestBody Body body) {
        System.out.println("contact: " + body.contactId);
        System.out.println("message: " + body.message);

        RestTemplate restTemplate = new RestTemplate();

        String uri = "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM?optimize_streaming_latency=0&output_format=mp3_44100_128"; // or any other uri

        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.add("accept", "audio/mpeg");
        headers.add("xi-api-key", "f484617a6845d3d2c3c7fca0052380a4");

        VoiceRequestBody request = new VoiceRequestBody();
        request.text = "dupa jasiu karuzela elo";
        request.modelId = "eleven_monolingual_v1";

        VoiceRequestBody.VoiceSettings voiceSettings = new VoiceRequestBody.VoiceSettings();
        voiceSettings.stability = 0;
        voiceSettings.similarityBoost = 0;
        voiceSettings.style = 0;
        voiceSettings.useSpeakerBoost = true;


        HttpEntity<String> entity = new HttpEntity<>(request.toString(), headers);
        ResponseEntity<?> result =
                restTemplate.exchange(uri, HttpMethod.POST, entity, String.class);
        System.out.println(result.getBody());

        return new Message("Hello World!");
    }
}