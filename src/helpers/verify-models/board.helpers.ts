import { prisma } from "../../domain/prisma"

import { CustomError } from "../../domain/errors/custom-error"

export const verifyBoardBySlugExists = async (slug: string): Promise<void> => {
	const board = await prisma.board.findUnique({
		where: {
			slug,
		},
	})

	if (board != null) {
		throw CustomError.badRequest("Board already exists")
	}
}
