package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ConservationController {
	 @Autowired
	 private SimpMessagingTemplate simpMessagingTemplate;
	 @MessageMapping("/chat/{conservationId}")
	    public void sendMessage(@DestinationVariable int conservationId, MessageDto message) {
	        System.out.println("handling send message: " + message.getMessage() + " to conservation id: " + conservationId);
	        //Add message to database
            simpMessagingTemplate.convertAndSend("/topic/conservation" + String.valueOf(conservationId), message);

	 }
}
