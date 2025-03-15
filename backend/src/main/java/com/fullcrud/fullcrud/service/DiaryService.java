package com.fullcrud.fullcrud.service;

import com.fullcrud.fullcrud.model.DiaryEntry;
import com.fullcrud.fullcrud.repository.DiaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DiaryService {

    @Autowired
    private DiaryRepository diaryRepository;

    public List<DiaryEntry> getAllEntries() {
        return diaryRepository.findAll();
    }

    public DiaryEntry createEntry(DiaryEntry entry) {
        return diaryRepository.save(entry);
    }

    public DiaryEntry updateEntry(Long id, DiaryEntry entry) {
        Optional<DiaryEntry> existingEntry = diaryRepository.findById(id);
        if (existingEntry.isPresent()) {
            DiaryEntry updatedEntry = existingEntry.get();
            updatedEntry.setContent(entry.getContent());
            updatedEntry.setCompleted(entry.isCompleted());
            return diaryRepository.save(updatedEntry);
        }
        return null;
    }

    public void deleteEntry(Long id) {
        diaryRepository.deleteById(id);
    }

    public DiaryEntry markEntryAsCompleted(Long id) {
        Optional<DiaryEntry> existingEntry = diaryRepository.findById(id);
        if (existingEntry.isPresent()) {
            DiaryEntry entry = existingEntry.get();
            entry.setCompleted(true);
            return diaryRepository.save(entry);
        }
        return null;
    }
}

