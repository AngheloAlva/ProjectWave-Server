import { Router } from "express"
import { CardService } from "./card.service"
import { CardController } from "./card.controller"
import { validateRequest } from "../../middlewares/validator"
import {
	createCardValidator,
	changeListValidator,
	deleteCardValidator,
	updateCardValidator,
	getCardByIdValidator,
	getCardsByListIdValidator,
} from "../../validators/card.validations"

export class CardRoutes {
	static get routes(): Router {
		const router = Router()
		const service = new CardService()
		const controller = new CardController(service)

		router.post("/card", [validateRequest(createCardValidator)], controller.createCard)

		router.get("/card/:cardId", [validateRequest(getCardByIdValidator)], controller.getCardById)
		router.get(
			"/card/list/:listId",
			[validateRequest(getCardsByListIdValidator)],
			controller.getCardsByListId
		)

		router.put("/card/:cardId", [validateRequest(updateCardValidator)], controller.updateCard)
		router.patch("/card/change-list", [validateRequest(changeListValidator)], controller.changeList)

		router.delete("/card/:cardId", [validateRequest(deleteCardValidator)], controller.deleteCard)

		return router
	}
}
