import { AppRoutes } from "./presentation/routes"
import { Server } from "./presentation/server"
import { envs } from "./config/envs"

void (async () => {
	await main()
})()

export async function main(): Promise<void> {
	const server = new Server({
		port: envs.PORT,
		routes: AppRoutes.routes,
	})

	await server.start()
}
