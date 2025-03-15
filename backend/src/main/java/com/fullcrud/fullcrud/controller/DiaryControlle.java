package com.fullcrud.fullcrud.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fullcrud.fullcrud.model.DiaryEntry;
import com.fullcrud.fullcrud.service.DiaryService;

@RestController
@RequestMapping("/api/diary")
@CrossOrigin(origins = "http://localhost:5173")
class DiaryController {

    @Autowired
    private DiaryService diaryService;

    @GetMapping("/entries")
    public ResponseEntity<List<DiaryEntry>> getAllEntries() {
        return new ResponseEntity<>(diaryService.getAllEntries(), HttpStatus.OK);
    }

    @PostMapping("/entry")
    public ResponseEntity<DiaryEntry> createEntry(@RequestBody DiaryEntry entry) {
        return new ResponseEntity<>(diaryService.createEntry(entry), HttpStatus.CREATED);
    }

    @PutMapping("/entry/{id}")
    public ResponseEntity<DiaryEntry> updateEntry(@PathVariable Long id, @RequestBody DiaryEntry entry) {
        return new ResponseEntity<>(diaryService.updateEntry(id, entry), HttpStatus.OK);
    }

    @DeleteMapping("/entry/{id}")
    public ResponseEntity<Void> deleteEntry(@PathVariable Long id) {
        diaryService.deleteEntry(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/entry/{id}/complete")
    public ResponseEntity<DiaryEntry> markEntryAsCompleted(@PathVariable Long id) {
        return new ResponseEntity<>(diaryService.markEntryAsCompleted(id), HttpStatus.OK);
    }
}

