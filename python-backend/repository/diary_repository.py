from model.DiaryEntry import DiaryEntry
from app import db

class DiaryRepository:
    def get_all_entries(self):
        return DiaryEntry.query.all()

    def create_entry(self, content):
        new_entry = DiaryEntry(content=content)
        db.session.add(new_entry)
        db.session.commit()
        return new_entry

    def update_entry(self, entry_id, content=None, completed=None):
        entry = DiaryEntry.query.get(entry_id)
        if entry:
            if content is not None:
                entry.content = content
            if completed is not None:
                entry.completed = completed
            db.session.commit()
        return entry

    def delete_entry(self, entry_id):
        entry = DiaryEntry.query.get(entry_id)
        if entry:
            db.session.delete(entry)
            db.session.commit()

    def mark_entry_as_completed(self, entry_id):
        entry = DiaryEntry.query.get(entry_id)
        if entry:
            entry.completed = True
            db.session.commit()
        return entry