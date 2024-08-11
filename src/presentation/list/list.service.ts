import { prisma } from "../../domain/prisma"
import { CustomError } from "../../domain/errors/custom-error"

import type { List } from "@prisma/client"
import { CreateList, UpdateList } from "../../interfaces/list"
import { verifyBoardByIdExists } from "../../helpers/verify-models/board.helpers"

export class ListService {
	createList = async ({ boardId, name }: CreateList): Promise<{ message: string; list: List }> => {
		try {
			await verifyBoardByIdExists(boardId)

			const list = await prisma.list.create({
				data: {
					name,
					boardId,
				},
			})

			return {
				list,
				message: "List created successfully",
			}
		} catch (error) {
			throw error
		}
	}

	getListsByBoardId = async (boardId: string): Promise<{ message: string; list: List[] }> => {
		try {
			const lists = await prisma.list.findMany({
				where: {
					boardId,
				},
			})

			return {
				list: lists,
				message: "Lists found successfully",
			}
		} catch (error) {
			throw error
		}
	}

	getListById = async (listId: string): Promise<{ message: string; list: List }> => {
		try {
			const list = await prisma.list.findUnique({
				where: {
					id: listId,
				},
			})

			if (!list) {
				throw CustomError.notFound("List not found")
			}

			return {
				list,
				message: "List found",
			}
		} catch (error) {
			throw error
		}
	}

	updateList = async ({ name, listId }: UpdateList): Promise<{ message: string; list: List }> => {
		try {
			const list = await prisma.list.update({
				where: {
					id: listId,
				},
				data: {
					name,
				},
			})

			return {
				list,
				message: "List updated successfully",
			}
		} catch (error) {
			throw error
		}
	}

	deleteList = async (listId: string): Promise<{ message: string }> => {
		try {
			await prisma.card.deleteMany({
				where: {
					listId,
				},
			})

			await prisma.list.delete({
				where: {
					id: listId,
				},
			})

			if (!listId) {
				throw CustomError.notFound("List not found")
			}

			return {
				message: "List deleted successfully",
			}
		} catch (error) {
			throw error
		}
	}
}
