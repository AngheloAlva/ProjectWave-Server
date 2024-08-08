import { CustomError } from "../../domain/errors/custom-error"

import type { Request, Response } from "express"
import type { BoardService } from "./board.service"

export class BoardController {
	constructor(private readonly boardService: BoardService) {}

	private readonly handleError = (error: unknown, res: Response): Response => {
		if (error instanceof CustomError) {
			return res.status(error.statusCode).json({ message: error.message })
		}

		return res.status(500).json({ message: "Internal server error" })
	}

	createBoard = async (req: Request, res: Response): Promise<Response> => {
		try {
			const { name, description } = req.body

			const data = await this.boardService.createBoard({ name, description })

			return res.status(201).json(data)
		} catch (error) {
			return this.handleError(error, res)
		}
	}

	createBoardWithListAndCards = async (req: Request, res: Response): Promise<Response> => {
		try {
			const { name, lists, description } = req.body

			const data = await this.boardService.createBoardWithListAndCards({ name, lists, description })

			return res.status(201).json(data)
		} catch (error) {
			return this.handleError(error, res)
		}
	}

	getBoardById = async (req: Request, res: Response): Promise<Response> => {
		try {
			const { boardId } = req.params
			const data = await this.boardService.getBoardById(boardId)

			return res.status(200).json(data)
		} catch (error) {
			return this.handleError(error, res)
		}
	}

	getBoardsByUserId = async (req: Request, res: Response): Promise<Response> => {
		try {
			const { userId } = req.params
			const data = await this.boardService.getBoardsByUserId(userId)

			return res.status(200).json(data)
		} catch (error) {
			return this.handleError(error, res)
		}
	}

	updateBoard = async (req: Request, res: Response): Promise<Response> => {
		try {
			const { boardId } = req.params
			const { name, description } = req.body

			const data = await this.boardService.updateBoard({ id: boardId, name, description })

			return res.status(200).json(data)
		} catch (error) {
			return this.handleError(error, res)
		}
	}

	deleteBoard = async (req: Request, res: Response): Promise<Response> => {
		try {
			const { boardId } = req.params
			const data = await this.boardService.deleteBoard(boardId)

			return res.status(200).json(data)
		} catch (error) {
			return this.handleError(error, res)
		}
	}
}
