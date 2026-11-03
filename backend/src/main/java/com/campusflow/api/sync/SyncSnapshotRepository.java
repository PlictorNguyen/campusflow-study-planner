package com.campusflow.api.sync;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface SyncSnapshotRepository extends JpaRepository<SyncSnapshot, UUID> {}
