import { Router } from "express"
import { ExpressAuth } from "@auth/express"
import { prisma } from "../../domain/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"

export class AuthRoutes {
	static get routes(): Router {
		const router = Router()

		router.use(
			"/auth/*",
			ExpressAuth({
				providers: [],
				adapter: PrismaAdapter(prisma),
			})
		)

		return router
	}
}
