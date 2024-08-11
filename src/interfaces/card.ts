export interface CreateCard {
	name: string
	description: string
	dueDate: string
	listId: string
	labels?: string[]
}

export interface UpdateCard {
	cardId: string
	name?: string
	description?: string
	dueDate: string
	listId?: string
	labels?: string[]
}

export interface ChangeList {
	cardId: string
	listId: string
}
