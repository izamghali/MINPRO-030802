import { getPromos } from '@/controllers/promo.controller';
import { createReview } from '@/controllers/review.controller';
import { Router } from 'express'

const reviewRouter = Router();

reviewRouter.post('/', createReview)
reviewRouter.get('/', getPromos)

export { reviewRouter }