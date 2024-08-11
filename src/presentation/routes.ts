import { Router } from "express"

import { CardRoutes } from "./card/card.routes"
import { ListRoutes } from "./list/list.routes"
import { AuthRoutes } from "./auth/auth.routes"
import { BoardRoutes } from "./board/board.routes"

export class AppRoutes {
	static get routes(): Router {
		const router = Router()

		router.use("/api", CardRoutes.routes)
		router.use("/api", ListRoutes.routes)
		router.use("/api", BoardRoutes.routes)
		router.use("/api", AuthRoutes.routes)

		return router
	}
}
