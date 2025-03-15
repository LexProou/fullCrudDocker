package com.fullcrud.fullcrud.repository;

import com.fullcrud.fullcrud.model.DiaryEntry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiaryRepository extends JpaRepository<DiaryEntry, Long> {
}
