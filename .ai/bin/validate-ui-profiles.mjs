#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const errors = []
const openStatuses = new Set([
  "DRAFT",
  "READY",
  "DOING",
  "TECH_REVIEW",
  "UI_REVIEW",
  "WAITING_IMPLEMENTER",
  "CHANGES",
  "RECOVERY",
  "BLOCKED_RUNTIME",
])

function fail(message) {
  errors.push(message)
}

function readText(relativePath) {
  const absolutePath = path.join(root, relativePath)
  try {
    return fs.readFileSync(absolutePath, "utf8")
  } catch {
    fail(`${relativePath} is missing or unreadable`)
    return null
  }
}

function readField(markdown, field) {
  const escaped = field.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const match = markdown.match(new RegExp(`^${escaped}:\\s*(.+?)\\s*$`, "mi"))
  return match?.[1]?.trim() ?? null
}

function readFrontmatterList(markdown, field) {
  const frontmatter = markdown.match(/^---\n([\s\S]*?)\n---(?:\n|$)/)?.[1]
  if (!frontmatter) {
    return null
  }

  const lines = frontmatter.split("\n")
  const fieldIndex = lines.findIndex((line) => line.trim() === `${field}:`)
  if (fieldIndex === -1) {
    return null
  }

  const values = []
  for (const line of lines.slice(fieldIndex + 1)) {
    const item = line.match(/^\s+-\s+([a-z0-9-]+)\s*$/)
    if (item) {
      values.push(item[1])
      continue
    }
    if (/^\S/.test(line)) {
      break
    }
  }

  return values
}

const projectPath = ".ai/project.json"
const projectSource = readText(projectPath)
let project = null

if (projectSource) {
  try {
    project = JSON.parse(projectSource)
  } catch (error) {
    fail(`${projectPath} is not valid JSON: ${error.message}`)
  }
}

let allowedProfiles = []
if (project) {
  if (typeof project.projectKind !== "string" || !project.projectKind.trim()) {
    fail(`${projectPath}: projectKind must be a non-empty string`)
  }

  if (!Array.isArray(project.allowedUiProfiles) || project.allowedUiProfiles.length === 0) {
    fail(`${projectPath}: allowedUiProfiles must be a non-empty array`)
  } else {
    allowedProfiles = project.allowedUiProfiles
    const uniqueProfiles = new Set(allowedProfiles)
    if (uniqueProfiles.size !== allowedProfiles.length) {
      fail(`${projectPath}: allowedUiProfiles contains duplicates`)
    }
    for (const profile of allowedProfiles) {
      if (typeof profile !== "string" || !/^[a-z0-9-]+$/.test(profile)) {
        fail(`${projectPath}: invalid UI profile name ${JSON.stringify(profile)}`)
      }
    }
  }

  if (typeof project.defaultUiProfile !== "string") {
    fail(`${projectPath}: defaultUiProfile must be a string`)
  } else if (!allowedProfiles.includes(project.defaultUiProfile)) {
    fail(`${projectPath}: defaultUiProfile must be listed in allowedUiProfiles`)
  }
}

for (const profile of allowedProfiles) {
  const profilePath = `.ai/profiles/${profile}.md`
  const markdown = readText(profilePath)
  if (!markdown) {
    continue
  }

  const declaredName = readField(markdown, "name")
  if (declaredName !== profile) {
    fail(`${profilePath}: frontmatter name must be ${profile}`)
  }

  const requiredSkills = readFrontmatterList(markdown, "required-skills")
  if (!requiredSkills) {
    fail(`${profilePath}: required-skills must be a YAML list`)
    continue
  }

  for (const skill of requiredSkills) {
    const skillPath = `.agents/skills/${skill}/SKILL.md`
    if (!fs.existsSync(path.join(root, skillPath))) {
      fail(`${profilePath}: required skill ${skill} is unavailable at ${skillPath}`)
    }
  }
}

const specsDirectory = path.join(root, ".ai/specs")
if (fs.existsSync(specsDirectory)) {
  const specFiles = fs
    .readdirSync(specsDirectory)
    .filter((file) => file.endsWith(".md"))
    .sort()

  for (const file of specFiles) {
    const relativePath = `.ai/specs/${file}`
    const markdown = readText(relativePath)
    if (!markdown) {
      continue
    }

    const status = readField(markdown, "Status")
    if (!openStatuses.has(status)) {
      continue
    }

    const uiReview = readField(markdown, "UI Review")?.toLowerCase()
    const uiProfile = readField(markdown, "UI Profile")
    if (!uiProfile) {
      fail(`${relativePath}: open specs must declare UI Profile`)
      continue
    }

    if (uiProfile !== "none" && !allowedProfiles.includes(uiProfile)) {
      fail(`${relativePath}: UI Profile ${uiProfile} is not allowed by ${projectPath}`)
    }

    if (["skip", "no", "false", "not required", "none"].includes(uiReview)) {
      if (uiProfile !== "none") {
        fail(`${relativePath}: UI Review ${uiReview} requires UI Profile: none`)
      }
    } else if (["required", "yes", "true"].includes(uiReview)) {
      if (uiProfile === "none") {
        fail(`${relativePath}: visible UI work cannot use UI Profile: none`)
      }
    }
  }
}

if (errors.length > 0) {
  for (const error of errors) {
    console.error(`- ${error}`)
  }
  process.exit(1)
}

console.log(
  `UI profiles valid: ${project?.defaultUiProfile ?? "unknown"} default, ${allowedProfiles.length} allowed`,
)
