import { Router } from "express"

import { BoardRoutes } from "./board/board.routes"

export class AppRoutes {
	static get routes(): Router {
		const router = Router()

		router.use("/api", BoardRoutes.routes)

		return router
	}
}
