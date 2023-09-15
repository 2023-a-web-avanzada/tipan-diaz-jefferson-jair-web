const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const PORT = 3000;

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ClinicaDB'
});

db.connect(error => {
    if (error) throw error;
    console.log("Conexión a la base de datos establecida.");
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// CRUD para Paciente
app.get('/pacientes', (req, res) => {
    db.query('SELECT * FROM Paciente', (error, results) => {
        if (error) return res.status(500).json({ error });
        res.json(results);
    });
});

app.post('/pacientes', (req, res) => {
    const paciente = req.body;
    db.query('INSERT INTO Paciente SET ?', paciente, (error, results) => {
        if (error) return res.status(500).json({ error });
        res.json({ id: results.insertId });
    });
});

app.put('/pacientes/:id', (req, res) => {
    const id = req.params.id;
    const paciente = req.body;
    db.query('UPDATE Paciente SET ? WHERE ID_Paciente = ?', [paciente, id], (error, results) => {
        if (error) return res.status(500).json({ error });
        res.json({ updated: results.affectedRows });
    });
});

app.get('/pacientes/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM Paciente WHERE ID_Paciente = ?', [id], (error, results) => {
        if (error) return res.status(500).json({ error });
        res.json(results[0]);
    });
});

app.delete('/pacientes/:id', (req, res) => {
    const id = req.params.id;

    // Iniciar una transacción para asegurarse de que todos los registros sean eliminados correctamente.
    db.beginTransaction(async (err) => {
        if (err) return res.status(500).json({ error: err });

        try {
            // Eliminar Antecedentes asociados al paciente
            await db.promise().query('DELETE FROM Antecedentes WHERE ID_Paciente = ?', [id]);

            // Eliminar Consultas asociadas al paciente
            await db.promise().query('DELETE FROM Consulta WHERE ID_Paciente = ?', [id]);

            // Eliminar Exámenes Físicos asociados al paciente
            await db.promise().query('DELETE FROM ExamenFisico WHERE ID_Paciente = ?', [id]);

            // Finalmente, eliminar el paciente
            const [results] = await db.promise().query('DELETE FROM Paciente WHERE ID_Paciente = ?', [id]);

            if (results.affectedRows === 0) {
                throw new Error('No se encontró el paciente para eliminar.');
            }

            // Si todo salió bien, comprometemos la transacción
            db.commit((err) => {
                if (err) {
                    db.rollback(() => {
                        throw err;
                    });
                }
                res.json({ deleted: results.affectedRows });
            });

        } catch (error) {
            // Si hay un error, revertimos los cambios
            db.rollback(() => {
                res.status(500).json({ error: error.message });
            });
        }
    });
});


// CRUD para Antecedentes
app.get('/antecedentes', (req, res) => {
    db.query('SELECT * FROM Antecedentes', (error, results) => {
        if (error) return res.status(500).json({ error });
        res.json(results);
    });
});

app.post('/antecedentes', (req, res) => {
    const antecedente = req.body;
    db.query('INSERT INTO Antecedentes SET ?', antecedente, (error, results) => {
        if (error) return res.status(500).json({ error });
        res.json({ id: results.insertId });
    });
});

app.put('/antecedentes/:id', (req, res) => {
    const id = req.params.id;
    const antecedente = req.body;
    db.query('UPDATE Antecedentes SET ? WHERE ID_Antecedente = ?', [antecedente, id], (error, results) => {
        if (error) return res.status(500).json({ error });
        res.json({ updated: results.affectedRows });
    });
});

app.get('/antecedentes/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM Antecedentes WHERE ID_Antecedente = ?', [id], (error, results) => {
        if (error) return res.status(500).json({ error });
        res.json(results[0]);
    });
});

app.delete('/antecedentes/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM Antecedentes WHERE ID_Antecedente = ?', id, (error, results) => {
        if (error) return res.status(500).json({ error });
        res.json({ deleted: results.affectedRows });
    });
});

// CRUD para Consulta
app.get('/consultas', (req, res) => {
    db.query('SELECT * FROM Consulta', (error, results) => {
        if (error) return res.status(500).json({ error });
        res.json(results);
    });
});

app.post('/consultas', (req, res) => {
    const consulta = req.body;
    db.query('INSERT INTO Consulta SET ?', consulta, (error, results) => {
        if (error) return res.status(500).json({ error });
        res.json({ id: results.insertId });
    });
});

app.put('/consultas/:id', (req, res) => {
    const id = req.params.id;
    const consulta = req.body;
    db.query('UPDATE Consulta SET ? WHERE ID_Consulta = ?', [consulta, id], (error, results) => {
        if (error) return res.status(500).json({ error });
        res.json({ updated: results.affectedRows });
    });
});

app.get('/consultas/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM Consulta WHERE ID_Consulta = ?', [id], (error, results) => {
        if (error) return res.status(500).json({ error });
        res.json(results[0]);
    });
});

app.delete('/consultas/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM Consulta WHERE ID_Consulta = ?', id, (error, results) => {
        if (error) return res.status(500).json({ error });
        res.json({ deleted: results.affectedRows });
    });
});

// CRUD para Examen Físico
app.get('/examenes', (req, res) => {
    db.query('SELECT * FROM ExamenFisico', (error, results) => {
        if (error) return res.status(500).json({ error });
        res.json(results);
    });
});

app.post('/examenes', (req, res) => {
    const examen = req.body;
    db.query('INSERT INTO ExamenFisico SET ?', examen, (error, results) => {
        if (error) return res.status(500).json({ error });
        res.json({ id: results.insertId });
    });
});

app.put('/examenes/:id', (req, res) => {
    const id = req.params.id;
    const examen = req.body;
    db.query('UPDATE ExamenFisico SET ? WHERE ID_Examen = ?', [examen, id], (error, results) => {
        if (error) return res.status(500).json({ error });
        res.json({ updated: results.affectedRows });
    });
});

app.get('/examenes/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM ExamenFisico WHERE ID_Examen = ?', [id], (error, results) => {
        if (error) return res.status(500).json({ error });
        res.json(results[0]);
    });
});

app.delete('/examenes/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM ExamenFisico WHERE ID_Examen = ?', id, (error, results) => {
        if (error) return res.status(500).json({ error });
        res.json({ deleted: results.affectedRows });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
