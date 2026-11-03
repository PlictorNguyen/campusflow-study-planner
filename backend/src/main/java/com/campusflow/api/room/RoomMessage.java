package com.campusflow.api.room;

import java.time.Instant;

public record RoomMessage(String type,String displayName,String text,Instant sentAt) {}
