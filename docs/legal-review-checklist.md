# Legal document publication review

The Korean pages under `/ko/legal/` are review drafts. They must not be connected to the production consent URLs or described as effective policies until the open facts below are confirmed and the documents are approved.

## Confirm before publication

- Identify the service operator's legal name, business address, privacy contact, and responsible privacy officer or team.
- Confirm the Pinfinity Pinferno implementation's production account identity fields, including guest device ID/app instance ID and Google `sub`, whether Google email is stored, and all account/profile/game/social/ranking/activity/purchase fields actually retained.
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
- Only after the above, set `legal_consent.terms_url` and `legal_consent.privacy_url` to the final stable URLs and set production version strings. Site draft versions `draft-1` and `draft-2` are not the server's current version `1`.
- Preserve each published snapshot under a new path such as `/ko/legal/draft-3/`; never edit an older snapshot's content partial. Point stable entry routes at the selected current snapshot.

## Confirmed implementation evidence used for the draft

The user-facing game name is **Pinfinity Pinferno**. The existing implementation repositories and their API/database identifiers retain the project name **PinBallatro**; repository paths, issue/PR references, and the server `legal_consent` setting below identify that implementation, not the public game title.

- [Issue PinBallatro_Godot#531](https://github.com/PassionDrivenFruit-Studio/PinBallatro_Godot/issues/531) and merged [PR #534](https://github.com/PassionDrivenFruit-Studio/PinBallatro_Godot/pull/534) (head `a26ea8a`) implement required terms, personal-data collection/use, and age-14 confirmation fields. The client opens the detail URLs returned by the consent API when present.
- [PR PinBallatro_server#107](https://github.com/PassionDrivenFruit-Studio/PinBallatro_server/pull/107) (head `b046ab1`) and [`docs/features/legal-consent.md`](https://github.com/PassionDrivenFruit-Studio/PinBallatro_server/blob/main/docs/features/legal-consent.md) specify the `player_legal_consents` fields, one latest row per user, and cascade deletion with the user record. Version changes require renewed consent; changing URLs alone does not.
- Server [`docs/database_schema.md`](https://github.com/PassionDrivenFruit-Studio/PinBallatro_server/blob/main/docs/database_schema.md) documents guest and Google identities, an optional Google email field, profiles, game state, rankings, and social data.
- Pinfinity Pinferno's implementation manifest in [`PinBallatro_Godot`](https://github.com/PassionDrivenFruit-Studio/PinBallatro_Godot/blob/main/android/build/src/main/AndroidManifest.xml) integrates Google Play Games and Google Mobile Ads and declares `AD_ID`, `INTERNET`, and `ACCESS_NETWORK_STATE` permissions.
- The [Minesweeper Korean privacy page](../src/_includes/privacy/ko.njk) describes no account/database operated by the developer and Google AdMob processing. This is game-specific and does not describe Pinfinity Pinferno.

## Site paths

- Shared studio terms draft: `/ko/legal/terms.html`
- Shared studio privacy draft: `/ko/legal/privacy.html`
- Pinfinity Pinferno required collection/use consent summary draft: `/ko/legal/pinfinity-pinferno-consent.html`
- Backward-compatible path `/ko/legal/pinballatro-consent.html` serves the same current Pinfinity Pinferno draft-2 content and canonicalizes to its new public route.

The Korean pages are the source text. Other language footers identify them as Korean-only links; no legal translations are implied. `draft-1` URLs and content partials remain unchanged as historical snapshots. Stable entry templates point to the immutable `draft-2` snapshots in `src/_includes/legal/draft-2/`; when updating a draft, create another versioned snapshot and do not edit older content in place.


## draft-3 review (2026-11-06, issue #713)

Stable entry routes and the compatibility alias remain on draft-2. Historical draft-1/draft-2 partials were not edited. New review routes: `/ko/legal/draft-3/terms.html`, `privacy.html`, `pinfinity-pinferno-consent.html`, and `support.html` under the same directory; all are noindex.

- Terms: next-update account deletion, immediate success/logout, new account on re-login, deletion scope and retained records; explicit refund and operator placeholders.
- Privacy: deletion scope and session-retry exception, retained ledger/IAP/referral/consent/ranking records, configurable cleanup defaults, access-log fields, Google Play Games, AdMob SSV, and purchase verification categories.
- Consent summary: the same deletion/retention distinctions and external processing categories; removed the obsolete claim that in-app deletion cascades legal consent removal.
- Support: draft-2 contains a contact section with unresolved responsible-person/operator details, so a review-only contact page was added. The old email is not treated as a verified legal contact.
- Vendor policy links reuse the Google privacy and AdMob links already present in the site's Korean game privacy partial; draft-2 legal partials themselves contain no vendor policy links.

### Read-only code evidence

- Server dev `server/admin-api/src/account_deletion.js`: personal-row inventory, profile replacement, session revocation, retained user row and deletion receipt. `src/social/guilds.js` handles membership exit. `src/routes.js` exposes POST `/players/me/account/delete`.
- Retained records are **not proven fully anonymous**: internal user IDs and purchase evidence remain. Public draft-3 describes removal of direct identity information and flags re-identification/additional anonymisation review rather than claiming irreversible anonymisation.
- Server dev `server/admin-api/src/tools/retention_cleanup.js`: completed/failed idempotency records, debug API calls and published outbox defaults 30 days; social action limits 7 days. Values are configurable; source does not prove deployed scheduling.
- Server dev `server/admin-api/src/log.js`: request ID, method, normalized route, status, duration, optional bytes, truncated SHA-256 user ID; no token/IP fields in this access record. This does not establish infrastructure or debug log policy.
- Server dev `server/admin-api/src/server.js` Google authentication and rewarded SSV handlers; `src/shop/iap.js` purchase token/receipt verification flow.
- Client `origin/main` has no account deletion match in scripts; `origin/dev/v1.3.00:scripts/home/overlays/SettingsOverlay.gd` adds AccountDelete and `scripts/autoload/AuthService.gd` sends deletion and resets the session on success. No Godot run or production environment inspection was performed.

### Remaining publication blockers

Visible placeholders cover operator legal name, business address, privacy officer/name/title, contact email, effective date, governing law/jurisdiction/dispute procedures, age/guardian conditions, refund/payment/termination details, rights-request and identity-check procedures/response timing, retained-record legal basis and periods, backups, re-identification risk, cleanup deployment/schedule, access-log retention/access control, SDK settings/data safety declarations and vendor processing. Hosting/processors, storage/cross-border details and Minesweeper release parity still require the review above.

Only after user approval and completion of publication review, switch the four stable entry templates to draft-3. Then set server `legal_consent.terms_url` to `https://pdf-studio.co.kr/ko/legal/terms.html` and `privacy_url` to `https://pdf-studio.co.kr/ko/legal/privacy.html`, and bump the consent versions to trigger renewed consent. Do not use draft-3 as a production version automatically. No server settings were changed here.
