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
    slug: "scheduling-meetings-across-time-zones",
    title: "Best Practices for Scheduling Meetings Across Time Zones",
    description:
      "A practical playbook for distributed teams: how to pick meeting times that don't burn out one side, handle DST transitions, and run effective meetings when half the room is asleep.",
    publishedAt: "2026-05-04",
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
    publishedAt: "2026-04-26",
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
    publishedAt: "2026-04-18",
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
