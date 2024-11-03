import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gestionnaire_de_taches',
});

// Vérification de la connection
connection.connect((error) => {
    if (error) {
        console.error('Erreur de connexion à la base de données:', error);
    } else {
        console.log('Connexion à la base de données réussie');
    }
});

export default function handler(req, res) {
    if (req.method === 'PUT') {
      const { id, title, description, date, important, completed } = req.body;
  
      if (!id) {
        return res.status(400).json({ error: 'L\'ID de la tâche est requis' });
      }
  
      const query = 'UPDATE tasks SET title = ?, description = ?, date = ?, important = ?, completed = ? WHERE id = ?';
  
      connection.query(query, [title, description, date, important, completed, id], (error, results) => {
        if (error) {
          console.error('Error updating task:', error);
          return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: 'Tâche non trouvée' });
        }
        console.log('Task updated successfully');
        return res.status(200).json({ message: 'Tâche mise à jour avec succès' });
      });
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  }
