import mysql.connector

class DBConnectionFactory:
    dbsf = None

    def getInstance(self):
        if self.dbsf is None:
            self.dbsf = DBConnectionFactory()
        return self.dbsf

    def getConnection(self):
        try:
            connection = mysql.connector.connect(
                host='localhost',
                database='database_name',
                user='user',
                password='password'
            )
            print("Connected to MySQL database")
            return connection
        except mysql.connector.Error as e:
            # Handle connection error
            print(f"Connection error: {e}")
            return None

    def closeConnection(self, connection):
        try:
            connection.close()
        except mysql.connector.Error as e:
            # Handle closing error
            print(f"Error while closing connection: {e}")


