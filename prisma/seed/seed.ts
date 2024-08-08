import { prisma } from "../../src/domain/prisma"

async function main() {
	console.log("Start seeding ...")

	await prisma.comment.deleteMany()
	await prisma.label.deleteMany()
	await prisma.card.deleteMany()
	await prisma.list.deleteMany()
	await prisma.role.deleteMany()
	await prisma.user.deleteMany()
	await prisma.board.deleteMany()

	const user1 = await prisma.user.create({
		data: {
			email: "user1@gmail.com",
			password: "password",
			username: "user1",
		},
	})

	const user2 = await prisma.user.create({
		data: {
			email: "user2@gmail.com",
			password: "password",
			username: "user2",
		},
	})

	const board1 = await prisma.board.create({
		data: {
			name: "Board 1",
			slug: "board-1",
			description: "Board 1 description",
			users: {
				connect: {
					id: user1.id,
				},
			},
		},
	})

	const board2 = await prisma.board.create({
		data: {
			name: "Board 2",
			slug: "board-2",
			description: "Board 2 description",
			users: {
				connect: {
					id: user2.id,
				},
			},
		},
	})

	const list1 = await prisma.list.create({
		data: {
			name: "List 1",
			boardId: board1.id,
		},
	})

	const list2 = await prisma.list.create({
		data: {
			name: "List 2",
			boardId: board1.id,
		},
	})

	const list3 = await prisma.list.create({
		data: {
			name: "List 3",
			boardId: board2.id,
		},
	})

	const card1 = await prisma.card.create({
		data: {
			name: "Card 1",
			description: "Card 1 description",
			dueDate: new Date("2024-09-01T00:00:00.000Z"),
			listId: list1.id,
		},
	})

	const card2 = await prisma.card.create({
		data: {
			name: "Card 2",
			description: "Card 2 description",
			dueDate: new Date("2024-09-01T00:00:00.000Z"),
			listId: list1.id,
		},
	})

	const card3 = await prisma.card.create({
		data: {
			name: "Card 3",
			description: "Card 3 description",
			dueDate: new Date("2024-09-01T00:00:00.000Z"),
			listId: list2.id,
		},
	})

	const card4 = await prisma.card.create({
		data: {
			name: "Card 4",
			description: "Card 4 description",
			dueDate: new Date("2024-09-01T00:00:00.000Z"),
			listId: list3.id,
		},
	})

	const label1 = await prisma.label.create({
		data: {
			name: "Label 1",
			color: "red",
			boardId: board1.id,
			cards: {
				connect: {
					id: card1.id,
				},
			},
		},
	})

	const label2 = await prisma.label.create({
		data: {
			name: "Label 2",
			color: "blue",
			boardId: board1.id,
			cards: {
				connect: {
					id: card2.id,
				},
			},
		},
	})

	const label3 = await prisma.label.create({
		data: {
			name: "Label 3",
			color: "green",
			boardId: board1.id,
			cards: {
				connect: {
					id: card3.id,
				},
			},
		},
	})

	const role1 = await prisma.role.create({
		data: {
			name: "Admin",
			users: {
				connect: {
					id: user1.id,
				},
			},
			boardId: board1.id,
		},
	})

	const role2 = await prisma.role.create({
		data: {
			name: "Member",
			users: {
				connect: {
					id: user2.id,
				},
			},
			boardId: board1.id,
		},
	})

	const role3 = await prisma.role.create({
		data: {
			name: "Member",
			users: {
				connect: {
					id: user1.id,
				},
			},
			boardId: board2.id,
		},
	})

	const comment1 = await prisma.comment.create({
		data: {
			text: "Comment 1",
			cardId: card1.id,
			userId: user1.id,
		},
	})

	const comment2 = await prisma.comment.create({
		data: {
			text: "Comment 2",
			cardId: card1.id,
			userId: user2.id,
		},
	})

	const comment3 = await prisma.comment.create({
		data: {
			text: "Comment 3",
			cardId: card2.id,
			userId: user1.id,
		},
	})

	console.log("Seeding complete.")
}

;(() => {
	if (process.env.NODE_ENV === "production") return

	main()
})()
