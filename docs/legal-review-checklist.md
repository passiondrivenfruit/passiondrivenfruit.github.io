# Legal document publication review

The Korean pages under `/ko/legal/` are review drafts. They must not be connected to the production consent URLs or described as effective policies until the open facts below are confirmed and the documents are approved.

## Confirm before publication

- Identify the service operator's legal name, business address, privacy contact, and responsible privacy officer or team.
- Confirm PinBallatro's production account identity fields, including guest device ID/app instance ID and Google `sub`, whether Google email is stored, and all account/profile/game/social/ranking/activity/purchase fields actually retained.
- Confirm the account deletion flow, deletion scope, backup/log exceptions, and retention period for each data category. The consent table's cascade behavior alone does not establish overall retention.
- Inventory API/access/security logs and their fields, purposes, access controls, and deletion schedules.
- Inspect the shipped AdMob and Google Play Games SDK versions, configuration, data safety declarations, and network behavior; list exact categories, purposes, and vendor policies.
- Identify hosting, database, backup, email/support, analytics, ad, authentication, and other vendors; document processing delegation, storage locations, cross-border transfers, and retention.
- Verify user request procedures for access, correction, deletion, processing restriction, account recovery, and appeal, including identity checks and any response timing commitments.
- For games with paid content, settle purchase methods and terms, cancellations/refunds, service termination effects, and any applicable user appeal process without assuming a statutory period in the draft.
- Confirm age eligibility, under-14 handling, and any guardian process for each game and target region.
- Review Minesweeper's existing privacy statement against its current released build and Play Console declarations.
- Decide which games are covered. Add future games only after documenting their data flows and service-specific terms.
- Obtain legal review for the applicable regions and confirm final Korean text, effective date, and change history.
- Only after the above, set `legal_consent.terms_url` and `legal_consent.privacy_url` to the final stable URLs and set production version strings. Version `draft-1` on this site is not the server's current version `1`.
- Preserve each published snapshot under a new path such as `/ko/legal/draft-2/`; never edit an older snapshot's content partial. Point stable entry routes at the selected current snapshot.

## Confirmed implementation evidence used for the draft

- [Issue PinBallatro_Godot#531](https://github.com/PassionDrivenFruit-Studio/PinBallatro_Godot/issues/531) and merged [PR #534](https://github.com/PassionDrivenFruit-Studio/PinBallatro_Godot/pull/534) (head `a26ea8a`) implement required terms, personal-data collection/use, and age-14 confirmation fields. The client opens the detail URLs returned by the consent API when present.
- [PR PinBallatro_server#107](https://github.com/PassionDrivenFruit-Studio/PinBallatro_server/pull/107) (head `b046ab1`) and [`docs/features/legal-consent.md`](https://github.com/PassionDrivenFruit-Studio/PinBallatro_server/blob/main/docs/features/legal-consent.md) specify the `player_legal_consents` fields, one latest row per user, and cascade deletion with the user record. Version changes require renewed consent; changing URLs alone does not.
- Server [`docs/database_schema.md`](https://github.com/PassionDrivenFruit-Studio/PinBallatro_server/blob/main/docs/database_schema.md) documents guest and Google identities, an optional Google email field, profiles, game state, rankings, and social data.
- PinBallatro [`AndroidManifest.xml`](https://github.com/PassionDrivenFruit-Studio/PinBallatro_Godot/blob/main/android/build/src/main/AndroidManifest.xml) integrates Google Play Games and Google Mobile Ads and declares `AD_ID`, `INTERNET`, and `ACCESS_NETWORK_STATE` permissions.
- The [Minesweeper Korean privacy page](../src/_includes/privacy/ko.njk) describes no account/database operated by the developer and Google AdMob processing. This is game-specific and does not describe PinBallatro.

## Site paths

- Shared studio terms draft: `/ko/legal/terms.html`
- Shared studio privacy draft: `/ko/legal/privacy.html`
- PinBallatro required collection/use consent summary draft: `/ko/legal/pinballatro-consent.html`

The Korean pages are the source text. Other language footers identify them as Korean-only links; no legal translations are implied. Stable entry templates and `draft-1` URLs use the immutable partials in `src/_includes/legal/draft-1/`.
