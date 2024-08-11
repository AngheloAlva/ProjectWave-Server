import express, { type Router } from "express"
import cors from "cors"
import { envs } from "../config/envs"

interface Options {
	port: number
	routes: Router
}

export class Server {
	public readonly app = express()
	private serverListener?: any
	private readonly port: number
	private readonly routes: Router

	constructor(options: Options) {
		this.port = options.port
		this.routes = options.routes

		this.configure()
	}

	private configure(): void {
		this.app.use(express.json())
		this.app.set("trust proxy", true)
		this.app.use(express.urlencoded({ extended: true }))
		this.app.use(cors({ origin: envs.CLIENT_URL, credentials: true }))
	}

	async start(): Promise<void> {
		this.app.use(this.routes)
		this.serverListener = this.app.listen(this.port, () => {
			console.log(`Server running on port ${this.port}`)
		})
	}

	public close(): void {
		this.serverListener?.close()
	}

	public getApp(): express.Application {
		return this.app
	}
}
