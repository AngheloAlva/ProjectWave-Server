import { z } from "zod"

export const createListValidator = z.object({
	body: z.object({
		boardId: z.string().uuid("Invalid board id"),
		name: z.string().min(3, "Name must be at least 3 characters"),
	}),
})

export const getListsByBoardIdValidator = z.object({
	params: z.object({
		boardId: z.string().uuid("Invalid board id"),
	}),
})

export const getListByIdValidator = z.object({
	params: z.object({
		listId: z.string().uuid("Invalid list id"),
	}),
})

export const updateListValidator = z.object({
	params: z.object({
		listId: z.string().uuid("Invalid list id"),
	}),
	body: z.object({
		name: z.string().min(3, "Name must be at least 3 characters"),
	}),
})

export const deleteListValidator = z.object({
	params: z.object({
		listId: z.string().uuid("Invalid list id"),
	}),
})
