import { prisma } from "../../domain/prisma"
import { CustomError } from "../../domain/errors/custom-error"
import { verifyListByIdExists } from "../../helpers/verify-models/list.helpers"
import { verifyLabelByIdExists } from "../../helpers/verify-models/label.helpers"

import type { Card } from "@prisma/client"
import type { CreateCard, UpdateCard, ChangeList } from "../../interfaces/card"

export class CardService {
	createCard = async ({
		name,
		labels,
		listId,
		dueDate,
		description,
	}: CreateCard): Promise<{ message: string; card: Card }> => {
		try {
			await verifyListByIdExists(listId)

			labels?.map(async (label) => {
				await verifyLabelByIdExists(label)
			})

			const card = await prisma.card.create({
				data: {
					name,
					listId,
					description,
					dueDate: new Date(dueDate),
					labels: {
						connect: labels?.map((label) => ({ id: label })),
					},
				},
			})

			return {
				message: "Card created successfully",
				card,
			}
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	getCardById = async (cardId: string): Promise<{ message: string; card: Card }> => {
		try {
			const card = await prisma.card.findUnique({
				where: {
					id: cardId,
				},
			})

			if (!card) {
				throw CustomError.notFound("Card not found")
			}

			return {
				message: "Card found successfully",
				card,
			}
		} catch (error) {
			throw error
		}
	}

	getCardsByListId = async (listId: string): Promise<{ message: string; cards: Card[] }> => {
		try {
			await verifyListByIdExists(listId)

			const cards = await prisma.card.findMany({
				where: {
					listId,
				},
			})

			return {
				message: "Cards found successfully",
				cards,
			}
		} catch (error) {
			throw error
		}
	}

	updateCard = async ({
		name,
		cardId,
		labels,
		dueDate,
		description,
	}: UpdateCard): Promise<{ message: string; card: Card }> => {
		try {
			labels?.map(async (label) => {
				await verifyLabelByIdExists(label)
			})

			const card = await prisma.card.update({
				where: {
					id: cardId,
				},
				data: {
					name,
					description,
					dueDate: new Date(dueDate),
					labels: {
						set: labels?.map((label) => ({ id: label })),
					},
				},
			})

			return {
				message: "Card updated successfully",
				card,
			}
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	deleteCard = async (cardId: string): Promise<{ message: string }> => {
		try {
			const card = await prisma.card.delete({
				where: {
					id: cardId,
				},
			})

			if (!card) {
				throw CustomError.notFound("Card not found")
			}

			return {
				message: "Card deleted successfully",
			}
		} catch (error) {
			throw error
		}
	}

	changeList = async ({ cardId, listId }: ChangeList): Promise<{ message: string; card: Card }> => {
		try {
			await verifyListByIdExists(listId)

			const card = await prisma.card.update({
				where: {
					id: cardId,
				},
				data: {
					listId,
				},
			})

			return {
				message: "Card list changed successfully",
				card,
			}
		} catch (error) {
			throw error
		}
	}
}
