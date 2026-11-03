package com.campusflow.api.sync;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity @Table(name = "sync_snapshots")
public class SyncSnapshot {
    @Id private UUID userId;
    @Column(nullable = false, columnDefinition = "text") private String tasksJson = "[]";
    @Column(nullable = false, columnDefinition = "text") private String focusLogJson = "[]";
    @Column(nullable = false) private Instant updatedAt = Instant.now();
    protected SyncSnapshot() {}
    public SyncSnapshot(UUID userId, String tasksJson, String focusLogJson) { this.userId=userId; this.tasksJson=tasksJson; this.focusLogJson=focusLogJson; }
    public UUID getUserId() { return userId; }
    public String getTasksJson() { return tasksJson; }
    public String getFocusLogJson() { return focusLogJson; }
    public Instant getUpdatedAt() { return updatedAt; }
    public void replace(String tasks, String log) { tasksJson=tasks; focusLogJson=log; updatedAt=Instant.now(); }
}
