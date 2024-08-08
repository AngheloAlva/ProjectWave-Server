import { Router } from "express"
import { BoardService } from "./board.service"
import { BoardController } from "./board.controller"
import { validateRequest } from "../../middlewares/validator"
import {
	getBoardValidator,
	createBoardValidator,
	updateBoardValidator,
	deleteBoardValidator,
	getBoardsByUserIdValidator,
	createBoardWithListAndCardsValidator,
} from "../../validators/board.validations"

export class BoardRoutes {
	static get routes(): Router {
		const router = Router()
		const service = new BoardService()
		const controller = new BoardController(service)

		router.post("/board", [validateRequest(createBoardValidator)], controller.createBoard)
		router.post(
			"/board/list-cards",
			[validateRequest(createBoardWithListAndCardsValidator)],
			controller.createBoardWithListAndCards
		)

		router.get("/board/:boardId", [validateRequest(getBoardValidator)], controller.getBoardById)
		router.get(
			"/boards/user/:userId",
			[validateRequest(getBoardsByUserIdValidator)],
			controller.getBoardsByUserId
		)

		router.put("/board/:boardId", [validateRequest(updateBoardValidator)], controller.updateBoard)

		router.delete(
			"/board/:boardId",
			[validateRequest(deleteBoardValidator)],
			controller.deleteBoard
		)

		return router
	}
}
