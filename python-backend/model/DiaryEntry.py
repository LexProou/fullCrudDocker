from app import db

class DiaryEntry(db.Model):
    __tablename__ = 'diary_entries'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    content = db.Column(db.String, nullable=False)
    completed = db.Column(db.Boolean, default=False)

    def __init__(self, content, completed=False):
        self.content = content
        self.completed = completed

    def to_dict(self) -> dict:
        return {
            'id': self.id,
            'content': self.content,
            'completed': self.completed
        }