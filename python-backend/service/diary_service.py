class DiaryService:
    def __init__(self, repository):
        self.repository = repository

    def create_entry(self, content):
        return self.repository.create_entry(content)

    def get_all_entries(self):
        return self.repository.get_all_entries()

    def update_entry(self, entry_id, content=None, completed=None):
        return self.repository.update_entry(entry_id, content, completed)

    def delete_entry(self, entry_id):
        self.repository.delete_entry(entry_id)

    def mark_entry_as_completed(self, entry_id):
        return self.repository.mark_entry_as_completed(entry_id)