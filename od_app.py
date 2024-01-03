from flask import Flask, jsonify
from handler.appl_handler import ApplicationHandler
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
handler = ApplicationHandler()

@app.route('/', methods=['GET', 'POST'])
def index():
    try:
        return handler.index()
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/clubs', methods=['GET'])
def get_clubs():
    try:
        return handler.get_clubs()
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/clubs/add', methods=['POST'])
def add_club():
    try:
        return handler.add_club()
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/clubs/<int:club_id>', methods=['GET'])
def get_club_by_id(club_id):
    try:
        return handler.get_club_by_id(club_id)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/clubs/update/<int:club_id>', methods=['PUT'])
def update_club(club_id):
    try:
        return handler.update_club(club_id)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/clubs/delete/<int:club_id>', methods=['DELETE'])
def delete_club(club_id):
    try:
        return handler.delete_club(club_id)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
