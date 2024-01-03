from db.DBConnectionFactory import DBConnectionFactory

class dbStore:

    def getConnection(self):
        connection = DBConnectionFactory.getInstance(DBConnectionFactory)
        return connection.getConnection()

    def closeConnection(self, connection):
        dbcf = DBConnectionFactory.getInstance(DBConnectionFactory)
        dbcf.closeConnection(connection)

    def addClub(self, club_id, club_name, faculty_incharge):
        connection = self.getConnection()
        cursor = connection.cursor()

        cursor.execute("INSERT INTO clubs (club_id, club_name, faculty_incharge) VALUES (%s, %s, %s)",
                       (club_id, club_name, faculty_incharge))

        connection.commit()
        cursor.close()

    def get_clubs(self):
        connection = self.getConnection()
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM clubs")
        clubs_data = cursor.fetchall()
        cursor.close()

        clubs = []
        for row in clubs_data:
            club = {
                'club_id': row[0],
                'club_name': row[1],
                'faculty_incharge': row[2]
            }
            clubs.append(club)

        return clubs

    def getClubById(self, club_id):
        connection = self.getConnection()
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM clubs WHERE club_id = %s", (club_id,))
        club_data = cursor.fetchone()
        cursor.close()

        if club_data:
            club = {
                'club_id': club_data[0],
                'club_name': club_data[1],
                'faculty_incharge': club_data[2]
            }
            return club
        else:
            return None

    def updateClub(self, club_id, club_name, faculty_incharge):
        connection = self.getConnection()
        cursor = connection.cursor()

        cursor.execute("UPDATE clubs SET club_name = %s, faculty_incharge = %s WHERE club_id = %s",
                       (club_name, faculty_incharge, club_id))

        connection.commit()
        cursor.close()

    def deleteClub(self, club_id):
        connection = self.getConnection()
        cursor = connection.cursor()

        cursor.execute("DELETE FROM clubs WHERE club_id = %s", (club_id,))

        connection.commit()
        cursor.close()

