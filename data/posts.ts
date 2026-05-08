export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readingMinutes: number;
  body: string;
}

export const posts: readonly BlogPost[] = [
  {
    slug: "follow-the-sun-engineering",
    title: "The Rise of \"Follow the Sun\" Engineering",
    description:
      "How a once-niche operations model became the dominant pattern for global product teams — what it gets right, what it routinely breaks, and how to set it up without burning your senior engineers.",
    publishedAt: "2026-05-08",
    readingMinutes: 11,
    body: `"Follow the sun" started as an enterprise IT support concept: a ticket opened in New York at 6 PM gets handed to London at midnight, then to Bangalore at 8 AM, and is back on the New York team's desk by morning, ideally resolved. The model existed for a decade in support orgs before product engineering teams took it seriously. Around 2020, with remote-first companies abandoning the requirement that engineers all live in the same city, "follow the sun" started showing up in actual product engineering — incident response, code review pipelines, design hand-offs.

Three years in, the pattern works. But it works *very differently* from what the original support-org playbook implied. This is what we've learned running it at three companies.

## What follow-the-sun actually means in 2026

The pure form: a single project, owned by a single team distributed across at least three time zones, where work flows continuously around the clock. When North America logs off, Europe is mid-day; when Europe winds down, Asia is mid-day. Theoretically, your project never stops moving.

The reality: pure follow-the-sun is rare. What most teams actually do is "follow-the-sun-ish" — they ensure *coverage* across time zones for specific critical functions (incident response, security review, customer-facing communication) while letting most product engineering work happen in localized clusters with good async hand-off discipline.

## What it gets right

**1. Real 24-hour incident coverage without hero schedules.** A team with engineers in three regions can split on-call into 8-hour shifts that align with each region's daytime, eliminating the burnout of a US-only team taking 3 AM pages. This alone justifies the model for any service with availability commitments.

**2. Compressed PR review and code feedback loops.** When a junior engineer in Bangalore opens a PR at 6 PM local, a senior in Lisbon reviews it during their morning, and the original author has feedback when they wake up. Instead of "PR opened Friday, reviewed Tuesday," you get "PR opened, reviewed, merged within 18 hours." Shipping velocity goes up materially.

**3. Faster customer response on complex issues.** A bug report from a European enterprise customer can hit US engineering before Europe even goes home. The customer wakes up Tuesday morning to a fixed bug instead of "we'll look at it next week."

**4. Built-in resilience.** When a region has a holiday, a power outage, or a regional crisis, the work continues. This sounds abstract until you've watched a US-only team lose a week of momentum because of a Christmas-NYE-MLK-day stretch.

## What it routinely breaks

**1. Architectural cohesion suffers without explicit countermeasures.** Async PR reviews are great until you discover that no one in the Asia cluster knows the architectural decisions made by the Americas cluster three months ago, because those decisions happened in synchronous whiteboarding sessions that never got documented properly. The fix is brutal-sounding but real: every meaningful architectural decision becomes a document, with a comments period that crosses time zones, before code is written. This adds 3-7 days to anything architectural and is the single biggest cost of running this model.

**2. Senior engineers get hammered by hand-off culture.** The model implicitly assumes any engineer can pick up where another left off. In reality, the hand-offs that work involve a senior engineer who can read partial code and infer context. That senior gets 4-6 hand-off contexts per week, each requiring an hour of mental model loading. Multiply by twelve months and you have a senior engineer who has done 200+ context loads. They don't get to do deep work. Many quit.

**3. Mid-level engineers get stuck.** A mid-level engineer's growth depends on extended uninterrupted ownership of a problem. When their work is constantly handed off to other regions for "continued progress," they don't get the chance to wrestle with hard problems and develop the senior judgment they need. Three years of follow-the-sun experience can be three years of shallow exposure to many things rather than deep ownership of any.

**4. Time zones create a quiet caste system.** The region whose business hours align with leadership tends to make decisions; the regions whose nights align with leadership tend to execute. Compensation, promotion, and political weight quietly drift toward the leadership-aligned region. Companies that don't actively counterweight this end up with a "second-class regions" problem within 18-24 months.

**5. The "always-on" team has nobody on duty.** A subtle failure mode: when something goes wrong at 3 AM US time, the US team assumes Asia or Europe will handle it. Asia assumes Europe is still up. Europe assumes the US is the owner. Without explicit ownership and clear escalation paths, follow-the-sun produces "many people responsible for everything" — which means nobody is responsible for anything.

## What we recommend

For most product engineering teams, **don't run pure follow-the-sun**. Run a hybrid model:

- **Regional ownership for architectural work.** Each major service or system has an owning team in one region. They make architectural decisions, do deep work, and own the long-term direction. This protects mid-level career development and keeps cohesion.
- **Cross-regional ownership for incident response.** On-call rotates across regions so no one takes 3 AM pages. This is the highest-ROI use of distributed staffing.
- **Cross-regional ownership for code review and customer-facing channels.** Async-by-default with clear SLA expectations (e.g., "non-urgent PRs reviewed within one business day in the reviewer's region").
- **One required cross-regional sync per week**, kept to 30 minutes, rotating times so no single region always loses sleep. This is the political glue.

This hybrid captures most of follow-the-sun's velocity benefits while protecting the things pure-form breaks: senior wellbeing, mid-level growth, and architectural coherence.

## Hiring for follow-the-sun

The skill that matters most in a follow-the-sun engineer is not technical — it's **written communication**. Specifically: writing PR descriptions, decision documents, and hand-off notes that another engineer can pick up cold and continue from.

Most engineers, even strong ones, are not good at this. They underestimate how much context their teammates have, write terse descriptions, and rely on Slack DMs to fill the gaps. In a co-located team this works. In a follow-the-sun team it produces dropped balls.

When hiring for distributed teams, evaluate writing samples (PR descriptions from open source, blog posts, even Slack threads). Pay close attention to candidates who can describe a complex technical situation in 200 written words such that another engineer can act on it. This skill is almost a hard prerequisite for the model to work.

## Tools that help, ones that don't

**Help**:
- A central decision log (Notion, Linear, or even a /docs folder in the repo) where every meaningful decision lives with reasoning, alternatives, and the date it was made. Future-you and future-them will thank you.
- Async video updates (Loom, Tella) for any explanation that's faster spoken than written. 5 minutes of recorded video often replaces 90 minutes of cross-region meetings.
- A timezone planner everyone trusts for scheduling the few sync meetings you actually need.

**Don't help**:
- Slack as the primary decision medium. Decisions get buried, people in other time zones miss the discussion, and three months later no one can find the rationale.
- Status meetings. Every cross-region status meeting is one of three things: a forcing function for written status (in which case do that and skip the meeting), a relationship check-in (be honest about that and don't pretend it's about status), or a leadership theater (kill it).

## The five-year track record

Companies running follow-the-sun for 3+ years tend to settle into a pattern where:

- Velocity is measurably higher than co-located equivalents on well-defined work.
- Innovation rate is *not* obviously higher and may be slightly lower, because deep architectural work is harder to do in a hand-off culture.
- Retention is higher in regions away from headquarters (because they have ownership and growth) and lower in headquarters regions (because the political dynamics shift in unexpected ways).
- Customer satisfaction on response time is materially higher.

Follow-the-sun is a powerful pattern. But like every powerful pattern, it has trade-offs you'll only learn by paying for them. Start with a hybrid model, instrument the things that historically break (senior wellbeing, mid-level growth, architectural cohesion), and adjust as you see the wear.`,
  },
  {
    slug: "video-tools-tz-best-practices",
    title: "Zoom, Google Meet, and Slack Huddles: Timezone Best Practices",
    description:
      "How to configure your team's video tools to handle time zones gracefully — calendar pinning, recurring meetings, recording norms, and the small settings that quietly cost teams hours per month.",
    publishedAt: "2026-05-06",
    readingMinutes: 9,
    body: `Every distributed team eventually has a meeting they all show up to an hour wrong. The cause is almost always a small misconfiguration in the video tool or the calendar that booked it. This post is a tour of the specific settings — in Zoom, Google Meet, and Slack Huddles — that quietly cost distributed teams hours every month, and how to set them up so they stop.

We're going to skip the obvious advice ("use video for sensitive conversations," etc.) and focus on the timezone-specific configuration that actually moves the needle.

## The core problem

Calendar tools (Google Calendar, Outlook, Cal.com) handle time zones decently when used correctly. The trouble starts when:

- The meeting was created in one timezone and the host's timezone changed (laptop moved, traveling)
- A recurring meeting crosses a DST boundary
- Someone manually adjusts a meeting time to "fix" what they think is a bug
- The video tool's recording, transcription, or chat feature shows times in the wrong timezone for half the team

We'll handle each, by tool.

## Zoom

### Pin meetings to a *meeting* timezone, not a *user* timezone

When you create a Zoom meeting via the web portal or API, you specify a timezone. By default, Zoom uses your account timezone. If you're a road-warrior PM whose account is set to America/New_York but you book a meeting while you're in Tokyo, Zoom uses your *account* timezone (NY), not your *current* timezone — which is usually what you want, but not always.

For recurring meetings spanning DST: explicitly set the timezone to the timezone of the person whose schedule the meeting is anchored to (usually the team lead, or the person who can't shift). When DST changes for that person, the meeting time stays anchored to their clock — the rest of the team sees a one-hour shift in their local view, which is the correct behavior.

### The waiting room timezone bug

Zoom waiting rooms display the host the meeting time in the *host's* timezone. If you're hosting a 9 AM Tokyo meeting from a US laptop, your waiting room may show "9 PM" (US-Eastern view of Tokyo's 9 AM). Don't use that to verify the meeting is the right one — it'll cause you to second-guess. Use the calendar invite as the source of truth.

### Recording timestamps

Zoom cloud recordings are timestamped in the *recording owner's* timezone, not the meeting's timezone. This causes confusion when you're searching for "the recording from yesterday's standup" — yesterday's standup might have been today's morning to your search index. Fix: prefix all recording titles with a UTC date in the format YYYY-MM-DD, so they sort correctly regardless of your local clock.

## Google Meet (and Google Calendar)

Google Meet inherits all its timezone behavior from Google Calendar, so the configuration that matters is in Calendar.

### Use the "Event time zone" feature explicitly

When creating any cross-timezone recurring meeting in Google Calendar, click the "Time zone" link next to the event time and **explicitly select the timezone** of the event (don't accept the default of your current zone). This tells Calendar: "this meeting happens at 9:00 in *this* zone, and other attendees should see whatever time corresponds to 9:00 in that zone."

If you skip this step, Calendar uses your current device's timezone — and if you ever travel or your laptop's clock changes, the meeting will silently shift for everyone else.

### The "secondary time zone" setting

In Calendar settings, you can enable a secondary time zone display in the calendar view. Pick the timezone of your most-distant teammate. This way, when you're booking a meeting in your own grid, you can simultaneously see what time it would be for them — and avoid sending them a "9 AM" invite that's actually 2 AM their time.

### Recurring meetings and DST

Google Calendar handles DST correctly *if* the meeting was created with an explicit event timezone. If it was created with the default ("your time zone, whatever that is"), DST changes can shift the meeting in unexpected ways for attendees. Audit your recurring cross-timezone meetings annually to confirm they're anchored explicitly.

### "Find a Time" for cross-timezone scheduling

Use the "Find a Time" feature in Google Calendar's event creation dialog. It overlays everyone's calendars and shows you available windows across time zones. It's clunky but accurate, and it'll save you from suggesting a time that everyone reluctantly agrees to but secretly resents.

## Slack Huddles

Huddles are Slack's lightweight always-on voice/video drop-in. They're great for quick distributed-team communication — but the timezone-relevant gotchas are non-obvious.

### Slack does not show others' local time by default

When you DM someone in Slack, by default you do not see their current local time. You can hover their name and a tooltip shows it, but most people miss this. The fix: in your Slack profile, set your full timezone so others can see it. Encourage your team to set theirs. Some Slack workspaces install a "Timezone Bot" that adds a /tz command to look up any teammate's local time — worth installing.

### Huddle invites send without timezone awareness

When you invite someone to a Huddle, Slack sends a notification immediately. If they're asleep, this can wake them (depending on their notification settings). Slack's "Do Not Disturb" hours help, but they require each user to configure them — and many people don't.

Cultural norm to enforce: **never start a Huddle with someone outside your overlap window unless they've signaled they're available**. A Slack-status emoji (🌙 for "asleep" or working hours brackets in profile) is the polite way to signal this.

### Huddle recordings + timezones

Huddle transcripts are timestamped in the workspace timezone, not the participants'. If your workspace is configured for US-Eastern but your team is global, transcript timestamps will confuse anyone outside that zone. There's no fix at the workspace level (Slack Admin can set one workspace timezone, not per-channel). Just be aware when sharing transcripts.

## Calendar tool: Cal.com / Calendly

Both tools handle timezones well *if* configured correctly. The single most common mistake:

### Don't use "Round Robin" with single-region availability windows

When you set up a round-robin scheduling link with multiple team members across time zones, Cal/Calendly shows the booker the *intersection* of all team members' availability. If your three teammates are in NY, London, and Tokyo, the intersection might be a 30-minute window per day, which leaves the booker with nothing.

Better: set up *separate* booking links per region. The booker selects a region (or you assign automatically based on their detected timezone), and books with a teammate in that region. Both tools support this; very few teams configure it.

### The "buffer" gotcha

Both tools support buffer times before and after meetings. Set a buffer of *at least 15 minutes* for any cross-timezone meeting — bookers in different time zones often need a moment to switch contexts (mentally and visually) between their local meetings and a cross-timezone one.

## A general principle: write times in three formats

Whenever you communicate a meeting time in writing — invitations, Slack messages, docs — write it in three formats minimum:

> "Tuesday at 14:00 UTC (10:00 New York / 15:00 London / 22:00 Singapore)"

The cost is 30 seconds of typing. The benefit is no one ever has to do the conversion themselves at 7 in the morning. This convention dramatically reduces the rate of "I thought you meant my time" mistakes.

## What we wish more tools did

A short wish list, mostly aimed at video and calendar vendors:

1. **Auto-detect that an attendee is in a different timezone and warn before sending.** "You're inviting Alex (Singapore) to a 7 AM meeting their time. Confirm?" Some tools have started doing this; most still don't.
2. **Show the historical timezone view of recurring meetings.** When you open a recurring meeting created two years ago, show what timezone it was created in and how many DST transitions it has crossed.
3. **One-click "show me everyone's clock right now."** Most tools have this buried; promote it to the meeting creation flow.

For now, the workaround is your scheduling discipline plus a good external timezone planner. Use the tools, don't trust them blindly.`,
  },
  {
    slug: "effective-standups-3-time-zones",
    title: "Running Effective Standups Across 3+ Time Zones",
    description:
      "Why the daily standup breaks down on globally distributed teams and what to replace it with — including the specific async standup formats that actually keep teams aligned.",
    publishedAt: "2026-05-04",
    readingMinutes: 8,
    body: `The daily standup was invented by co-located XP teams in the late 1990s. Fifteen minutes, everyone in the same room, three questions ("what did you do yesterday, what will you do today, any blockers"). It worked because everyone was already in the office, the meeting was cheap, and the in-person dynamic surfaced subtle signals (body language, tone) that a written status update can't.

None of that is true for a globally distributed team. The standup as designed is broken on three or more time zones. This post is about what's actually broken, and the specific formats that work better.

## What's broken

**1. There's no time that respects everyone's working hours.** On a US-EU-Asia team, any synchronous standup costs at least one region a meeting outside their working hours. Daily, that adds up to dozens of hours per quarter of friction.

**2. The "what did you do yesterday" prompt is meaningless.** When the team spans 12 hours of working time, "yesterday" is a 36-hour window with no shared meaning. Engineer A's "yesterday" overlaps with Engineer B's "today" and Engineer C's "tomorrow."

**3. Updates lose their rhythm.** The standup is supposed to surface blockers fast. On a distributed team, a blocker raised in a US-aligned standup might not reach the engineer who can resolve it for 12+ hours, by which point the original raiser has already context-switched away.

**4. The meeting becomes performative.** When attending a standup is an evening obligation, people show up tired, half-prepared, and inclined to give a clean status that doesn't trigger questions. The signal-to-noise ratio collapses.

## What to replace it with

The dominant pattern that works for distributed teams is **async written standup with a sync-when-needed escalation path**. There are several specific formats; we've used or seen all of them.

### Format 1: Daily threaded status post

Each engineer posts a short status update in a dedicated channel (#standup, #daily-status, etc.) at the start of their working day. Format:

> **Working on**: [the specific PR / project / issue]
> **Blockers**: [anything stopping progress, with @mention if needed]
> **Around** (optional): [hours you'll be available today]

The thread is read asynchronously. The team lead (or anyone) can respond to specific blockers. Decisions surface as thread replies; the team norm is to read the channel daily.

This works well for teams of 5-15. Above 15, the channel becomes too noisy.

### Format 2: Weekly written summary + ad-hoc Slack

Each engineer posts a weekly summary (Friday or Monday) in a structured format:

> **Last week**: 3-5 bullets of completed work
> **This week**: 3-5 bullets of planned work
> **Blockers**: anything that needs cross-team attention
> **Cross-team requests**: anything you need from another team

Daily friction is handled in Slack DMs and team channels as needed. The weekly summary creates the alignment without the daily ritual.

This is our favored format for most distributed teams. The cadence is sustainable, the signal is high, and the writing forces engineers to think about their own work in a structured way.

### Format 3: Project-anchored updates

Status updates are attached to the work itself — Linear/Jira tickets, GitHub PRs, project docs — rather than to a separate standup channel. The team norm is "leave a status comment on your assigned tickets at least every 24 hours."

This works well for teams with very visible ticket flows (e.g., Kanban-disciplined teams). It fails for teams whose work doesn't decompose neatly into tickets (research, exploratory engineering, design work).

### Format 4: One sync standup per week, async on other days

A 25-minute synchronous "all hands" once per week, rotating times so no single region always loses sleep. Daily updates remain async. The sync meeting handles the things that genuinely benefit from real-time discussion — interpersonal dynamics, complex blockers, planning conversations.

Most large distributed orgs (50+ people) settle into this pattern. Smaller teams often skip the sync entirely.

## What to actually drop

If you switch from daily sync standup to one of the formats above, **drop the standup entirely**. Don't keep it "for the people who want it." The whole point of the change is that the synchronous daily standup wasn't earning its cost.

The exception: if your team has a culture of in-office daily standups for the co-located portion (e.g., 4 engineers in one office plus 2 remote), keep the in-office one and add async for remote. But don't pretend the remote folks are "joining" — that almost always means they're being pulled into a meeting that wasn't designed for them.

## Specific scripts that help

For Format 1 (daily threaded), this prompt template works:

> 🌅 [name] | [region]
> **Working on**: ...
> **Blockers**: ...

For Format 2 (weekly summary), this template helps signal what's expected:

> ## Last week
> - shipped feature X
> - debugged Y issue
> - paired with Z on architecture
>
> ## This week
> - finish W
> - start V
>
> ## Blockers
> - waiting on @alex for design review
>
> ## Cross-team
> - need security team to review my IAM change by Friday

Notice how specific the bullets are. "Worked on the dashboard" is bad. "Shipped the new filter UI on the customer dashboard, plus 3 small bugfixes" is good. The structure forces specificity.

## Common failure modes

**Async standup becomes a wall of unread messages.** Symptom: the channel has 50 unread, no one reads, and useful information gets buried. Fix: enforce a strict format and a hard cap on length. Some teams use a bot that auto-rejects updates over 200 words.

**Engineers stop posting.** Symptom: the channel goes quiet, the team lead notices a week later. Fix: make posting visible (a weekly digest of who's posted and who hasn't), and treat the absence as a signal worth following up on (likely the engineer is overloaded, blocked, or disengaged).

**The async update becomes the *only* communication.** Symptom: everything happens in the channel, nuance is lost, conflict festers. Fix: maintain at least one regular interpersonal touchpoint — a weekly 1:1, a monthly all-hands, or just a recurring opt-in coffee chat.

## Why this matters

The daily standup is one of the most inertial rituals in tech. Companies do it because they always have, and switching to something else requires real effort. But the cost of running a broken ritual every day for years is enormous: dozens of hours per engineer per quarter, plus the emotional cost of attending a meeting designed for someone else's working hours.

The formats above aren't dramatically more efficient on day one. The real wins compound over months: better written communication discipline, clearer tracking of what actually got done, less friction for cross-region work, and engineers who feel respected by the system rather than ground down by it.

If your distributed team still does a daily synchronous standup that crosses time zones, the highest-leverage change you can make this quarter is to stop.`,
  },
  {
    slug: "remote-work-timezone-cheat-sheet",
    title: "Remote Work Timezone Cheat Sheet",
    description:
      "A concise reference for the timezone facts that distributed teams use weekly — abbreviations, hubs, DST schedules, and the offsets you'll quote most often in calendar invites.",
    publishedAt: "2026-05-02",
    readingMinutes: 7,
    body: `This is a single-page reference for the timezone facts you'll quote most often when scheduling meetings, writing calendar invites, or onboarding a new teammate. Bookmark it.

## Major hubs at a glance

These are the cities most commonly anchoring distributed-team schedules:

**Americas**
- New York (Eastern) — UTC-5 standard, UTC-4 in DST
- Toronto — same as New York
- Chicago/Austin (Central) — UTC-6 standard, UTC-5 in DST
- Denver (Mountain) — UTC-7 standard, UTC-6 in DST
- San Francisco/Los Angeles/Vancouver (Pacific) — UTC-8 standard, UTC-7 in DST
- Mexico City — UTC-6, no DST since 2022
- São Paulo / Rio — UTC-3, no DST since 2019
- Buenos Aires — UTC-3, no DST
- Bogotá / Medellín / Lima — UTC-5, no DST
- Santiago — UTC-4 standard, UTC-3 in DST (Southern Hemisphere)

**Europe**
- London / Dublin / Lisbon — UTC+0 (GMT/WET) standard, UTC+1 (BST/WEST) in DST
- Paris / Berlin / Madrid / Amsterdam (CET) — UTC+1 standard, UTC+2 (CEST) in DST
- Stockholm / Warsaw / Prague / Copenhagen — same as Paris
- Helsinki / Athens / Bucharest (EET) — UTC+2 standard, UTC+3 (EEST) in DST
- Istanbul — UTC+3, no DST since 2016
- Tbilisi — UTC+4, no DST

**Middle East / Africa**
- Dubai — UTC+4, no DST
- Tel Aviv — UTC+2 standard, UTC+3 in DST
- Cairo — UTC+2 standard, UTC+3 in DST (restored 2023)
- Lagos — UTC+1, no DST
- Cape Town / Johannesburg — UTC+2, no DST
- Nairobi — UTC+3, no DST

**Asia / Pacific**
- Mumbai / Bengaluru — UTC+5:30, no DST
- Bangkok / Ho Chi Minh — UTC+7, no DST
- Beijing / Hong Kong / Singapore / Kuala Lumpur / Taipei — UTC+8, no DST
- Shanghai / Bali — UTC+8, no DST
- Tokyo / Seoul — UTC+9, no DST
- Sydney / Melbourne — UTC+10 standard, UTC+11 in DST (Southern Hemisphere)
- Auckland — UTC+12 standard, UTC+13 in DST (Southern Hemisphere)

## Common abbreviations and what they actually mean

These are the abbreviations you'll see in meeting invites, ranked by how often they're misused.

| Abbreviation | Means | Common confusion |
|--------------|-------|------------------|
| EST | Eastern Standard Time, UTC-5 | Often mis-used to mean EDT (UTC-4) during US summer |
| EDT | Eastern Daylight Time, UTC-4 | Same — most US East Coast people say "EST" year round |
| PST/PDT | Pacific Standard/Daylight Time, UTC-8/-7 | Same pattern as Eastern |
| CST | Could mean US Central (UTC-6) **or** China Standard (UTC+8) — disambiguate always |
| GMT | Greenwich Mean Time, UTC+0 | Often confused with British Summer Time (BST, UTC+1) |
| BST | British Summer Time, UTC+1 | Some use it to mean Bangladesh Standard Time (UTC+6) |
| CET/CEST | Central European Time / Summer Time | Generally clear, but watch for the DST switch |
| IST | Could mean India Standard (UTC+5:30), Israel Standard (UTC+2), or Irish Standard (UTC+1) — ambiguous |
| JST | Japan Standard, UTC+9 | Clear |
| AEST/AEDT | Australian Eastern Standard/Daylight, UTC+10/+11 | Watch for southern-hemisphere DST direction |
| UTC | Coordinated Universal Time, the baseline | Doesn't shift; use this in cross-zone communications |

**Rule of thumb**: in writing, prefer either UTC or the IANA identifier (e.g., "America/New_York", "Europe/London"). Abbreviations are how people get into trouble.

## Pre-set DST transition dates

For each year, these are the specific days the major DST observers shift their clocks. Verify with an authoritative source for your specific year (legislation occasionally changes these).

| Region | Forward (spring) | Back (autumn) |
|--------|------------------|---------------|
| US/Canada | 2nd Sunday of March | 1st Sunday of November |
| EU/UK | Last Sunday of March | Last Sunday of October |
| Australia (AEST states) | 1st Sunday of October | 1st Sunday of April |
| New Zealand | Last Sunday of September | 1st Sunday of April |

The two-week windows around these dates are when meeting invites most commonly go wrong, because some regions have shifted and others haven't.

## Common time difference quick lookup

For distributed teams, these are the time differences you'll quote most often:

- New York ↔ London: 5 hours (4 in March/Oct overlap window)
- New York ↔ Tokyo: 13-14 hours (varies with US DST)
- New York ↔ San Francisco: 3 hours
- London ↔ Singapore: 7-8 hours (varies with UK DST)
- London ↔ Tokyo: 8-9 hours
- San Francisco ↔ Tokyo: 16-17 hours (essentially night/day)
- Singapore ↔ Sydney: 2-3 hours (varies with AU DST)
- Berlin ↔ New York: 6 hours
- Lisbon ↔ New York: 5 hours (same as London)

For exact, current values, use a calculator that respects IANA data — don't try to mentally compute, especially during DST transition windows.

## "Reasonable hours" by region

A rough sense of when each region is in normal working hours:

| Region | Working hours (local) | UTC equivalent (winter) |
|--------|----------------------|-------------------------|
| US Pacific | 09:00-18:00 | 17:00-02:00 UTC |
| US Eastern | 09:00-18:00 | 14:00-23:00 UTC |
| UK/Lisbon | 09:00-18:00 | 09:00-18:00 UTC |
| Central Europe | 09:00-18:00 | 08:00-17:00 UTC |
| India | 09:00-18:00 | 03:30-12:30 UTC |
| Singapore/HK | 09:00-18:00 | 01:00-10:00 UTC |
| Tokyo | 09:00-18:00 | 00:00-09:00 UTC |
| Sydney | 09:00-18:00 | 23:00-08:00 UTC |

To find natural overlap windows, look for UTC times that fall within everyone's working hours. For most US-Europe-Asia teams, that intersection is 0-2 hours per day.

## Country quirks

A handful of countries do unusual things with time:

- **India / Sri Lanka / Iran / Afghanistan**: half-hour offsets (UTC+5:30, +5:30, +3:30, +4:30)
- **Nepal**: UTC+5:45 (a 45-minute offset)
- **China**: a single timezone (UTC+8) for the entire country, despite spanning ~5 geographic zones
- **Australia**: states differ; only NSW, VIC, ACT, TAS, SA observe DST. Queensland, NT, WA do not.
- **Brazil**: abolished DST in 2019 nationwide
- **Russia**: abolished DST in 2014 nationwide
- **Iceland**: UTC+0 year-round, no DST
- **Saskatchewan (Canada)**: most of the province is on Central Standard Time year-round, no DST

When in doubt, look up the IANA timezone identifier for the location, not the country name.

## When you don't trust your tool

If you ever see a meeting time in your calendar tool that doesn't match what you expect, **don't try to "fix" it manually**. Calendar tools usually do timezone math correctly; users adjusting times by hand usually break it. Instead, click into the meeting details and check what timezone it's anchored to. If the anchor is wrong, fix the anchor — not the displayed time.

This is a one-page reference. For deeper material, see our [DST guide](/blog/dst-guide-for-remote-workers/) and [scheduling best practices](/blog/scheduling-meetings-across-time-zones/).`,
  },
  {
    slug: "timezone-guilt-distributed-teams",
    title: "How to Handle \"Timezone Guilt\" in Distributed Teams",
    description:
      "The unspoken emotional tax of working across time zones — and concrete practices that reduce the guilt without falling into the trap of being available 24/7.",
    publishedAt: "2026-04-30",
    readingMinutes: 8,
    body: `If you've worked on a distributed team for more than six months, you've felt timezone guilt. It's the small but persistent feeling that:

- Other teammates are working while you're not
- You're holding things up by being asleep
- You should answer that Slack message before bed
- You should join the meeting at 6 AM "to be a team player"
- You owe it to your colleagues to flex your hours one more time

Compounded over months, this is exhausting and corrosive. It's also one of the most under-discussed challenges in remote work. This post is about what it actually is, why it happens, and concrete practices that reduce it.

## The shape of timezone guilt

Most teammates don't articulate timezone guilt directly. It shows up as:

- Engineers in non-headquarters time zones quietly working evenings to "stay in the loop"
- Engineers in headquarters time zones feeling weird about getting answers from someone whose 2 AM it is
- Junior team members agreeing to sync meetings at painful hours rather than asking to reschedule
- Engineers checking Slack at midnight "just in case"
- A team norm where the person who doesn't flex their hours feels selfish

None of this is healthy. None of it is necessary. It comes from a few specific dynamics that can be addressed.

## Where it comes from

**Asymmetric power dynamics.** Headquarters tends to make decisions; remote regions tend to execute. People in execution roles often feel they need to compensate by being more available.

**Unclear async expectations.** When the team hasn't defined what "async-by-default" actually means in practice, every message defaults to "this might need an answer right now." Recipients feel obligated to check.

**Visibility bias.** People assume the work they don't see (the work happening while they sleep) is somehow more important than the work they do see. Both directions contribute: HQ feels guilty their remote teammates "had to" work late; remote feels guilty they were asleep when something happened.

**Lack of explicit rotation.** When meeting times are always the same (always 9 AM HQ), the cost is always borne by the same people. Over months, those people build resentment, then guilt about feeling resentful.

**A leadership culture that rewards visible availability.** When promotions and recognition flow to people who "always answer fast," everyone learns to perform availability. This creates a treadmill nobody can step off.

## Practices that reduce it

### 1. Make working hours explicitly visible

Every team member's working hours should be displayed somewhere everyone can see — in their Slack profile, in a team wiki, in a shared timezone tool. Not as a polite suggestion, but as a hard data point: "I am available between these hours; outside these hours, I am off."

When working hours are visible, sending a message outside someone's hours feels different. The sender knows the recipient won't see it for hours. The recipient knows it's not expected to be answered immediately.

### 2. Default to written, never time-pressured

If something genuinely requires a synchronous response, name that explicitly: "blocking — need answer in next 4 hours." Otherwise, default to "respond when you're next online."

This sounds obvious, but it isn't culturally enforced in most teams. A simple norm helps: "if your message doesn't say it's urgent, it isn't."

### 3. Rotate the cost of cross-timezone meetings

For any unavoidable cross-timezone sync, rotate the meeting time so different regions take the painful slot in different weeks. Document the rotation publicly so everyone can see it's fair.

When the cost is rotated and visible, people stop resenting the always-painful slot.

### 4. Set a "no Slack after hours" team norm — and enforce it on management

The single most effective intervention is for managers to **stop** sending Slack messages outside their teammates' working hours. If management does it, the team will too, regardless of what the policy says.

If a manager genuinely needs to message late, they should write: "no rush, please respond tomorrow." Repeatedly. So the team internalizes that the late-night message is *not* a request for late-night response.

### 5. Respect "do not disturb" status

Slack and most other tools have a DND status. Encourage team members to set it for sleep/family/exercise hours. Do not message during DND unless it's an emergency.

When the team norm is "DND means do not disturb," DND becomes a real boundary. When the norm is "DND is decorative," DND is meaningless.

### 6. Detach urgency from visibility

A common dynamic: someone in HQ messages a remote teammate at 10 PM HQ time about something non-urgent. The remote teammate, who is in their morning, sees it and replies instantly. HQ now perceives "remote teammate is super responsive" — and learns to message them more often, including at inconvenient times.

The unconscious incentive structure rewards the wrong behavior. The fix: if you're replying outside your normal hours, **say so**. "Replying from my evening — won't be checking again until tomorrow morning your time." This recalibrates the sender's mental model.

### 7. Track who's flexing, not just what's getting done

When reviewing team performance, explicitly track how many hours each person has flexed outside their working hours in the last quarter. If the same people are always flexing, address it as a systemic problem — not as their personal "team player" virtue.

This requires managers to actually look at the data and act on it. Most don't. Those who do build dramatically more sustainable teams.

### 8. Normalize saying no

Make it explicitly acceptable for any team member to decline a meeting request that falls outside their working hours. Not "in theory acceptable" — actually OK, with no political cost.

The way to enforce this is for managers and senior team members to model it. When a senior engineer replies "that time doesn't work for me, can we shift?" without apology, junior team members learn it's safe to do the same.

## What doesn't help

- **"Asynchronous-first" branding without enforcement.** Lots of companies say they're async-first while running culture-of-visibility behaviors. The branding makes the guilt worse, because team members feel like they shouldn't be feeling the way they do.
- **Generic guidelines about "respect each other's time."** Without specific norms (DND respected, working hours visible, urgent vs non-urgent labels), the guideline is just words.
- **Wellness perks.** Free meditation apps don't fix structural problems. The problem isn't engineer mental health; it's team operational design.
- **Telling people to "just disconnect."** They can't, because the team incentive structure punishes disconnection. Fix the incentives first.

## The conversation to have

If you suspect timezone guilt is a problem on your team — and on most distributed teams, it is — start by asking, in a 1:1, a question like: "Have you been working outside your normal hours to keep up? Genuine question, no judgment."

Most people will say yes. Listen for the patterns: which meetings, which messages, which dynamics. The fixes are then specific to those patterns.

The bigger goal is to make distributed work sustainable for the long term. Teams where everyone is quietly burning extra evenings are not in a stable equilibrium. They eventually lose people, or worse, lose the ones who don't quit but stop caring.

A team that takes timezone guilt seriously and structures around it produces better work, retains people longer, and reports higher satisfaction. That's not a soft outcome. It's the operational difference between a remote team that thrives and one that grinds itself down.`,
  },
  {
    slug: "manage-distributed-team",
    title: "How to Manage a Globally Distributed Team",
    description:
      "Concrete management practices for leaders running teams across continents — what's different from managing co-located teams, what to invest in, and the failure modes to watch for.",
    publishedAt: "2026-04-28",
    readingMinutes: 11,
    body: `Managing a globally distributed team is a meaningfully different job from managing a co-located one. Most of the management advice that exists was written for in-office teams; applying it directly to distributed teams produces predictable failures. This post is about what's actually different and how to adapt.

This isn't a "remote work tips" piece. It's specifically about teams whose members are in three or more time zones and rarely (or never) meet in person.

## What's structurally different

**1. You see your team less.** In an office, you naturally see 30-50 small interactions per day with each direct report. Remotely, you see maybe 5 — and most of those are mediated by text. The information you get about how your team is doing is dramatically reduced.

**2. Your team sees each other less.** Same effect for peer-to-peer relationships. The casual conversations that build trust and surface problems early don't happen as often.

**3. Decisions take longer.** Anything that requires multiple people's input across time zones takes at minimum a 24-hour cycle (one team's day for proposal, another's day for response, another's day for refinement). Coupling that with calendar lag, week-long decisions are common.

**4. Visibility is asymmetric.** You will see your timezone-aligned team members more. You will hear from them more. You will give them more context. Without active counterweight, this becomes a self-reinforcing privilege.

**5. Onboarding is slower.** Without the constant ambient absorption of office culture, new team members take 2-3x longer to understand how your team actually operates. The compensating investment is documentation and structured onboarding.

## What to invest in

### Documentation, not as a chore but as the primary medium

Co-located teams can run on tribal knowledge because the tribe is in the room. Distributed teams can't. Documentation is the substrate of team coordination, not an afterthought.

Specifically:

- A team handbook covering decision-making process, on-call rotation, code review norms, meeting cadence, communication channels, and escalation paths. New hires read this on day one and refer to it for months.
- Decision documents for every meaningful architectural or process decision. Decisions made in Slack die in Slack. Decisions made in docs are referenced six months later when someone asks "why did we do it this way?"
- Project briefs for any work expected to take more than a week. Written before kickoff, updated as work progresses.

This is high-leverage. A senior engineer can be more productive on a well-documented team than on a poorly-documented one even if the codebase is technically harder.

### Asynchronous communication discipline

Train your team explicitly on how to communicate async:

- Threads, not channel firehose. Long messages get summarized at the top.
- "TLDR / Context / Question / What I tried" structure for any technical question.
- Explicit urgency markers ("blocking" / "FYI" / "no rush").
- Voice and video for high-bandwidth communication, but recorded so others can catch up.

Most engineers are not good at written communication. Investing in it pays off in everything else.

### One reliable cross-team sync

For most distributed teams, exactly one synchronous all-team meeting per week is the right cadence. More than that is meeting fatigue; less than that and the team loses cohesion. Rotate the time so no single region always loses sleep.

Use the meeting for the things that actually benefit from real-time discussion: interpersonal dynamics, complex blockers, planning conversations, celebration. Don't use it for status (status is async).

### A coaching budget for written feedback

Invest in your senior engineers' writing skill. Specifically: their ability to give code review feedback that's actionable and respectful in writing.

Code review on a distributed team is the primary moment of mentorship. If your senior engineers write terse, ambiguous, or harsh review comments, junior engineers will stagnate or leave. Coaching this directly — including by reviewing your seniors' review comments and giving them feedback — has compounding returns.

## What to actively counterweight

### The headquarters effect

Teams default to a "headquarters" — the region where the most senior people live, or where the company was founded, or where leadership meets in person. Headquarters team members:

- Make most decisions
- Get more context about strategy
- Build stronger relationships with leadership
- Get promoted more often

This is rarely intentional. But unaddressed, it produces a "second-class regions" problem within 18-24 months.

To counterweight:

- Schedule decision-making meetings at times that *don't* favor HQ. Force HQ leaders to lose sleep occasionally.
- Make sure remote regions have their own senior leaders, not just senior individual contributors. Leadership requires presence.
- When promotions or recognition happen, audit the regional distribution. If 80% of senior engineers are in one region, you have a problem regardless of how you got there.

### Meeting bias

Synchronous meetings advantage the people who happen to be awake. The decisions, social bonds, and political capital created in those meetings flow disproportionately to those people. Counterweight by:

- Recording meetings (with consent) and posting summaries publicly.
- Making the agenda async-first: any decision item is proposed in writing 24 hours before the meeting, with a comment period for non-attendees.
- Treating "not attending" as fully equal to "attending." A team member who responds to the proposal in writing should have the same input weight as one who attended.

### Visibility bias

The team members you see and hear from most aren't necessarily the ones doing the most important work. The introverts, the deep-work types, the people whose work is hard to demonstrate in chat — they get under-counted on a distributed team unless you actively look for them.

Counterweight by structured 1:1s with everyone (not just the visible ones), by reviewing actual artifacts (code, docs, PRs), and by asking peers about each other.

## Specific failure modes to watch

**The "hub-and-spoke" pattern.** All conversations route through the manager because no peer relationships have formed. This makes the manager a bottleneck, prevents the team from self-organizing, and burns the manager out. Symptom: every decision is in your DMs. Fix: create explicit "no manager" channels and forums; refuse to be a routing node ("ask Sara directly").

**The "always-on senior."** One senior engineer becomes the de facto on-call/answer-everything resource because they're responsive. They burn out. Symptom: a single name appears in 50%+ of cross-region threads. Fix: rotate ownership explicitly; make it OK to say "I'm off, ask in channel."

**The over-documented team.** Documentation becomes performative — pages of detail no one reads. Symptom: meetings still happen because nobody trusts the docs. Fix: prune ruthlessly; mark docs as "current" with a date and require revalidation every quarter.

**Meeting creep.** Three sync meetings become five become eight. Symptom: engineers complaining they have no deep work time. Fix: zero-base your meeting calendar quarterly. Each recurring meeting must justify its existence.

**Promotion stagnation in remote regions.** Engineers in non-HQ regions stop getting promoted at the rate they should. Symptom: regional attrition is uneven. Fix: separate promotion calibration explicitly by region; require promotion committees to include cross-regional members.

## Onboarding new team members

Onboarding is one of the highest-leverage investments on a distributed team. A good distributed onboarding includes:

- A written 30-day plan with explicit week-by-week milestones
- An assigned onboarding buddy (not the manager) in a different region than the new hire, to build cross-regional relationships from day one
- Required readings (team handbook, decision logs, codebase tour docs) with a 1:1 to discuss
- One structured introduction call with each peer in the first month
- A 30-day, 60-day, 90-day check-in with the manager, with concrete questions about what's working and what isn't

If you're winging onboarding because "they'll figure it out," you'll lose new hires in the first 6 months. The cost of that loss is huge; the cost of structured onboarding is small.

## When to bring people together in person

Periodic in-person gatherings are valuable. They are not optional; teams that never meet in person have measurably lower trust and higher attrition.

A reasonable cadence:

- Once a year: full-team gathering of 4-5 days. Mostly social, with some structured planning.
- Twice a year for sub-teams: focused working sessions for projects that benefit from in-person collaboration.
- Quarterly for leadership: alignment, strategic planning, hard conversations.

Budget for this generously. The ROI is high; teams that try to skip it usually regret it.

## What to read elsewhere

Specific other writing on this topic that's worth your time:

- GitLab's public handbook — the most extensive published documentation of how a distributed company actually runs.
- Basecamp's "Shape Up" book and Rework — the operating manual for asynchronous engineering work.
- Buffer's transparency reports — how a distributed company handles compensation and remote-specific challenges.

## The takeaway

Managing a distributed team isn't co-located management with extra effort. It's a different job, requiring different investments and different attention. The teams that figure this out tend to be the highest-velocity teams in their industry. The teams that don't tend to slowly hollow out, with the most talented people leaving for opportunities where they feel less invisible.

The job is doable. It just requires acknowledging it's different and structuring around the difference.`,
  },
  {
    slug: "async-vs-sync-communication",
    title: "Async vs Sync Communication in Remote Teams",
    description:
      "When to use real-time communication, when to use written async, and the specific decision framework to decide between them — with examples of teams that get the balance wrong in both directions.",
    publishedAt: "2026-04-25",
    readingMinutes: 9,
    body: `"Async-first" is one of the most-quoted principles in remote work. It's also one of the most misunderstood. Teams that take it as dogma and refuse to ever do anything synchronous end up with worse outcomes than teams that embrace strategic synchrony. Teams that ignore it and run everything as a meeting end up with chronic burnout and zero deep work.

This post is about the specific decision framework for when to go async and when to go sync. We'll use concrete examples — actual recurring patterns from real teams — to make the choices clear.

## What "async" and "sync" actually mean

**Synchronous**: Two or more people communicate at the same time. Meetings, calls, real-time pair programming, Slack huddles, even a fast back-and-forth Slack thread.

**Asynchronous**: People communicate on their own schedules. Email, written docs, recorded video, code review comments, slow-moving Slack threads.

A useful sub-distinction within sync: "scheduled" (calendar invites) vs "ad-hoc" (someone pings you and expects a response now). Most async-first teams over-correct on scheduled meetings while still allowing ad-hoc sync interruptions, which is the worst of both worlds.

## When async wins

Async is the right default for:

**1. Decisions with multiple stakeholders**

A decision that affects three teams across time zones almost always benefits from being made async. Write the proposal, share it, give 48-72 hours for asynchronous comment, then the decision-maker decides. This produces:

- Better-considered input (people have time to think)
- A written record (decisions are findable later)
- Equal participation (people who weren't in the meeting still have voice)

The synchronous version of the same decision either includes everyone (impossible) or excludes important voices (political problems compound).

**2. Status updates**

Sync standups exist because the original co-located XP version was cheap. Async (in any form — written, channel-posted, Loom video) is dramatically more efficient for distributed teams. The sync version persists mostly out of inertia.

**3. Code review**

Code review is fundamentally async. Even synchronous pair programming results in code that gets reviewed asynchronously by additional reviewers later. Make this normal: PRs reviewed within 24 hours, comments addressed in writing, escalation to sync only if discussion goes 3+ rounds without resolution.

**4. Status communication to broader org**

Quarterly updates, project status, OKR progress — all of this should be written. Read by people on their own time, archived for later reference.

**5. Initial brainstorming on broad topics**

When the topic is wide open, async gives people time to think before responding. The first ideas in a sync brainstorm are usually the surface ideas; the deep ones come from people who needed time to process.

## When sync wins

Sync is the right choice (despite the cost) for:

**1. Anything emotionally charged**

Difficult feedback, conflict, performance discussions, relationship friction — these always go in person (video). Trying to handle them in writing produces misunderstanding, escalation, and lasting damage. The cost of one synchronous conversation is much lower than the cost of a Slack-thread fight that festers for weeks.

**2. Decisions where the whole picture isn't yet clear**

If the team genuinely doesn't yet know what the right decision is, and the path requires real-time exploration ("what if we tried X?"... "but that breaks Y"... "actually wait, could we Z?"), synchronous is much faster. Async exploration of unclear territory is slow because each round of "what if" takes a day to resolve.

**3. Onboarding**

New team members need real-time interaction in their first weeks. Async can feel cold and unfamiliar. Schedule sync time generously for the first 30 days, then taper down as they integrate.

**4. Building relationships**

Trust between teammates who've never met or talked is fragile. Schedule periodic 1:1s, team coffees, even informal hangouts. The cost is small per occurrence; the team-cohesion benefits compound.

**5. Time-critical decisions**

If a decision genuinely needs to happen within hours (incident response, customer escalation, market window), sync is the only option. Async cycles take 24+ hours minimum.

**6. Creative work that benefits from improvisation**

Some kinds of design and engineering work are dramatically better in real-time pairing. Two people staring at a problem together for an hour can move further than four async exchanges over a week.

## The decision framework

When deciding sync or async for a specific exchange, ask three questions:

**Q1: Does this require emotional or interpersonal nuance?**
- Yes → sync (video preferred)
- No → continue

**Q2: Is the path forward unclear, requiring real-time exploration?**
- Yes → sync
- No → continue

**Q3: Is there genuine time pressure (next 4-12 hours)?**
- Yes → sync (or marked-urgent async with explicit deadline)
- No → async

If all three are "no" — async. Don't schedule a meeting "to discuss X" if X can be written down and circulated.

## How sync-first teams break

Teams that default to sync develop predictable failure modes:

- **Calendar saturation**: engineers attend so many meetings they have no time to do work. Productivity collapses.
- **Decisions in meetings without records**: decisions made in real-time discussion are lost; six months later no one remembers why.
- **Excluded voices**: people who can't attend due to time zones simply aren't part of the decision process. Resentment builds.
- **Performative attendance**: people show up because the meeting is on their calendar, not because they have anything to contribute. Quality of discussion drops.
- **Burnout in non-HQ regions**: if all the meetings happen in HQ time, remote team members lose evenings or wake at 5 AM to attend.

If your team's calendar is full and your team's docs are sparse, you're a sync-first team — even if you say you're async. The fix isn't to add more meetings; it's to convert recurring meetings to async rituals one at a time and watch what happens.

## How async-first teams break

The opposite failure modes are real but less commonly diagnosed:

- **Decision paralysis**: every decision becomes a 5-day async cycle, even ones that don't need it. Velocity drops.
- **Lost emotional context**: written communication strips tone, leading to unnecessary conflict from misread messages.
- **Onboarding friction**: new hires feel isolated and disconnected, integration takes much longer.
- **Senior engineers become bottlenecks**: every decision routes to the one person who can keep all the context in their head; they can't escape.
- **Burnout from always being "on"**: paradoxically, async teams sometimes burn people out *more* because there's never a clean end to the workday — Slack always has an unread.

If your team has good documentation but rising attrition and complaints about isolation, you're over-indexed on async. Add scheduled relationship-building time and recurring sync rituals back in.

## What about the middle ground?

Many of the most effective distributed teams operate with the following baseline:

- **Async by default for status, decisions, code review, broad communication.**
- **One scheduled sync per week per team** for cohesion and high-bandwidth discussion.
- **Scheduled 1:1s** between manager and reports, weekly or biweekly.
- **Ad-hoc sync (calls/huddles) allowed but discouraged** unless meeting one of the criteria above.
- **Recorded video for cross-region async** when written explanation is insufficient. Loom and similar tools make this 5x easier than typing.

This balance — heavy async, structured sync where it earns its keep — produces the best velocity-and-sustainability combination we've seen.

## Examples that illustrate the framework

**Example 1**: A junior engineer is stuck on a thorny algorithm problem.

Async first attempt: post the problem in #engineering with what they've tried. If someone responds within an hour or two, async wins. If not, escalate to a 30-minute sync pair session.

**Example 2**: Two engineers disagree about the right architecture for a feature.

If the disagreement is mostly factual (one is missing context the other has), async resolves it quickly: write up your reasoning, the other writes their counter, you converge.

If the disagreement is genuinely about values or priorities (both understand the trade-offs and weight them differently), sync is faster: 30 minutes of video discussion typically converges or surfaces that you need a third party.

**Example 3**: A customer has reported a critical bug that's affecting production.

Sync immediately. Get on a call (or huddle) with whoever is on-call. Write up the timeline async after resolution.

**Example 4**: A teammate seems disengaged in their written updates.

Sync. Schedule a 1:1, video on. Don't try to handle this in writing — it'll go badly.

**Example 5**: The team is debating whether to adopt a new framework.

Async, with a deadline. Decision-maker writes a one-pager with the proposal. Team has 5 business days to comment. After 5 days, decision-maker decides based on what they've heard. No meeting needed.

## The meta-principle

Most teams over-rotate on one mode — usually sync, sometimes async. The right answer is fluency in both, with a default of async and clear criteria for when sync earns its place.

If you're in a team that's stuck on one extreme, the way out is to pick one specific recurring practice and try the other mode for a month. Convert one weekly sync meeting to a written ritual. Or convert one written status thread back to a 15-minute call. Watch what happens. Adjust.

Communication mode is a tool, not an identity.`,
  },
  {
    slug: "scheduling-meetings-across-time-zones",
    title: "Best Practices for Scheduling Meetings Across Time Zones",
    description:
      "A practical playbook for distributed teams: how to pick meeting times that don't burn out one side, handle DST transitions, and run effective meetings when half the room is asleep.",
    publishedAt: "2026-04-22",
    readingMinutes: 9,
    body: `Distributed teams almost always start with the wrong question: "what time works for everyone?" The honest answer, for any team spread across more than four time zones, is "no time works perfectly for everyone." A better question — the one your team can actually solve — is "how do we share the inconvenience fairly, and how do we make every minute of overlap count?"

This guide is the playbook we wish we had three years ago, when we were a Lisbon-Singapore-Toronto team trying to figure out why every Wednesday standup felt awful for someone.

## 1. Map your team's overlap before you book anything

The first move is mechanical: write down each teammate's normal working window in their local time, then convert all of them to UTC and see where the green bars overlap. Most teams discover one of three patterns:

- **Two clusters**: Americas + Europe, or Europe + Asia. Usually 2-4 hours of natural overlap.
- **Three clusters**: Americas + Europe + Asia. Often less than 90 minutes of true overlap, sometimes zero.
- **Stretched across one large region**: e.g. all of Asia from Tel Aviv to Sydney. 4-6 hours of overlap, but with painful endpoints.

Once you can see the overlap visually, it stops being abstract. You either have natural overlap (lucky — protect it) or you don't (and you need an explicit policy about who carries the cost).

## 2. Default to async, escalate to sync only when needed

For teams without natural overlap, every synchronous meeting is a tax. Tax someone fairly: rotate which side stays late, or pre-record updates so only the truly-needs-discussion items make it onto a sync call.

A useful test: after the meeting, ask "could the decision in this meeting have been made by reading a doc and leaving comments?" If the answer is yes more than three times in a row, kill the recurring meeting and replace it with an async ritual.

## 3. Pin recurring meetings to one timezone, not "the calendar"

When you create a recurring meeting in Google Calendar or Outlook, the tool pins it to one person's timezone by default. If that person is in a DST-observing country and the others aren't, the meeting will silently shift by an hour twice a year for everyone else.

The cleanest rule: pin the meeting to the timezone of the person whose mornings the meeting protects. They're the constant; everyone else absorbs the shift. This sounds backwards, but it's actually the policy that minimizes confusion — because the constant person's calendar never changes.

## 4. Be explicit about "core hours"

Distributed teams that try to keep everyone available all the time burn out fast. Pick a 2-4 hour window that all teammates agree to be reachable, even if it's not their normal working hours, and call those "core hours." Outside core hours, asynchronous expectations apply.

For a US-Europe team, core hours might be 14:00-16:00 UTC. For US-Asia, you might decide there are no core hours at all, and switch entirely to async.

## 5. Handle DST transitions explicitly, not silently

Twice a year, the US, Europe, Australia, and parts of South America change their clocks. The rest of the world doesn't. Two weeks every spring and fall, your team's overlap window will shift by an hour, and someone will miss a meeting because they trusted their calendar tool to figure it out.

Practical rule: in March and October/November, send a calendar-week note to the team that says "DST shift this Sunday — your usual 14:00 UTC standup is now 13:00 UTC for the Tokyo and Singapore folks. Confirm in #standup if your time has changed." It feels paranoid the first time. After you miss one meeting because two engineers thought their DST shifts had cancelled out (they hadn't), you'll do this every cycle.

## 6. Make the meeting time visible everywhere

Write meeting times in invitations and docs as "14:00 UTC (10:00 New York / 15:00 London / 22:00 Singapore)" — three formats minimum. The cost is 30 seconds of typing; the benefit is no one ever has to do timezone math at 7 in the morning.

## 7. Protect a "no-meeting" zone for everyone

Each teammate should have at least four hours per day that are guaranteed meeting-free. For most people this is the morning of their local day, when deep work is most productive. Distributed teams that don't enforce this end up with engineers who attend meetings from 7am to 10pm and never ship anything.

## 8. Use the right tool for the right scenario

- **Quick async check-in**: text-based, in your team chat. No tool needed.
- **Recurring weekly standup**: pre-recorded video update + threaded comments. 10 minutes async beats 30 minutes sync.
- **Decision-making meeting**: live, but make it 25 minutes by default and end on a written decision in the doc.
- **One-on-one**: live, weekly. The only meeting type that almost never benefits from being async.
- **All-hands**: live but recorded, with a written summary. Live for the people who can attend; the recording for those who can't.

## 9. Don't optimize for "everyone happy" — optimize for "no one suffering most"

The biggest mistake we see is teams trying to find a meeting time where every individual is happy. There almost never is one. The actual goal is to ensure no single teammate is consistently the loser — taking 6am or 10pm calls every time. Rotate who carries the cost.

## 10. Invest in good tooling before you need it

Even a simple multi-city timezone planner is dramatically better than mentally calculating offsets in a Slack DM. The 10 seconds it saves per meeting compounds: a team of 6 with 10 cross-timezone meetings per week saves an hour a month per person, and avoids the small but real chance of someone showing up at the wrong time and feeling like an idiot.

Distributed work is hard, but most of the pain comes from preventable friction. A well-designed meeting practice — with a clear async default, explicit core hours, fair rotation, and tools that everyone trusts — is the difference between a team that thrives across continents and one that grinds itself into the ground.`,
  },
  {
    slug: "dst-guide-for-remote-workers",
    title: "The Complete Guide to Daylight Saving Time for Remote Workers",
    description:
      "Why DST exists, who observes it, and the practical implications for distributed teams — including the specific weeks every year when scheduling becomes a minefield.",
    publishedAt: "2026-04-19",
    readingMinutes: 11,
    body: `Daylight saving time is the single most disruptive event in a distributed team's year, and the second-most underrated source of meeting confusion (the first is people writing "EST" when they mean any of three different things). This guide walks through what DST actually is, who observes it, and — most usefully — the specific dates you need to mark on your calendar to avoid scheduling chaos.

## What DST is, in one paragraph

Daylight saving time is the practice of advancing clocks by one hour during warmer months so that evenings have more daylight at the cost of mornings. Most countries that adopt it shift forward one hour in the spring and back one hour in the autumn. The exact dates differ by country and have changed multiple times within most observers' careers.

## Who observes DST

The simplest mental model: DST is observed by most of North America, Europe, parts of South America, Australia, New Zealand, and a handful of others. It is **not** observed by most of Asia, Africa, the Middle East, the equatorial regions, and a growing list of countries that have abolished it (Russia in 2014, Turkey in 2016, Brazil in 2019, several US states in legal limbo).

For a distributed team, the practical consequences are:

- **Two halves of the world shift; the other half doesn't.** This means your overlap window between, say, New York and Tokyo changes by an hour twice a year (NY shifts; Tokyo doesn't). Between New York and London, both shift, but on slightly different dates — meaning there's a one-week window each spring and fall when the offset between them is one hour off from the rest of the year.

- **Northern and Southern hemisphere DST run in opposite phases.** When New York springs forward in March, Sydney falls back in April. This makes US-Australia overlap windows shift by **two** hours over a few weeks each transition.

## The exact dates to know

Northern hemisphere DST observers (US, Canada, most of Europe) shift forward in spring and back in autumn. The dates differ slightly by region:

- **US and Canada**: forward on the second Sunday of March, back on the first Sunday of November.
- **EU and UK**: forward on the last Sunday of March, back on the last Sunday of October.
- **Mexico**: ended DST nationally in 2022 (only border regions still observe US DST).

This produces three weeks each year when the time gap between the US and Europe is one hour off from normal:

- **Mid-March**: US has shifted, EU hasn't. The normal 5h difference between New York and London becomes 4h for two weeks.
- **Late October to early November**: EU has shifted back, US hasn't. The normal 5h becomes 6h for one week.

If you book your weekly meeting "9:00 New York time, every Wednesday," the European side will see it shift by an hour in mid-March and again in early November. Most calendar tools handle this correctly if the meeting was created with a timezone, but humans often shift the actual meeting back to "fix" the shift, which then breaks the calendar tool. Don't manually adjust DST shifts unless you fully understand what your calendar tool is doing.

Southern hemisphere DST observers (Australia eastern states, New Zealand, Chile) shift on roughly the **opposite** schedule:

- **Australia eastern states**: forward on the first Sunday of October, back on the first Sunday of April.
- **New Zealand**: forward on the last Sunday of September, back on the first Sunday of April.
- **Chile**: forward in early September, back in early April (dates vary year to year).

## Common DST surprises that bite distributed teams

**1. The "fall back" overlap of doom**

When the US shifts back in early November, but Europe has already shifted back in late October, there's a 7-day window where the offset between New York and London is 6 hours instead of 5. We've seen multiple teams arrive at meetings an hour late or early during this window. The fix: announce the DST shift in your team chat the Friday before each transition.

**2. Recurring meetings created in the wrong timezone**

The single most common DST bug: a US-based engineer creates a recurring meeting "every Wednesday at 14:00." When the US shifts forward in March but their European teammate doesn't yet, the meeting silently moves to 13:00 for the European side. The European side shows up at 14:00 their time, an hour late.

To avoid this: when you create a recurring meeting, explicitly select the timezone of the person whose schedule should anchor the meeting. Most calendar tools default to "the timezone of the device creating the meeting," which is rarely what you want for a distributed team.

**3. Mexico, Russia, Turkey, Brazil, Iceland — DST has been ending**

Several countries have abolished DST in the last decade. If you have teammates or clients in any of these countries, what their offset is "supposed to be" probably isn't what it was when you last checked. As of 2026:

- **Mexico**: no DST nationally (ended 2022).
- **Russia**: no DST (ended 2014).
- **Turkey**: no DST, permanent UTC+3 (since 2016).
- **Brazil**: no DST (ended 2019).
- **Egypt**: DST restored in 2023 after a long break.
- **Iceland**: no DST.

When in doubt, look up the IANA timezone identifier for the country, not the abbreviation. The IANA database is updated when governments change DST policies.

**4. DST in Australia is regional**

Within Australia, only New South Wales, Victoria, ACT, Tasmania, and South Australia observe DST. Queensland, the Northern Territory, and Western Australia do not. So during southern summer, Brisbane and Sydney are an hour apart, despite both being on Australia's east coast.

## How to handle DST proactively

1. **Schedule a recurring 30-minute calendar reminder for "DST check"** the day before each US, EU, and Southern hemisphere transition. The reminder text should be "verify the time of all recurring cross-timezone meetings."

2. **Use canonical UTC times in meeting docs.** When you write a meeting agenda, include the UTC time alongside local times. UTC doesn't observe DST, so a UTC-anchored time is the only one that's invariant.

3. **Lean on tools, not memory.** Even experienced distributed-team operators get DST math wrong. A calendar tool with proper timezone support, plus a planner that visualizes overlap, is dramatically more reliable than mental calculation.

4. **For globally distributed all-hands**, pick a date during a stable period (avoid mid-March, late March, late October, early November). The two weeks before each DST transition are the worst time to schedule a one-off all-team event.

## Why DST will probably continue to confuse us

Several jurisdictions have proposed abolishing DST in recent years (the EU's 2019 vote, multiple US state bills), but the politics of "permanent standard time" vs "permanent daylight time" have stalled actual change in most places. For the foreseeable future, distributed teams will continue to deal with the twice-yearly offset shuffle. Your best defense is awareness and good tooling.

DST won't kill your distributed team. But three meetings missed in a row because of a botched DST handoff will erode trust faster than almost any other operational failure. Mark the dates. Run the check. Trust the tool.`,
  },
  {
    slug: "top-cities-for-digital-nomads-2026",
    title: "Top 10 Cities for Digital Nomads in 2026",
    description:
      "An honest, ranked list of the cities that actually deliver in 2026 — based on visa policy, internet, cost, community density, and how many functional coworking spaces are within walking distance of a decent coffee.",
    publishedAt: "2026-04-15",
    readingMinutes: 12,
    body: `Every "digital nomad cities" list since 2018 has been about 80% the same five cities. We're not going to pretend the world has shifted dramatically — Lisbon and Bali are still on the list. But four years of post-pandemic settling have separated the cities that genuinely work from those that just market well. This is our current ranking, weighted toward what actually matters: visa policy, internet reliability, cost-to-quality ratio, community density, and timezone alignment with your client base.

## How we ranked

We weighted five factors:

- **Visa policy**: does the country offer a digital nomad visa, or is the de-facto policy of "tourist visa runs" still tolerated?
- **Internet reliability**: average residential speeds and how often outages affect daily work.
- **Cost-to-quality**: monthly all-in cost (rent, food, transport, coworking) for a comfortable but not luxurious lifestyle.
- **Community density**: how many other remote workers you'll actually meet, and how active the meetup/coworking scene is.
- **Timezone alignment**: does the city's working hours overlap with your typical client zones?

Rankings are subjective. Pick the city that fits your stack of constraints, not ours.

## 1. Lisbon, Portugal

Lisbon has been the default European answer for nomads since 2017, and it's earned the position. The D8 digital nomad visa launched in 2022 and has stabilized: one-year residency renewable for a path to permanent residency, ~€3,000/month income requirement. Internet is excellent. Coworking spaces are dense — Heden, Second Home, Cowork Central, and a dozen smaller ones in Cais do Sodré and Marvila. Cost has gone up significantly since 2020 (around $2,800-3,500/month for a comfortable life now), but it's still cheaper than most of Western Europe.

The drawback: Lisbon's success has bred its own problem. The community is now so dominated by remote workers that local Portuguese culture is actively pushing back, and rent inflation has become a real political issue. Be a respectful resident.

**Best for**: nomads serving European or US East Coast clients (good overlap with both); first-time long-stay nomads; anyone wanting an EU residency on-ramp.

## 2. Bali (Canggu / Ubud), Indonesia

Bali invented the modern digital nomad scene around 2014 and remains its iconic location. Indonesia introduced a "second home visa" in 2022 (5-10 year stay) and a more accessible B211A visa, both workable for remote workers. The cost-to-quality ratio is still extraordinary: $1,500-2,500/month for a private villa, scooter, and full coworking access in Canggu.

What's changed: Canggu has become traffic-choked and party-tourism-saturated. Ubud has reclaimed its place as the substantive nomad hub. Internet is good in coworking spaces, mediocre in older villas — verify before signing a lease.

**Best for**: nomads serving APAC clients; remote workers prioritizing low cost and tropical climate; anyone willing to commute on a scooter.

## 3. Mexico City, Mexico

Mexico City has been the runaway gainer of the post-2020 nomad migration, especially among US remote workers. The combination of CDT (matching US Central business hours), a tax treaty with the US, an established coworking scene in Roma Norte and Condesa, and an actual major-city cultural offering has made it the answer for nomads who want urban life rather than beach life.

The drawback: rent inflation has been brutal in nomad-popular neighborhoods, and the Mexican government has been increasingly vocal about gentrification concerns. Cost is now $2,000-3,000/month in the desirable areas — no longer the steal it was in 2021.

**Best for**: nomads serving US clients (perfect timezone overlap); city people who don't want a small-town nomad scene; anyone who can adjust to the altitude (2,250m).

## 4. Chiang Mai, Thailand

The original Asian nomad capital still works, especially for nomads on tighter budgets. Thailand's DTV (Destination Thailand Visa, launched 2024) gives 5-year residency for remote workers with relatively low income requirements. Internet is reliable, the coworking scene at Punspace and CAMP is mature, and cost remains under $1,500/month for a comfortable life.

The drawback: smoke season (March-April) is rough, sometimes unbearable for sensitive lungs. The community is also smaller than it was pre-pandemic, as many regulars relocated to Bangkok or Bali during border closures.

**Best for**: nomads serving APAC clients; budget-conscious remote workers; long-term nomads (the DTV is generous).

## 5. Medellín, Colombia

Medellín had a breakout 2022-2024 as US-based remote workers discovered it. The city has good infrastructure, year-round mild weather (the "city of eternal spring" is real), and a remote-worker visa. Cost is reasonable at $2,000-2,800/month. The Poblado and Laureles neighborhoods are now nomad-dense.

The drawback: Medellín has been the highest-controversy entry on these lists for the last two years. The combination of rapid nomad influx, rent inflation, and concerns about exploitation (especially around the city's complicated history with foreign visitors) means the local conversation about nomads is fraught. Be a respectful, integrated resident or skip it.

**Best for**: US-based remote workers (Eastern Time alignment); Spanish learners; nomads who want Latin urban life.

## 6. Tbilisi, Georgia

Georgia offers the most generous tourist policy on this list: one year of visa-free stay for citizens of 90+ countries, no questions asked. Combine that with a low cost of living ($1,500-2,000/month), reasonable internet, a developing coworking scene, and an emerging tech industry, and Tbilisi has become a quiet favorite among nomads in the know.

Caveats: the political situation is more uncertain than it was in 2022; banking and crypto access has tightened in 2024-2025. Visit before committing, and verify the current situation when you go.

**Best for**: nomads who hate visa paperwork; anyone serving European clients; nomads with a higher tolerance for off-the-beaten-path logistics.

## 7. Cape Town, South Africa

Cape Town has a digital nomad visa as of 2024, and the city is the most established remote-work destination in Africa. The infrastructure is excellent (by African standards and by many global standards), the lifestyle is hard to beat (mountains, beaches, world-class food), and it offers a timezone (UTC+2) that overlaps well with both Europe and Asia.

The drawback: load-shedding (scheduled rolling power outages) is the elephant in every Cape Town conversation. Most coworking spaces have generators or battery backups, and most decent residences do too — but verify, because it's a productivity killer if your setup doesn't.

**Best for**: nomads serving European or Asian clients; outdoor lifestyle people; anyone willing to invest in a good battery backup.

## 8. Buenos Aires, Argentina

Buenos Aires's combination of European urban culture, very low cost (especially with the parallel exchange rate), and a unique creative scene has kept it on the list despite chronic political-economic instability. As of 2026, Argentina has a remote-worker visa, and the cost of a comfortable life can be as low as $1,200/month — though banking is genuinely complicated.

The drawback: inflation, currency controls, and political uncertainty add real friction. Many nomads end up running USD-denominated lives via Western Union or crypto. The city itself is wonderful; the financial logistics are a permanent low-grade headache.

**Best for**: Spanish speakers; nomads with high cultural appetite; budget-prioritized remote workers willing to handle Argentine banking.

## 9. Taipei, Taiwan

Taiwan's Gold Card visa (which combines work, residence, and re-entry permit for "highly skilled" foreigners — a category that's relatively permissive) has made Taipei a quiet rising star. Internet is among the best in the world, the food scene is genuinely world-class, the city is safe and clean, and the cost-to-quality ratio is excellent at $2,200-3,000/month.

The drawback: most international remote workers underrate Taiwan, so the nomad community is smaller than in Bali or Lisbon. Geopolitical risk (China-Taiwan tensions) is also a real factor for risk-conscious nomads.

**Best for**: nomads serving APAC clients; food-driven travelers; remote workers in tech who can qualify for the Gold Card.

## 10. Dubai, UAE

Dubai's Virtual Working Programme (the official name of its digital nomad visa) has been operational since 2021. Tax-free, excellent infrastructure, a major airline hub, and a timezone (UTC+4) that bridges European morning and APAC evening hours. Cost is high — $4,000-6,000/month for a comfortable life — but the package of legal stability, infrastructure, and global connectivity is unique.

The drawback: cost. And, depending on your values, the legal and cultural environment may not be a fit. Read the visa terms and the local laws carefully before committing.

**Best for**: high-earning remote workers serving global clients; nomads who fly frequently; anyone who values infrastructure and legal stability above cost.

## Honorable mentions

- **Barcelona** — would rank top 5 if rent prices weren't accelerating faster than salaries.
- **Bangkok** — better than Chiang Mai for nightlife and city density, worse for community focus.
- **Ho Chi Minh City** — cheap, lively, but visa logistics are still cumbersome for long stays.
- **Tallinn** — Estonia's e-residency program is a flex; the climate is the trade-off.

## What to actually do

If this is your first long-stay nomad city: pick from positions 1-5. They're proven, the community will be there to catch you, and the visa logistics are clearer.

If you've done this before and want a city that fits a specific constraint (cost, no-visa, timezone) more sharply: positions 6-10 will reward you.

Either way, visit before committing to anything longer than three months. Nomad-popular cities are hyped because the wins are real, but every city has its quirks that don't show up in blog posts.`,
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
