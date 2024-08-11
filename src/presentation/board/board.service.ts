import { prisma } from "../../domain/prisma"
import { createSlug } from "../../helpers/createSlug"
import { CustomError } from "../../domain/errors/custom-error"
import { verifyBoardBySlugExists } from "../../helpers/verify-models/board.helpers"

import type { Board } from "@prisma/client"
import type { CreateBoard, CreateBoardWithListAndCards, UpdateBoard } from "../../interfaces/board"

export class BoardService {
	async createBoard({
		name,
		description,
	}: CreateBoard): Promise<{ message: string; board: Board }> {
		try {
			const slug = createSlug(name)

			verifyBoardBySlugExists(slug)

			const newBoard = await prisma.board.create({
				data: {
					name,
					slug,
					description,
				},
			})

			return {
				board: newBoard,
				message: "Board created successfully",
			}
		} catch (error) {
			throw error
		}
	}

	async createBoardWithListAndCards({
		name,
		lists,
		description,
	}: CreateBoardWithListAndCards): Promise<{ message: string; board: Board }> {
		try {
			const slug = createSlug(name)

			verifyBoardBySlugExists(slug)

			const newBoard = await prisma.board.create({
				data: {
					name,
					slug,
					description,
					lists: {
						create: lists.map((list) => ({
							name: list.name,
							cards: {
								create: list.cards.map((card) => ({
									name: card.name,
									description: card.description,
									dueDate: new Date(card.dueDate),
								})),
							},
						})),
					},
				},
			})

			return {
				board: newBoard,
				message: "Board created successfully",
			}
		} catch (error) {
			throw error
		}
	}

	async getBoardById(boardId: string): Promise<{ message: string; board: Board }> {
		try {
			const board = await prisma.board.findUnique({
				where: {
					id: boardId,
				},
			})

			if (board == null) {
				throw CustomError.notFound("Board not found")
			}

			return {
				board,
				message: "Board found",
			}
		} catch (error) {
			throw error
		}
	}

	async getBoardsByUserId(userId: string): Promise<{ message: string; boards: Board[] }> {
		try {
			const boards = await prisma.board.findMany({
				where: {
					users: {
						some: {
							id: userId,
						},
					},
				},
			})

			return {
				boards,
				message: "Boards found",
			}
		} catch (error) {
			throw error
		}
	}

	async updateBoard({
		id,
		name,
		description,
	}: UpdateBoard): Promise<{ message: string; board: Board }> {
		try {
			const slug = createSlug(name)

			const updatedBoard = await prisma.board.update({
				where: {
					id,
				},
				data: {
					name,
					slug,
					description,
				},
			})

			if (updatedBoard == null) {
				throw CustomError.notFound("Board not found")
			}

			return {
				board: updatedBoard,
				message: "Board updated successfully",
			}
		} catch (error) {
			throw error
		}
	}

	async deleteBoard(boardId: string): Promise<{ message: string }> {
		try {
			await prisma.card.deleteMany({
				where: {
					lists: {
						boardId,
					},
				},
			})

			await prisma.list.deleteMany({
				where: {
					boardId,
				},
			})

			await prisma.board.delete({
				where: {
					id: boardId,
				},
			})

			return {
				message: "Board deleted successfully",
			}
		} catch (error) {
			throw error
		}
	}
}
