import { Router } from "express"
import { BoardService } from "./board.service"
import { BoardController } from "./board.controller"
import { validateRequest } from "../../middlewares/validator"
import { getBoardValidator } from "../../validators/board/getBoard"

export class BoardRoutes {
	static get routes(): Router {
		const router = Router()
		const service = new BoardService()
		const controller = new BoardController(service)

		router.get("/board/:boardId", [validateRequest(getBoardValidator)], controller.getBoardById)

		return router
	}
}
