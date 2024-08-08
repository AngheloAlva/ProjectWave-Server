import { z } from "zod"

export const getBoardValidator = z.object({
	params: z.object({
		boardId: z.string().uuid("Invalid board id"),
	}),
})
