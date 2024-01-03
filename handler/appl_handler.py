from flask import render_template, request, jsonify
from db.dbStore import dbStore

class ApplicationHandler:
    def __init__(self):
        self.db = dbStore()

    def index(self):
        clubs = self.db.get_clubs()
        return jsonify(clubs)

    def get_clubs(self):
        clubs = self.db.get_clubs()
        return jsonify(clubs)

    def add_club(self):
        data = request.get_json()
        club_name = data.get('club_name')
        faculty_incharge = data.get('faculty_incharge')

        if club_name and faculty_incharge:
        
            club_id = data.get('club_id')
            self.db.addClub(club_id, club_name, faculty_incharge)
            return jsonify({"message": "Club added successfully"})
        else:
            return jsonify({"error": "Invalid data provided"}), 400

    def get_club_by_id(self, club_id):
        club = self.db.getClubById(club_id)
        if club:
            return jsonify(club)
        else:
            return jsonify({"error": "Club not found"}), 404

    def update_club(self, club_id):
        data = request.get_json()
        club_name = data.get('club_name')
        faculty_incharge = data.get('faculty_incharge')

        if club_name and faculty_incharge:
            self.db.updateClub(club_id, club_name, faculty_incharge)
            return jsonify({"message": "Club updated successfully"})
        else:
            return jsonify({"error": "Invalid data provided"}), 400

    def delete_club(self, club_id):
        self.db.deleteClub(club_id)
        return jsonify({"message": "Club deleted successfully"})
    
   