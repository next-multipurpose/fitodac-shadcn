# Forms and Actions

Use this reference for creation and editing flows, field organization, validation, action hierarchy, destructive operations, and save feedback.

## Form structure

Organize fields in the order users think about the task, not the order of database columns.

1. Start with identity and required information.
2. Follow with task-specific details.
3. Place optional or advanced settings later.
4. Put consequences, permissions, and destructive controls in clearly separated regions.

Use sections when they represent meaningful concepts. Prefer spacing and headings before nested cards. Avoid accordions for required fields or information users must compare simultaneously.

## Field layout

- Use a single column by default for complex or narrative forms.
- Use multiple columns only for short, strongly related fields that remain understandable at narrow widths.
- Keep labels visible; placeholders are examples or hints, not label replacements.
- Place help text close to the field it explains.
- Mark optional fields explicitly when most fields are required, or required fields when most are optional; do not mark both systems at once.
- Use the correct control for the data type and number of options.
- Keep control heights, labels, gaps, and error placement consistent.
- Preserve sensible tab order and keyboard operation.

## Control selection

- Use text inputs for short free text.
- Use textareas for meaningful multiline content.
- Use checkboxes for independent choices.
- Use radios for a small visible set of mutually exclusive choices.
- Use a select or combobox for longer option sets; prefer a combobox when search is useful.
- Use switches for settings that take effect immediately and represent on/off state.
- Do not use a switch as a substitute for a confirmation-dependent action.
- Use date and time controls appropriate to locale and scheduling precision.

## Validation

- Validate as early as useful, but do not show errors before the user has interacted unless submitting.
- Place field errors next to their field.
- Use a form-level summary when errors are distributed or submission failed for a non-field reason.
- Explain how to resolve the problem.
- Preserve entered values after validation or server failure.
- Move focus to the first invalid field or error summary after failed submission when appropriate.
- Use `aria-invalid`, programmatic descriptions, and accessible error associations.
- Do not rely on color alone.

Client validation improves feedback but does not replace server validation.

## Creation and editing

Creation and editing may share components, but their intent differs.

### Create

- Start with safe defaults.
- Make required information and outcome clear.
- After success, navigate or reset according to the workflow; do not surprise the user.
- Prevent accidental duplicate submissions.

### Edit

- Load existing values without layout shift when possible.
- Distinguish saved values from unsaved changes.
- Do not overwrite fields the user cannot edit.
- Warn before losing meaningful unsaved changes when navigation is accidental.
- Keep audit or metadata information separate from editable fields.

## Action hierarchy

Within a form or dialog:

- Use one primary submit action.
- Keep cancel or back visually secondary.
- Match the button label to the outcome: `Create store`, `Save changes`, or `Send invitation` is clearer than `Submit`.
- Keep primary action placement consistent across equivalent forms.
- Disable submission only when the reason is understandable; validation on submit is often clearer than silently disabled controls.
- Show progress on the triggering action and prevent duplicate execution.
- Do not change button width when replacing its label with a loading indicator.

For long forms, use a stable action area only when it materially reduces scrolling or prevents lost context.

## Destructive actions

- Separate destructive actions from routine save controls.
- Use semantic destructive styling without making the entire page alarming.
- Require confirmation when the action is irreversible, expensive, or affects other users.
- Name the affected object and consequence in the confirmation.
- Require typed confirmation only for unusually high-impact operations.
- Prefer reversible deactivation or archive flows when the domain supports them.
- Never make the destructive action the default focused confirmation button.

## Feedback and asynchronous behavior

### Pending

- Show progress at the action's source.
- Keep unaffected parts of the form readable.
- Prevent conflicting edits or duplicate submission when necessary.

### Success

- Confirm completion close to the workflow.
- Update visible data immediately or clearly indicate refresh.
- Use a toast for transient confirmation; use inline status when the result must remain visible.
- Do not show both an intrusive dialog and a toast for the same ordinary success.

### Failure

- Keep user input intact.
- Explain whether the operation failed completely or partially.
- Provide a retry path when safe.
- Avoid generic `Something went wrong` when a more useful message is available.

## Dialogs, sheets, and pages

Choose based on task complexity and context:

- **Dialog:** short, focused decisions or forms with limited fields.
- **Sheet:** contextual editing that benefits from retaining the underlying page.
- **Dedicated page:** complex forms, multiple sections, deep linking, or tasks requiring substantial space.
- **Inline editing:** fast changes to simple fields where row context matters.

Do not place a complex, scroll-heavy workflow inside a small dialog. Preserve a clear close or back path and restore focus after overlays close.

## Permissions and sensitive fields

- Hide actions that are never available to the user.
- Disable actions only when seeing the capability and its unavailable reason is useful.
- Do not expose secret values after initial entry unless the product explicitly supports it.
- Explain permission restrictions in user language.
- Keep privileged and destructive settings visually distinct from ordinary profile fields.

## Responsive forms

- Collapse multi-column groups into a logical single-column order.
- Keep labels, help, and errors attached to their controls.
- Ensure action bars do not obscure the last fields.
- Use input modes and autocomplete attributes appropriate to the data.
- Test overlays with the on-screen keyboard and small viewport height.

## Review questions

- Does field order follow the user's mental model?
- Are labels, help text, required status, and errors unambiguous?
- Is there one clear primary action?
- Are creation and editing outcomes predictable?
- Are destructive actions separated and proportional to their risk?
- Is user input preserved through validation and server failures?
- Are pending and success states shown at the right level?
- Does the form remain usable with keyboard, mobile viewport, and realistic content?
