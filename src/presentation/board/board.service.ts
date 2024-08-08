import { CustomError } from "../../domain/errors/custom-error"
import { prisma } from "../../domain/prisma"

import type { Board } from "@prisma/client"

export class BoardService {
	async getBoardById(boardId: string): Promise<Board> {
		try {
			const board = await prisma.board.findUnique({
				where: {
					id: boardId,
				},
			})

			if (board == null) {
				throw CustomError.notFound("Board not found")
			}

			return board
		} catch (error) {
			throw error
		}
	}
}
