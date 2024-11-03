import mysql from 'mysql';

export default function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.query;
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'gestionnaire_de_taches'
    });

    // Supprimer la tâche de la base de données
    connection.query(
      'DELETE FROM tasks WHERE id = ?',
      [id],
      (error, results) => {
        if (error) {
          console.error('Erreur lors de la suppression de la tâche :', error);
          res.status(500).json({ message: 'Erreur lors de la suppression de la tâche' });
        } else {
          res.status(200).json({ message: 'Tâche supprimée avec succès' });
        }
      }
    );

    connection.end();
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
