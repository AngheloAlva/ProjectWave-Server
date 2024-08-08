export interface CreateBoard {
	name: string
	description: string
}

export interface CreateBoardWithListAndCards {
	name: string
	description: string
	lists: {
		name: string
		cards: {
			name: string
			description: string
			dueDate: string
		}[]
	}[]
}

export interface UpdateBoard {
	id: string
	name: string
	description: string
}
