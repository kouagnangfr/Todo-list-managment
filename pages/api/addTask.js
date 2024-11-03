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
    if (req.method === 'POST') {
        const { title, description, date, important, completed } = req.body;

        const query = 'INSERT INTO tasks (title, description, date, important, completed) VALUES (?, ?, ?, ?, ?)';
        connection.query(query, [title, description, date, important, completed], (error, results) => {
            if (error) {
                console.error('Error adding task:', error);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                console.log('Task added successfully');
                res.status(200).json({ message: 'Task added successfully' });
            }
        });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
