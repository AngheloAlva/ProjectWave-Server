import "dotenv/config"
import { get } from "env-var"

export const envs = {
	PORT: get("PORT").required().asPortNumber(),
	NODE_ENV: get("NODE_ENV").default("development").asEnum(["development", "production"]),
	CLIENT_URL: get("CLIENT_URL").required().asString(),
	AUTH_SECRET: get("AUTH_SECRET").required().asString(),
}
