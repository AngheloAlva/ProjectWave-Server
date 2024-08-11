import { Router } from "express"
import { ListService } from "./list.service"
import { ListController } from "./list.controller"
import { validateRequest } from "../../middlewares/validator"
import {
	deleteListValidator,
	updateListValidator,
	createListValidator,
	getListByIdValidator,
	getListsByBoardIdValidator,
} from "../../validators/list.validations"

export class ListRoutes {
	static get routes(): Router {
		const router = Router()
		const service = new ListService()
		const controller = new ListController(service)

		router.post("/list", [validateRequest(createListValidator)], controller.createList)

		router.get(
			"/list/board/:boardId",
			[validateRequest(getListsByBoardIdValidator)],
			controller.getListsByBoardId
		)
		router.get("/list/:listId", [validateRequest(getListByIdValidator)], controller.getListById)

		router.put("/list/:listId", [validateRequest(updateListValidator)], controller.updateList)

		router.delete("/list/:listId", [validateRequest(deleteListValidator)], controller.deleteList)

		return router
	}
}
