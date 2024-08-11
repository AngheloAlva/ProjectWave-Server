import { prisma } from "../../domain/prisma"

import { CustomError } from "../../domain/errors/custom-error"

export const verifyBoardBySlugExists = async (slug: string): Promise<void> => {
	try {
		const board = await prisma.board.findUnique({
			where: {
				slug,
			},
		})

		if (board != null) {
			throw CustomError.badRequest("Board already exists")
		}
	} catch (error) {
		throw error
	}
}

export const verifyBoardByIdExists = async (boardId: string): Promise<void> => {
	try {
		const board = await prisma.board.findUnique({
			where: {
				id: boardId,
			},
		})

		if (board == null) {
			throw CustomError.notFound("Board not found")
		}
	} catch (error) {
		throw error
	}
}
