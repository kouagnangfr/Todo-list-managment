import mysql from 'mysql';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'gestionnaire_de_taches'
    });

    connection.connect((error) => {
      if (error) {
        console.error('Erreur de connexion à la base de données :', error);
        res.status(500).json({ message: 'Erreur de connexion à la base de données' });
        return;
      }

      connection.query(
        'SELECT * FROM tasks',
        (error, results) => {
          if (error) {
            console.error('Erreur lors de la récupération des tâches :', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des tâches' });
          } else {
            res.status(200).json({ tasks: results });
          }

          // Fermer la connexion à la base de données après avoir exécuté la requête
          connection.end();
        }
      );
    });
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
