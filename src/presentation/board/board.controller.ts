import { CustomError } from "../../domain/errors/custom-error"

import type { BoardService } from "./board.service"
import type { Request, Response } from "express"

export class BoardController {
	constructor(private readonly boardService: BoardService) {}

	private readonly handleError = (error: unknown, res: Response): Response => {
		if (error instanceof CustomError) {
			return res.status(error.statusCode).json({ message: error.message })
		}

		return res.status(500).json({ message: "Internal server error" })
	}

	getBoardById = async (req: Request, res: Response): Promise<Response> => {
		try {
			const { boardId } = req.params
			const board = await this.boardService.getBoardById(boardId)

			return res.status(200).json(board)
		} catch (error) {
			return this.handleError(error, res)
		}
	}
}
