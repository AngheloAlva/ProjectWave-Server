import { prisma } from "../../domain/prisma"

import { CustomError } from "../../domain/errors/custom-error"

export const verifyLabelByIdExists = async (labelId: string): Promise<void> => {
	try {
		const label = await prisma.label.findUnique({
			where: {
				id: labelId,
			},
		})

		if (label == null) {
			throw CustomError.notFound("Label not found")
		}
	} catch (error) {
		throw error
	}
}
