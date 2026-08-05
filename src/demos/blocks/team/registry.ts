import type { DemoEntry } from "@/demos/types"

import { TeamActivityFeedDemo } from "./team-activity-feed-demo"
import { TeamAnalyticsDemo } from "./team-analytics-demo"
import { TeamChatDemo } from "./team-chat-demo"
import { TeamDashboardDemo } from "./team-dashboard-demo"
import { TeamFilesDemo } from "./team-files-demo"
import { TeamInvitationsDemo } from "./team-invitations-demo"
import { TeamMemberListDemo } from "./team-member-list-demo"
import { TeamNotesDemo } from "./team-notes-demo"
import { TeamNotificationsDemo } from "./team-notifications-demo"
import { TeamPermissionsMatrixDemo } from "./team-permissions-matrix-demo"
import { TeamProjectsDemo } from "./team-projects-demo"
import { TeamPromptLibraryDemo } from "./team-prompt-library-demo"
import { TeamSettingsDemo } from "./team-settings-demo"
import { TeamSwitcherDemo } from "./team-switcher-demo"

export const teamDemos: Record<string, DemoEntry> = {
	"team-activity-feed": {
		name: "team-activity-feed",
		title: "Activity Feed",
		component: TeamActivityFeedDemo,
		componentSlug: "team-activity-feed",
		sourcePath: "src/demos/blocks/team/team-activity-feed-demo.tsx",
	},
	"team-analytics": {
		name: "team-analytics",
		title: "Analytics",
		component: TeamAnalyticsDemo,
		componentSlug: "team-analytics",
		sourcePath: "src/demos/blocks/team/team-analytics-demo.tsx",
	},
	"team-chat": {
		name: "team-chat",
		title: "Chat",
		component: TeamChatDemo,
		componentSlug: "team-chat",
		sourcePath: "src/demos/blocks/team/team-chat-demo.tsx",
	},
	"team-dashboard": {
		name: "team-dashboard",
		title: "Dashboard",
		component: TeamDashboardDemo,
		componentSlug: "team-dashboard",
		sourcePath: "src/demos/blocks/team/team-dashboard-demo.tsx",
	},
	"team-files": {
		name: "team-files",
		title: "Files",
		component: TeamFilesDemo,
		componentSlug: "team-files",
		sourcePath: "src/demos/blocks/team/team-files-demo.tsx",
	},
	"team-invitations": {
		name: "team-invitations",
		title: "Invitations",
		component: TeamInvitationsDemo,
		componentSlug: "team-invitations",
		sourcePath: "src/demos/blocks/team/team-invitations-demo.tsx",
	},
	"team-member-list": {
		name: "team-member-list",
		title: "Member List",
		component: TeamMemberListDemo,
		componentSlug: "team-member-list",
		sourcePath: "src/demos/blocks/team/team-member-list-demo.tsx",
	},
	"team-notes": {
		name: "team-notes",
		title: "Notes",
		component: TeamNotesDemo,
		componentSlug: "team-notes",
		sourcePath: "src/demos/blocks/team/team-notes-demo.tsx",
	},
	"team-notifications": {
		name: "team-notifications",
		title: "Notifications",
		component: TeamNotificationsDemo,
		componentSlug: "team-notifications",
		sourcePath: "src/demos/blocks/team/team-notifications-demo.tsx",
	},
	"team-permissions-matrix": {
		name: "team-permissions-matrix",
		title: "Permissions Matrix",
		component: TeamPermissionsMatrixDemo,
		componentSlug: "team-permissions-matrix",
		sourcePath: "src/demos/blocks/team/team-permissions-matrix-demo.tsx",
	},
	"team-projects": {
		name: "team-projects",
		title: "Projects",
		component: TeamProjectsDemo,
		componentSlug: "team-projects",
		sourcePath: "src/demos/blocks/team/team-projects-demo.tsx",
	},
	"team-prompt-library": {
		name: "team-prompt-library",
		title: "Prompt Library",
		component: TeamPromptLibraryDemo,
		componentSlug: "team-prompt-library",
		sourcePath: "src/demos/blocks/team/team-prompt-library-demo.tsx",
	},
	"team-settings": {
		name: "team-settings",
		title: "Settings",
		component: TeamSettingsDemo,
		componentSlug: "team-settings",
		sourcePath: "src/demos/blocks/team/team-settings-demo.tsx",
	},
	"team-switcher": {
		name: "team-switcher",
		title: "Switcher",
		component: TeamSwitcherDemo,
		componentSlug: "team-switcher",
		sourcePath: "src/demos/blocks/team/team-switcher-demo.tsx",
	},
}
