import { type AnyZodObject, ZodError } from "zod"

import type { NextFunction, Request, Response } from "express"

export const validateRequest =
	(validator: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
		try {
			await validator.parseAsync({
				body: req.body,
				query: req.query,
				params: req.params,
			})

			next()
		} catch (error) {
			if (error instanceof ZodError) {
				return res.status(400).json({ message: error.issues[0].message })
			}

			return res.status(500).json({ message: "Internal server error" })
		}
	}
