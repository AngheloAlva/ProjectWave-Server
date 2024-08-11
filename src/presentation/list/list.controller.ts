import { CustomError } from "../../domain/errors/custom-error"

import type { Request, Response } from "express"
import type { ListService } from "./list.service"

export class ListController {
	constructor(private readonly listService: ListService) {}

	private readonly handleError = (error: unknown, res: Response): Response => {
		if (error instanceof CustomError) {
			return res.status(error.statusCode).json({ message: error.message })
		}

		return res.status(500).json({ message: "Internal server error" })
	}

	createList = async (req: Request, res: Response): Promise<Response> => {
		try {
			const { boardId, name } = req.body

			const { list, message } = await this.listService.createList({ boardId, name })

			return res.status(201).json({ message, list })
		} catch (error) {
			return this.handleError(error, res)
		}
	}

	getListsByBoardId = async (req: Request, res: Response): Promise<Response> => {
		try {
			const { boardId } = req.params

			const { list, message } = await this.listService.getListsByBoardId(boardId)

			return res.status(200).json({ message, list })
		} catch (error) {
			return this.handleError(error, res)
		}
	}

	getListById = async (req: Request, res: Response): Promise<Response> => {
		try {
			const { listId } = req.params

			const { list, message } = await this.listService.getListById(listId)

			return res.status(200).json({ message, list })
		} catch (error) {
			return this.handleError(error, res)
		}
	}

	updateList = async (req: Request, res: Response): Promise<Response> => {
		try {
			const { listId } = req.params
			const { name } = req.body

			const { list, message } = await this.listService.updateList({ listId, name })

			return res.status(200).json({ message, list })
		} catch (error) {
			return this.handleError(error, res)
		}
	}

	deleteList = async (req: Request, res: Response): Promise<Response> => {
		try {
			const { listId } = req.params

			const { message } = await this.listService.deleteList(listId)

			return res.status(200).json({ message })
		} catch (error) {
			return this.handleError(error, res)
		}
	}
}
