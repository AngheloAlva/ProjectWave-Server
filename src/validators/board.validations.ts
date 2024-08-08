import { z } from "zod"

export const createBoardValidator = z.object({
	body: z.object({
		name: z.string().min(3, "Name must be at least 3 characters"),
		description: z
			.string()
			.min(3, "Description must be at least 3 characters")
			.max(255, "Description must be at most 255 characters"),
	}),
})

export const createBoardWithListAndCardsValidator = z.object({
	body: z.object({
		name: z.string().min(3, "Name must be at least 3 characters"),
		description: z
			.string()
			.min(3, "Description must be at least 3 characters")
			.max(255, "Description must be at most 255 characters"),
		lists: z.array(
			z.object({
				name: z.string().min(3, "List name must be at least 3 characters"),
				cards: z.array(
					z.object({
						name: z.string().min(3, "Card name must be at least 3 characters"),
						description: z
							.string()
							.min(3, "Card description must be at least 3 characters")
							.max(255, "Card description must be at most 255 characters"),
						dueDate: z
							.string()
							.transform((value) => new Date(value))
							.optional(),
					})
				),
			})
		),
	}),
})

export const getBoardValidator = z.object({
	params: z.object({
		boardId: z.string().uuid("Invalid board id"),
	}),
})

export const getBoardsByUserIdValidator = z.object({
	params: z.object({
		userId: z.string().uuid("Invalid user id"),
	}),
})

export const updateBoardValidator = z.object({
	params: z.object({
		boardId: z.string().uuid("Invalid board id"),
	}),
	body: z.object({
		name: z.string().min(3, "Name must be at least 3 characters"),
		description: z
			.string()
			.min(3, "Description must be at least 3 characters")
			.max(255, "Description must be at most 255 characters"),
	}),
})

export const deleteBoardValidator = z.object({
	params: z.object({
		boardId: z.string().uuid("Invalid board id"),
	}),
})
