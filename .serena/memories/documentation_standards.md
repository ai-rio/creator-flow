# CreatorFlow Documentation Standards

## Naming Convention (MANDATORY)

- **ALWAYS** use P###/S###/I###/R###-DRAFT format
- P### = Planning, S### = Specification, I### = Implementation, R### = Reference
- Keep DRAFT suffix until user validation

## Folder Structure (MANDATORY)

- `docs/development/[initiative]/[category]/`
- Category examples: 01-specifications, 02-implementation, 03-reference
- NEVER create docs in project root

## Document Requirements

- Proper header with metadata and DRAFT status
- "Related Documents" section at bottom of every document
- **MoSCoW Agile Methodology MANDATORY** for all planning and implementation docs
- Wait for user validation before removing DRAFT

## MoSCoW Methodology (REQUIRED)

All planning and implementation documentation MUST follow MoSCoW prioritization:

- **Must Have** → Critical features for MVP/release
- **Should Have** → Important but not critical features
- **Could Have** → Nice-to-have features if time permits
- **Won't Have** → Features explicitly excluded from current scope

## Examples

✅ `docs/development/design-system/01-specifications/S001-DRAFT-overview.md`
❌ `docs/development/design-system/README.md`
