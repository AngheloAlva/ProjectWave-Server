import { CustomError } from "../../domain/errors/custom-error"

import type { Request, Response } from "express"
import type { CardService } from "./card.service"

export class CardController {
	constructor(private readonly cardService: CardService) {}

	private readonly handleError = (error: unknown, res: Response): Response => {
		if (error instanceof CustomError) {
			return res.status(error.statusCode).json({ message: error.message })
		}

		return res.status(500).json({ message: "Internal server error" })
	}

	createCard = async (req: Request, res: Response): Promise<Response> => {
		try {
			const { name, description, dueDate, listId, labels } = req.body

			const { message, card } = await this.cardService.createCard({
				name,
				listId,
				labels,
				dueDate,
				description,
			})

			return res.status(201).json({ message, card })
		} catch (error) {
			return this.handleError(error, res)
		}
	}

	getCardById = async (req: Request, res: Response): Promise<Response> => {
		try {
			const { cardId } = req.params

			const { message, card } = await this.cardService.getCardById(cardId)

			return res.status(200).json({ message, card })
		} catch (error) {
			return this.handleError(error, res)
		}
	}

	getCardsByListId = async (req: Request, res: Response): Promise<Response> => {
		try {
			const { listId } = req.params

			const { message, cards } = await this.cardService.getCardsByListId(listId)

			return res.status(200).json({ message, cards })
		} catch (error) {
			return this.handleError(error, res)
		}
	}

	updateCard = async (req: Request, res: Response): Promise<Response> => {
		try {
			const { cardId } = req.params
			const { name, description, dueDate, listId, labels } = req.body

			const { message, card } = await this.cardService.updateCard({
				cardId,
				name,
				description,
				dueDate,
				listId,
				labels,
			})

			return res.status(200).json({ message, card })
		} catch (error) {
			return this.handleError(error, res)
		}
	}

	changeList = async (req: Request, res: Response): Promise<Response> => {
		try {
			const { cardId, listId } = req.body

			const { message, card } = await this.cardService.changeList({ cardId, listId })

			return res.status(200).json({ message, card })
		} catch (error) {
			return this.handleError(error, res)
		}
	}

	deleteCard = async (req: Request, res: Response): Promise<Response> => {
		try {
			const { cardId } = req.params

			const { message } = await this.cardService.deleteCard(cardId)

			return res.status(200).json({ message })
		} catch (error) {
			return this.handleError(error, res)
		}
	}
}
