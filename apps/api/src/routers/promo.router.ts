import { createPromo, getPromos } from '@/controllers/promo.controller';
import { Router } from 'express'

const promoRouter = Router();

promoRouter.post('/', createPromo)
promoRouter.get('/', getPromos)

export { promoRouter }