import type { DemoEntry } from "@/demos/types"

import { SettingsAccountDemo } from "./settings-account-demo"
import { SettingsActivityLogDemo } from "./settings-activity-log-demo"
import { SettingsAdvancedDemo } from "./settings-advanced-demo"
import { SettingsApiKeysDemo } from "./settings-api-keys-demo"
import { SettingsBackupDemo } from "./settings-backup-demo"
import { SettingsDomainsDemo } from "./settings-domains-demo"
import { SettingsExportDataDemo } from "./settings-export-data-demo"
import { SettingsImportDataDemo } from "./settings-import-data-demo"
import { SettingsIntegrationsDemo } from "./settings-integrations-demo"
import { SettingsNotificationsDemo } from "./settings-notifications-demo"
import { SettingsPreferencesDemo } from "./settings-preferences-demo"
import { SettingsPrivacyDemo } from "./settings-privacy-demo"
import { SettingsProfileDemo } from "./settings-profile-demo"
import { SettingsSecurityDemo } from "./settings-security-demo"
import { SettingsSsoDemo } from "./settings-sso-demo"
import { SettingsStorageDemo } from "./settings-storage-demo"
import { SettingsTeamMembersDemo } from "./settings-team-members-demo"
import { SettingsWebhooksDemo } from "./settings-webhooks-demo"

export const settingsDemos: Record<string, DemoEntry> = {
	"settings-account": {
		name: "settings-account",
		title: "Account",
		component: SettingsAccountDemo,
		componentSlug: "settings-account",
		sourcePath: "src/demos/blocks/settings/settings-account-demo.tsx",
	},
	"settings-activity-log": {
		name: "settings-activity-log",
		title: "Activity Log",
		component: SettingsActivityLogDemo,
		componentSlug: "settings-activity-log",
		sourcePath: "src/demos/blocks/settings/settings-activity-log-demo.tsx",
	},
	"settings-advanced": {
		name: "settings-advanced",
		title: "Advanced",
		component: SettingsAdvancedDemo,
		componentSlug: "settings-advanced",
		sourcePath: "src/demos/blocks/settings/settings-advanced-demo.tsx",
	},
	"settings-api-keys": {
		name: "settings-api-keys",
		title: "Api Keys",
		component: SettingsApiKeysDemo,
		componentSlug: "settings-api-keys",
		sourcePath: "src/demos/blocks/settings/settings-api-keys-demo.tsx",
	},
	"settings-backup": {
		name: "settings-backup",
		title: "Backup",
		component: SettingsBackupDemo,
		componentSlug: "settings-backup",
		sourcePath: "src/demos/blocks/settings/settings-backup-demo.tsx",
	},
	"settings-domains": {
		name: "settings-domains",
		title: "Domains",
		component: SettingsDomainsDemo,
		componentSlug: "settings-domains",
		sourcePath: "src/demos/blocks/settings/settings-domains-demo.tsx",
	},
	"settings-export-data": {
		name: "settings-export-data",
		title: "Export Data",
		component: SettingsExportDataDemo,
		componentSlug: "settings-export-data",
		sourcePath: "src/demos/blocks/settings/settings-export-data-demo.tsx",
	},
	"settings-import-data": {
		name: "settings-import-data",
		title: "Import Data",
		component: SettingsImportDataDemo,
		componentSlug: "settings-import-data",
		sourcePath: "src/demos/blocks/settings/settings-import-data-demo.tsx",
	},
	"settings-integrations": {
		name: "settings-integrations",
		title: "Integrations",
		component: SettingsIntegrationsDemo,
		componentSlug: "settings-integrations",
		sourcePath: "src/demos/blocks/settings/settings-integrations-demo.tsx",
	},
	"settings-notifications": {
		name: "settings-notifications",
		title: "Notifications",
		component: SettingsNotificationsDemo,
		componentSlug: "settings-notifications",
		sourcePath: "src/demos/blocks/settings/settings-notifications-demo.tsx",
	},
	"settings-preferences": {
		name: "settings-preferences",
		title: "Preferences",
		component: SettingsPreferencesDemo,
		componentSlug: "settings-preferences",
		sourcePath: "src/demos/blocks/settings/settings-preferences-demo.tsx",
	},
	"settings-privacy": {
		name: "settings-privacy",
		title: "Privacy",
		component: SettingsPrivacyDemo,
		componentSlug: "settings-privacy",
		sourcePath: "src/demos/blocks/settings/settings-privacy-demo.tsx",
	},
	"settings-profile": {
		name: "settings-profile",
		title: "Profile",
		component: SettingsProfileDemo,
		componentSlug: "settings-profile",
		sourcePath: "src/demos/blocks/settings/settings-profile-demo.tsx",
	},
	"settings-security": {
		name: "settings-security",
		title: "Security",
		component: SettingsSecurityDemo,
		componentSlug: "settings-security",
		sourcePath: "src/demos/blocks/settings/settings-security-demo.tsx",
	},
	"settings-sso": {
		name: "settings-sso",
		title: "Sso",
		component: SettingsSsoDemo,
		componentSlug: "settings-sso",
		sourcePath: "src/demos/blocks/settings/settings-sso-demo.tsx",
	},
	"settings-storage": {
		name: "settings-storage",
		title: "Storage",
		component: SettingsStorageDemo,
		componentSlug: "settings-storage",
		sourcePath: "src/demos/blocks/settings/settings-storage-demo.tsx",
	},
	"settings-team-members": {
		name: "settings-team-members",
		title: "Team Members",
		component: SettingsTeamMembersDemo,
		componentSlug: "settings-team-members",
		sourcePath: "src/demos/blocks/settings/settings-team-members-demo.tsx",
	},
	"settings-webhooks": {
		name: "settings-webhooks",
		title: "Webhooks",
		component: SettingsWebhooksDemo,
		componentSlug: "settings-webhooks",
		sourcePath: "src/demos/blocks/settings/settings-webhooks-demo.tsx",
	},
}
