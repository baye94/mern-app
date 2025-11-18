import { Router } from 'express';
const router = Router();

router.get('/status', (req, res) => {
    res.json({ message: "API Backend is running successfully!" });
});

router.get('/items', async (req, res) => {
    try {
    
        res.json({ data: ["Exemple 1", "Exemple 2"], source: "MongoDB" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
    }
});

export default router;