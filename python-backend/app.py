from flask import Flask, jsonify, request, abort
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    # Configure PostgreSQL connection
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/db_name'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    with app.app_context():
        from repository.diary_repository import DiaryRepository
        from service.diary_service import DiaryService

        repository = DiaryRepository()
        service = DiaryService(repository)

        @app.route('/', methods=['GET'])
        def home():
            return "Welcome to the Diary API!", 200

        @app.route('/api/diary/entries', methods=['GET'])
        def get_all_entries():
            entries = service.get_all_entries()
            return jsonify([entry.to_dict() for entry in entries]), 200

        @app.route('/api/diary/entry', methods=['POST'])
        def create_entry():
            if not request.json or 'content' not in request.json:
                abort(400, description="Content is required")
            entry = service.create_entry(request.json['content'])
            return jsonify(entry.to_dict()), 201

        @app.route('/api/diary/entry/<int:entry_id>', methods=['PUT'])
        def update_entry(entry_id):
            if not request.json:
                abort(400, description="Request body is required")
            entry = service.update_entry(
                entry_id,
                content=request.json.get('content'),
                completed=request.json.get('completed')
            )
            if entry is None:
                abort(404, description="Entry not found")
            return jsonify(entry.to_dict()), 200

        @app.route('/api/diary/entry/<int:entry_id>', methods=['DELETE'])
        def delete_entry(entry_id):
            service.delete_entry(entry_id)
            return '', 204

        @app.route('/api/diary/entry/<int:entry_id>/complete', methods=['PUT'])
        def mark_entry_as_completed(entry_id):
            entry = service.mark_entry_as_completed(entry_id)
            if entry is None:
                abort(404, description="Entry not found")
            return jsonify(entry.to_dict()), 200

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)