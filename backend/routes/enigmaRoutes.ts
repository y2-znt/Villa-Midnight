import express from 'express';
import {
  getAllEnigma,
  getEnigmaById,
  getEnigmaByUserId,
  getEnigmaByDifficulty,
  createEnigma,
  updateEnigma,
  deleteEnigma,
} from '../controllers/enigmaController';
import { validateId } from '../middlewares/validateId';
import { validateBody } from '../middlewares/validateBody';

const router = express.Router();

// Chaque route utilise directement les middlewares et contrôleurs
router.get('/', async (req, res, next) => {
  try {
    await getAllEnigma(req, res);
  } catch (error) {
    next(error); // Envoie l'erreur au middleware global d'erreur
  }
});

router.get('/:id', validateId('id'), async (req, res, next) => {
  try {
    await getEnigmaById(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/user/:userId', validateId('userId'), async (req, res, next) => {
  try {
    await getEnigmaByUserId(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/difficulty/:difficulty', async (req, res, next) => {
  try {
    await getEnigmaByDifficulty(req, res);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  validateBody(['title', 'description', 'difficulty', 'userId']),
  async (req, res, next) => {
    try {
      await createEnigma(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
    '/:id',
    [validateId('id'), validateBody(['title', 'description', 'difficulty'])],
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
        await updateEnigma(req, res);
      } catch (error) {
        next(error);
      }
    }
  );
  

router.delete('/:id', validateId('id'), async (req, res, next) => {
  try {
    await deleteEnigma(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
