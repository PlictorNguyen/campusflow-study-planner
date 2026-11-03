package com.campusflow.api.sync;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.security.Principal;
import java.time.Instant;
import java.util.UUID;

@RestController @RequestMapping("/api/sync")
public class SyncController {
    private final SyncSnapshotRepository snapshots;
    private final ObjectMapper mapper;
    public SyncController(SyncSnapshotRepository snapshots,ObjectMapper mapper) { this.snapshots=snapshots; this.mapper=mapper; }
    public record SnapshotBody(JsonNode tasks,JsonNode focusLog) {}
    public record SnapshotResponse(JsonNode tasks,JsonNode focusLog,Instant updatedAt) {}
    @GetMapping public SnapshotResponse get(Principal principal) {
        UUID userId=UUID.fromString(principal.getName());
        return response(snapshots.findById(userId).orElse(new SyncSnapshot(userId,"[]","[]")));
    }
    @PutMapping public SnapshotResponse put(Principal principal,@RequestBody SnapshotBody body) {
        if(body==null || body.tasks()==null || !body.tasks().isArray() || body.focusLog()==null || !body.focusLog().isArray())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"tasks and focusLog must be JSON arrays");
        if(body.tasks().size()>2000 || body.focusLog().size()>20000) throw new ResponseStatusException(HttpStatus.PAYLOAD_TOO_LARGE,"Snapshot is too large");
        UUID userId=UUID.fromString(principal.getName());
        try {
            String tasksJson=mapper.writeValueAsString(body.tasks()), logJson=mapper.writeValueAsString(body.focusLog());
            SyncSnapshot row=snapshots.findById(userId).orElseGet(()->new SyncSnapshot(userId,tasksJson,logJson));
            row.replace(tasksJson,logJson); return response(snapshots.save(row));
        } catch(Exception e) { throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Could not save snapshot"); }
    }
    private SnapshotResponse response(SyncSnapshot row) {
        try { return new SnapshotResponse(mapper.readTree(row.getTasksJson()),mapper.readTree(row.getFocusLogJson()),row.getUpdatedAt()); }
        catch(Exception e) { throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"Saved data could not be read"); }
    }
}
