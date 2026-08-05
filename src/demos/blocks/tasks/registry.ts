import type { DemoEntry } from "@/demos/types"

import { ProjectListDemo } from "./project-list-demo"
import { TaskBoardDemo } from "./task-board-demo"
import { TaskCreateDemo } from "./task-create-demo"
import { TaskDetailDemo } from "./task-detail-demo"
import { TaskFiltersDemo } from "./task-filters-demo"
import { TaskListDemo } from "./task-list-demo"
import { TaskProgressDemo } from "./task-progress-demo"

export const tasksDemos: Record<string, DemoEntry> = {
	"project-list": {
		name: "project-list",
		title: "Project List",
		component: ProjectListDemo,
		componentSlug: "project-list",
		sourcePath: "src/demos/blocks/tasks/project-list-demo.tsx",
	},
	"task-board": {
		name: "task-board",
		title: "Task Board",
		component: TaskBoardDemo,
		componentSlug: "task-board",
		sourcePath: "src/demos/blocks/tasks/task-board-demo.tsx",
	},
	"task-create": {
		name: "task-create",
		title: "Task Create",
		component: TaskCreateDemo,
		componentSlug: "task-create",
		sourcePath: "src/demos/blocks/tasks/task-create-demo.tsx",
	},
	"task-detail": {
		name: "task-detail",
		title: "Task Detail",
		component: TaskDetailDemo,
		componentSlug: "task-detail",
		sourcePath: "src/demos/blocks/tasks/task-detail-demo.tsx",
	},
	"task-filters": {
		name: "task-filters",
		title: "Task Filters",
		component: TaskFiltersDemo,
		componentSlug: "task-filters",
		sourcePath: "src/demos/blocks/tasks/task-filters-demo.tsx",
	},
	"task-list": {
		name: "task-list",
		title: "Task List",
		component: TaskListDemo,
		componentSlug: "task-list",
		sourcePath: "src/demos/blocks/tasks/task-list-demo.tsx",
	},
	"task-progress": {
		name: "task-progress",
		title: "Task Progress",
		component: TaskProgressDemo,
		componentSlug: "task-progress",
		sourcePath: "src/demos/blocks/tasks/task-progress-demo.tsx",
	},
}
