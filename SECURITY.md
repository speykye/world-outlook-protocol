# Security Policy

World Outlook Protocol is a public data-format and validation package. It does not contain the full World Outlook application, cloud services, or private user data storage logic.

## Supported versions

| Version | Status |
| --- | --- |
| 0.x | Experimental protocol drafts |

Security handling is best-effort during the `0.x` phase.

## Reporting a vulnerability

Please do not disclose security issues through public issues if they involve:

- Private worldbuilding data
- Unpublished story materials
- Personal data
- Client or commission records
- Confidential collaboration exports
- A validator bypass that could affect users importing untrusted bundles

Use GitHub's private vulnerability reporting feature if enabled on the repository. If it is not enabled, contact the repository owner privately through the official contact channel listed on the project homepage or profile.

## Data privacy warning

Do not attach real user exports to public issues or pull requests.

When reporting a bug, create a minimal synthetic example instead. Remove or replace:

- Character names from unpublished works
- Client names
- Private notes
- Locations that identify real people
- Collaboration records
- Payment, contract, or dispute-related information

## Validator limitations

The validator checks protocol shape and common reference-integrity problems. It is not a sandbox, malware scanner, copyright checker, legal compliance tool, or content-moderation system.

Applications that import protocol bundles should still implement their own trust boundaries and user confirmations.
