package com.campusflow.api.room;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import java.security.Principal;
import java.time.Instant;

@Controller
public class RoomMessageController {
    private final SimpMessagingTemplate messages;
    public RoomMessageController(SimpMessagingTemplate messages) { this.messages=messages; }
    @MessageMapping("/room/{code}")
    public void publish(@DestinationVariable String code,RoomMessage input,Principal principal) {
        if(code==null || !code.matches("[A-Z0-9]{6,12}") || input==null || input.type()==null) return;
        String type=input.type();
        if(!type.matches("join|leave|chat|timer|presence")) return;
        String text=input.text()==null?"":input.text().strip();
        if(text.length()>300) text=text.substring(0,300);
        RoomMessage safe=new RoomMessage(type,input.displayName()==null?"Student":input.displayName().substring(0,Math.min(40,input.displayName().length())),text,Instant.now());
        messages.convertAndSend("/topic/room/"+code,safe);
    }
}
