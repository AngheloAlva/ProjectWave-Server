import { Router } from "express"

import { ListRoutes } from "./list/list.routes"
import { BoardRoutes } from "./board/board.routes"

export class AppRoutes {
	static get routes(): Router {
		const router = Router()

		router.use("/api", ListRoutes.routes)
		router.use("/api", BoardRoutes.routes)

		return router
	}
}
