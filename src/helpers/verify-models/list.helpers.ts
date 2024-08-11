import { prisma } from "../../domain/prisma"

import { CustomError } from "../../domain/errors/custom-error"

export const verifyListByIdExists = async (listId: string): Promise<void> => {
	try {
		const list = await prisma.list.findUnique({
			where: {
				id: listId,
			},
		})

		if (list == null) {
			throw CustomError.notFound("List not found")
		}
	} catch (error) {
		throw error
	}
}
