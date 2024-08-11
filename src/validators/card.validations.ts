import { z } from "zod"

export const createCardValidator = z.object({
	body: z.object({
		name: z.string().min(3, "Name must be at least 3 characters"),
		listId: z.string().uuid("Invalid list id"),
		labels: z.array(z.string().uuid("Invalid label id")).optional(),
		dueDate: z.string().transform((value) => new Date(value)),
		description: z.string().min(3, "Description must be at least 3 characters"),
	}),
})

export const getCardByIdValidator = z.object({
	params: z.object({
		cardId: z.string().uuid("Invalid card id"),
	}),
})

export const getCardsByListIdValidator = z.object({
	params: z.object({
		listId: z.string().uuid("Invalid list id"),
	}),
})

export const updateCardValidator = z.object({
	body: z.object({
		name: z.string().min(3, "Name must be at least 3 characters"),
		listId: z.string().uuid("Invalid list id"),
		labels: z.array(z.string().uuid("Invalid label id")),
		dueDate: z.string().transform((value) => new Date(value)),
		description: z.string().min(3, "Description must be at least 3 characters"),
	}),
	params: z.object({
		cardId: z.string().uuid("Invalid card id"),
	}),
})

export const changeListValidator = z.object({
	body: z.object({
		cardId: z.string().uuid("Invalid card id"),
		listId: z.string().uuid("Invalid list id"),
	}),
})

export const deleteCardValidator = z.object({
	params: z.object({
		cardId: z.string().uuid("Invalid card id"),
	}),
})
