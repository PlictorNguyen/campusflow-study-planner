package com.campusflow.api.ocr;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import java.nio.file.*;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.TimeUnit;

@RestController @RequestMapping("/api/ocr")
public class OcrController {
    public record OcrResult(String extractedText,List<String> lines) {}
    @PostMapping("/timetable")
    public OcrResult readTimetable(@RequestParam("image") MultipartFile image) {
        if(image.isEmpty() || image.getSize()>10_000_000) throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Choose an image under 10 MB");
        String type=image.getContentType()==null?"":image.getContentType();
        if(!type.startsWith("image/")) throw new ResponseStatusException(HttpStatus.UNSUPPORTED_MEDIA_TYPE,"Upload an image file");
        Path file=null;
        try {
            file=Files.createTempFile("campusflow-ocr-",".img"); image.transferTo(file);
            Process process=new ProcessBuilder("tesseract",file.toString(),"stdout","-l","eng+vie").redirectErrorStream(true).start();
            if(!process.waitFor(25,TimeUnit.SECONDS)) { process.destroyForcibly(); throw new ResponseStatusException(HttpStatus.REQUEST_TIMEOUT,"OCR took too long"); }
            String output=new String(process.getInputStream().readAllBytes(),java.nio.charset.StandardCharsets.UTF_8).trim();
            if(process.exitValue()!=0) throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY,"Could not read this image. Try a clearer timetable image.");
            List<String> lines=Arrays.stream(output.split("\R")).map(String::trim).filter(s->!s.isBlank()).toList();
            return new OcrResult(output,lines);
        } catch(ResponseStatusException e) { throw e; }
        catch(Exception e) { throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE,"OCR is unavailable"); }
        finally { if(file!=null) try { Files.deleteIfExists(file); } catch(Exception ignored) {} }
    }
}
