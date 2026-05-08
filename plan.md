# 设计文档：Remote Team Timezone Planner（Programmatic SEO + AdSense）

> **方向冻结声明**：自本文档 v2.0（2026-05-08）起，接下来 **6 个月内不再换赛道**。流量慢、过审挫败、版本改动都不构成重选赛道的理由。
>
> **最终方向**：面向远程团队 / 数字游牧的时区会议规划站
> **编写日期**：2026-05-08（v2.0，替换 v1.0 工具站版本）
> **配套文档**：`google-monetization-overview.md`

---

## 目录

1. [产品定位（最终版）](#1-产品定位最终版)
2. [差异化护城河：怎么打赢在位者](#2-差异化护城河怎么打赢在位者)
3. [产品形态与核心功能](#3-产品形态与核心功能)
4. [数据模型](#4-数据模型)
5. [首批 50 座城市（已选定）](#5-首批-50-座城市已选定)
6. [信息架构 & URL 结构](#6-信息架构--url-结构)
7. [页面模板设计（避开薄内容）](#7-页面模板设计避开薄内容)
8. [技术栈](#8-技术栈)
9. [SEO 策略](#9-seo-策略)
10. [AdSense 过审注意事项](#10-adsense-过审注意事项programmatic-站特别版)
11. [变现组合（AdSense + 联盟）](#11-变现组合adsense--联盟)
12. [6-8 周路线图](#12-6-8-周路线图到-adsense-申请)
13. [收益预期 & 放弃条件](#13-收益预期--放弃条件)
14. [风险与应对](#14-风险与应对)
15. [第一周行动清单](#15-第一周行动清单)

---

## 1. 产品定位（最终版）

| 项 | 内容 |
|----|------|
| **一句话定位** | Modern timezone & meeting planner for remote teams and digital nomads |
| **目标用户** | 远程工作者、跨国团队、数字游牧、自由职业者、外包/Agency |
| **核心价值** | 比 timeanddate 现代、比 worldtimebuddy 好看、比 savvytime 好用 + 专门为远程协作场景做的工作流 |
| **变现** | AdSense（主）+ Notion/Linear/Calendly 联盟（次） |
| **首批规模** | 50 座城市 = 约 2,500 页 |
| **目标** | 第 6 周申请 AdSense，第 12 月月收益 $150-500 |

### 明确的非目标
- ❌ 不打通用转换器红海（天地日对不过 timeanddate）
- ❌ 不做中文版（English-first）
- ❌ 不做注册 / 登录 / 用户系统（纯静态 + 本地存储足够）
- ❌ 不自建时区数据（直接用 IANA 数据库 + luxon 库）

---

## 2. 差异化护城河：怎么打赢在位者

### 在位者弱点地图

| 站点 | 优势 | 弱点（你的机会）|
|-----|------|---------------|
| **timeanddate.com** | 权威、全量、20 年历史 | UI 老旧、移动端差、广告挤、无"远程团队"工作流 |
| **savvytime.com** | 页面简洁、速度快 | 设计一般、无会议导出、无多城市联动 |
| **worldtimebuddy.com** | 多城市滑块经典 | 界面 2015 年停更感、PC-only、无 .ics |
| **everytimezone.com** | 视觉漂亮 | 纯工具无 SEO 长尾页 |

### 你的四个护城河

1. **Mobile-first UX** — 主力竞品都 desktop-first，而你目标用户 50%+ 移动访问
2. **场景化命名（不是 convert，是 meet）** — URL `/meet/new-york-and-tokyo` 比 `/convert/...` 更匹配"安排会议"意图
3. **Schedule Action 工作流** — 每个城市对页都有"Add to Calendar（.ics 下载）"按钮
4. **Shareable meeting link** — `/meeting/abc123?cities=ny,tokyo,bali&time=9am_UTC` 生成可分享链接（纯前端 + URL 参数）

这四个加起来**不打败 timeanddate 的 10% 流量份额，但能抢走 2-5%**，已经够你活得很好。

### 目标关键词（长尾为主，避开头部词）

**打得赢的长尾**（每月 500-5000 搜索，Top 10 质量平庸）：
- "best time for meeting between [city] and [city]"
- "schedule a call between [city] and [city]"
- "meeting time for [city] and [city]"
- "how to schedule meetings across time zones"
- "remote team meeting planner"
- "best meeting time for [country] and [country]"

**不打的头部词**（每月 10k+ 但 timeanddate 盘踞 Top 3）：
- ❌ "[time] [city] to [city]"（纯转换）
- ❌ "time zone converter"
- ❌ "[city] time"

---

## 3. 产品形态与核心功能

### 3.1 首页

```
┌──────────────────────────────────────┐
│ [Logo]                 [GitHub] [?]  │
├──────────────────────────────────────┤
│ Hero: Modern Meeting Planner         │
│   for Remote Teams                   │
│                                      │
│  [+ Add city] [+ Add city] [+ ...]   │
│                                      │
│  ┌──────── Multi-city timeline ────┐ │
│  │ New York  ══════▓▓▓▓▓▓═══════   │ │
│  │ London    ═════════▓▓▓▓▓▓▓════  │ │
│  │ Tokyo     ▓▓▓▓══════════▓▓▓▓    │ │
│  │           ↑ overlap: 2h 30m     │ │
│  └─────────────────────────────────┘ │
│                                      │
│  [Schedule this meeting] [Share]     │
├──────────────────────────────────────┤
│ Popular City Pairs（SEO 内链）       │
├──────────────────────────────────────┤
│ Remote Work Timezone Guide（博客）   │
└──────────────────────────────────────┘
```

### 3.2 核心页面类型

| 页面类型 | URL 模式 | 页数量 | 用途 |
|---------|---------|-------|------|
| 首页 | `/` | 1 | 交互工具 + SEO 枢纽 |
| **城市对页**（主力 SEO）| `/meet/[city-a]-and-[city-b]` | **~2,450** | programmatic 核心 |
| 单城市页 | `/city/[city]` | 50 | 单城市信息 + 热门配对 |
| 会议规划页（交互）| `/planner` | 1 | 多城市滑块工具 |
| 时区信息页 | `/timezone/[tz]` | ~30 | "What is PST / EST / GMT" |
| 可分享会议链接 | `/meeting/[hash]` | 动态 | URL 编码，不占 SEO |
| 博客 | `/blog/[slug]` | 10-15 | AdSense 需要的内容密度 |
| 关于/隐私/条款/联系 | — | 4 | AdSense 合规 |

**总可索引页**：50 + 1 + 1 + 30 + 2450 + 10 + 4 = **约 2,546 页**

### 3.3 "杀手级"功能优先级

按实现难度 × 价值排序：

| # | 功能 | 难度 | 价值 | 何时实现 |
|---|------|-----|------|---------|
| 1 | 多城市 timeline 滑块 | ⭐⭐ | ★★★★★ | Week 2 |
| 2 | 城市对 SSG 页 | ⭐⭐⭐ | ★★★★★ | Week 2-3 |
| 3 | Schedule as .ics 下载 | ⭐⭐ | ★★★★ | Week 3 |
| 4 | Shareable URL 链接 | ⭐ | ★★★★ | Week 3 |
| 5 | 业务小时 overlap 可视化 | ⭐⭐ | ★★★★ | Week 3 |
| 6 | 自然语言查询（"9am PST in Tokyo"）| ⭐⭐⭐ | ★★★ | Week 8+ |
| 7 | 本地化时间格式（12/24h, date fmt）| ⭐ | ★★ | Week 4 |
| 8 | 黑暗模式 | ⭐ | ★★ | Week 2 |

---

## 4. 数据模型

### 4.1 City 对象

```typescript
interface City {
  slug: string;              // "new-york"
  name: string;              // "New York"
  country: string;           // "United States"
  countryCode: string;       // "US"
  timezone: string;          // "America/New_York" (IANA)
  population: number;        // 8400000
  latitude: number;
  longitude: number;
  isNomadHub: boolean;       // true for Lisbon, Bali, etc.
  description: string;       // 60-100 字 SEO 友好简介
}
```

### 4.2 数据来源

| 数据 | 来源 | 许可 |
|------|-----|-----|
| 城市列表 / 坐标 / 人口 | **simplemaps.com Basic**（免费）或 Wikipedia | CC BY 4.0 |
| 时区 IANA 数据 | **@vvo/tzdb**（npm 包） | MIT |
| DST 处理 | **luxon** 或 **date-fns-tz** | MIT |
| 国家代码 / 国旗 | **world-countries**（npm） | MIT |

**0 预算可行**：以上全部免费 / MIT 许可。

### 4.3 动态数据 vs 静态数据

| 数据 | 策略 |
|------|-----|
| 城市名/人口/坐标/IANA 标识 | ✅ 静态 SSG |
| 时区偏移 / DST 状态 | ⚠️ **构建时快照** + 客户端用当前时间重算 |
| "Current time in X" | ✅ 客户端 JS 动态渲染（绕开缓存问题）|
| Overlap 时段 | ✅ 客户端 JS 计算 |

**关键**：页面 SSG 时渲染的"当前时间"只是示例，真实时间由客户端 `Date()` + `luxon` 计算。Google 爬虫看到的是静态文本。

---

## 5. 首批 50 座城市（已选定）

### 北美（8）
New York · San Francisco · Los Angeles · Toronto · Vancouver · Austin · Miami · Mexico City

### 欧洲（13）
London · Berlin · Lisbon · Barcelona · Madrid · Amsterdam · Paris · Dublin · Copenhagen · Warsaw · Prague · Tbilisi · Stockholm

### 亚洲（15）
Tokyo · Singapore · Hong Kong · Bangkok · Chiang Mai · Bali (Denpasar) · Kuala Lumpur · Taipei · Seoul · Bengaluru · Mumbai · Dubai · Tel Aviv · Ho Chi Minh City · Shanghai

### 大洋洲（3）
Sydney · Melbourne · Auckland

### 拉丁美洲（6）
São Paulo · Buenos Aires · Medellín · Lima · Santiago · Rio de Janeiro

### 非洲（3）
Cape Town · Nairobi · Lagos

### 中东（2）
Istanbul · Cairo

### 选城市原则
1. ✅ 覆盖主要时区（全球 24 个时区都有代表）
2. ✅ **数字游牧 / 远程工作热门城市**重点覆盖（Lisbon、Bali、Medellín、Chiang Mai、Tbilisi、Tel Aviv、Mexico City）
3. ✅ 每个大洲都有
4. ✅ 避开政治敏感城市（Moscow / Tehran 暂不加，防 AdSense 敏感）

**城市对数**：C(50, 2) = 1,225 对 × 2 方向（A→B 和 B→A）= **2,450 页**（或用 canonical 去重 = 1,225 页）

> **实现建议**：1,225 页做 canonical，每对只生成一页（`/meet/new-york-and-tokyo`），URL 双方向都指向它。**更安全、更少重复内容风险**。

---

## 6. 信息架构 & URL 结构

```
/                                    # 首页（交互 Planner）
/meet/[city-a]-and-[city-b]          # 核心 SEO 页（1225 个）
/city/[city]                         # 单城市页（50 个）
/planner                             # 多城市交互工具
/timezone/[tz-short]                 # PST / EST / GMT / JST 等（30 个）
/timezone/                           # 时区索引页
/meeting/[hash]                      # 可分享会议（不索引、noindex）
/blog/[slug]                         # 支撑博客内容（10-15 篇）
/blog/                               # 博客索引
/about                               # AdSense 必备
/privacy                             # AdSense 必备
/terms                               # AdSense 必备
/contact                             # AdSense 必备
/sitemap.xml                         # 动态生成
/robots.txt                          # 动态生成
```

### URL 规范化（重要）
- 城市 slug 一律小写 kebab-case：`new-york`, `ho-chi-minh-city`
- 城市对按字母序排序：`/meet/london-and-tokyo`（不是 tokyo-and-london）
- 来自反向请求的 `tokyo-and-london` → **301 重定向**到字母序版本
- 所有页面 canonical URL 指向字母序版本

---

## 7. 页面模板设计（避开薄内容）

**这是整个计划的关键**。Programmatic SEO 站被 Google 砍的核心原因都是薄内容。每页**必须 400+ 字独特内容**。

### 7.1 城市对页模板（`/meet/new-york-and-tokyo`）

```markdown
# Meeting Time Between New York and Tokyo

[TL;DR 框]
Time difference: 13 hours (Tokyo ahead)
Best meeting time: 8:00 AM NY = 10:00 PM Tokyo / 8:00 PM NY = 10:00 AM Tokyo next day

## Current Time
[客户端渲染实时时钟 × 2]

## Timezone Overview
- New York: Eastern Time (UTC−5 / UTC−4 DST)
- Tokyo: Japan Standard Time (UTC+9, no DST)
- Next DST change in New York: [computed]

## Business Hours Overlap
[可视化 timeline，显示两城市 9am-6pm 重叠时段]
在 New York 9am-6pm 工作制下，Tokyo 对应 10pm-7am（深夜）
**实际重叠 = 0 小时**。需要一方让步。

## Best Times to Schedule a Meeting
Option 1: Morning NY / Evening Tokyo
- 7:00 AM New York = 9:00 PM Tokyo ✅ Tokyo dinner time
Option 2: Evening NY / Morning Tokyo
- 8:00 PM New York = 10:00 AM Tokyo next day ✅ Tokyo morning

## Common Scenarios
### Weekly Standup (30 min)
推荐时间：Monday 8 AM NY / 10 PM Tokyo（Tokyo 方要晚间参会）

### Client Call with Tokyo Business
推荐：NY morning 7-9 AM 段，捕获 Tokyo 傍晚

## Cultural Notes
- Tokyo business culture values punctuality; join 3-5 min early
- New York normalizes "running 5 min late"

## FAQ
Q: Does daylight saving affect Tokyo?
A: No, Japan does not observe DST.

Q: Can I schedule a recurring meeting across these time zones?
A: Yes. Use the ICS download...

## [Add to Calendar] Button → .ics 下载

## Related City Pairs
- London and Tokyo
- San Francisco and Tokyo
- Singapore and Tokyo
- Sydney and New York
```

**字数**：约 500-700 字，数据驱动但每对独特。

### 7.2 单城市页模板（`/city/lisbon`）

```markdown
# Lisbon Time Zone & Remote Work Guide

Current time: [客户端渲染]
Timezone: WET (UTC+0) / WEST (UTC+1 DST)
Country: Portugal
Population: ~500k city / 3M metro

## Why Lisbon for Remote Work?
[100-150 字介绍 Lisbon 数字游牧生态，coworking、签证等]

## Business Hours Overlap with Major Cities
[表格：Lisbon vs New York / London / Tokyo / Sydney / SF]

## Best Time to Call Lisbon From...
- From US East Coast: [推荐时段]
- From US West Coast: [推荐时段]
- From Singapore: [推荐时段]

## DST Schedule
Next change: [computed]

## Popular City Pairs with Lisbon
[内链到所有含 Lisbon 的 /meet 页面]

## Remote Work Stats
- Average internet speed: 100+ Mbps
- Estimated monthly cost: $2,000-3,000
- Digital nomad visa: Yes, available
```

**字数**：约 400-500 字。

### 7.3 时区信息页（`/timezone/pst`）

```markdown
# Pacific Standard Time (PST) Explained

PST = UTC−8
PDT (daylight) = UTC−7
Cities in PST: Los Angeles, San Francisco, Vancouver, Seattle...

## Current Time in PST
[客户端渲染]

## DST Rules
US/Canada PST observes DST from second Sunday of March to first Sunday of November.

## Convert PST to...
[快捷链接到各 /meet 页面]

## Common Confusion
- PST vs PDT
- PST vs PT (generic)
```

---

## 8. 技术栈

| 层 | 选择 |
|---|------|
| 框架 | **Next.js 15（App Router）** |
| 静态生成 | `generateStaticParams` + SSG |
| 时区库 | **luxon** 或 **date-fns-tz**（推荐 luxon，API 更符合直觉）|
| UI 库 | **shadcn/ui** + **Tailwind CSS** |
| 图标 | **lucide-react** |
| Calendar export | **ics** 包（npm） |
| 部署 | **Cloudflare Pages**（免费 + 无限带宽） |
| 分析 | Cloudflare Web Analytics + Google Search Console |
| 域名 | Week 5 时从 Cloudflare Registrar 买（$10/年） |

### 关键实现细节

#### SSG 大规模生成
```typescript
// app/meet/[pair]/page.tsx
export async function generateStaticParams() {
  const pairs = [];
  for (let i = 0; i < cities.length; i++) {
    for (let j = i + 1; j < cities.length; j++) {
      pairs.push({
        pair: `${cities[i].slug}-and-${cities[j].slug}`,
      });
    }
  }
  return pairs; // 1225 pairs
}
```

#### DST 动态重建策略
Cloudflare Pages 免费版 500 次 build/月够用。策略：
- 每年 2 次手动重建（DST 切换前一周）
- 其他时间可用 GitHub Actions 自动 trigger
- 客户端实时计算当前偏移（避开缓存问题）

#### 性能目标
| 指标 | 目标 |
|------|-----|
| LCP | < 2.0s |
| CLS | < 0.05 |
| INP | < 150ms |
| 单页 JS | < 100KB gzipped |
| First Paint | < 1.0s |

---

## 9. SEO 策略

### 9.1 关键词分层打法

| 层 | 关键词类型 | 月搜索 | 竞争 | 你的策略 |
|---|---------|-------|-----|---------|
| A | "[city] to [city] time" | 5k-50k | 🔴 极高（timeanddate 盘踞）| 不硬刚，做 Top 5-20 捡边角 |
| B | "best time meeting [city] [city]" | 500-5k | 🟡 中 | **主攻战场**，Top 3 可行 |
| C | "schedule call [city] [city]" | 200-2k | 🟢 低 | **确保拿下** |
| D | "[nomad city] remote work timezone" | 100-1k | 🟢 低 | 补长尾 |

### 9.2 每页必做 SEO 元素

- [ ] `<title>`：**`Best Meeting Time Between [A] and [B] | [Site Name]`**
- [ ] `<meta description>`：含时差 + 最佳会议时段 + CTA
- [ ] `<h1>`：与 title 呼应但不相同
- [ ] canonical URL（字母序版本）
- [ ] Open Graph + Twitter Card
- [ ] **JSON-LD**：
    - `WebSite` + `SearchAction`（首页）
    - `Article` 或 `FAQPage`（城市对页）
    - `Place`（单城市页）
    - `BreadcrumbList`（所有页面）

### 9.3 内链网络

每个城市对页（例：NY-Tokyo）底部链接：
- "Related pairs" — 6 条：
    - 其他 4 个 NY-XX 对
    - 其他 2 个 XX-Tokyo 对
- "City info" — 2 条：`/city/new-york`, `/city/tokyo`
- "Timezone info" — 2 条：`/timezone/est`, `/timezone/jst`

每个单城市页底部列出**全部** 49 个 `/meet/[city]-and-XX` 链接 → 这就是 programmatic 内链的核心。

### 9.4 Sitemap 策略

- `sitemap.xml` 分片：
    - `sitemap-pairs.xml`（1225 条）
    - `sitemap-cities.xml`（50 条）
    - `sitemap-timezones.xml`（30 条）
    - `sitemap-pages.xml`（首页、博客、合规页）
- `robots.txt` 指向主 sitemap 索引
- Search Console 分别提交

### 9.5 博客支撑内容（10-15 篇，Week 4-6 产出）

不是 SEO 主阵地，但**AdSense 审核需要证明"不是纯模板站"**：

1. Best Practices for Scheduling Meetings Across Time Zones
2. Async vs Sync Communication in Remote Teams
3. How to Manage a Globally Distributed Team
4. Top 10 Cities for Digital Nomads in 2026
5. The Complete Guide to DST for Remote Workers
6. How to Handle "Timezone Guilt" in Distributed Teams
7. Remote Work Timezone Cheat Sheet（可视化多图）
8. Running Effective Standups Across 3+ Time Zones
9. Zoom / Google Meet / Slack Huddles: Timezone Best Practices
10. The Rise of "Follow the Sun" Engineering

每篇 1500-2500 字，AI 辅助写大纲 + 你真实改写。

---

## 10. AdSense 过审注意事项（Programmatic 站特别版）

### 10.1 核心风险：被判定为 "thin content" / "scaled content abuse"

### 10.2 提前预防的 7 件事

1. **单页内容密度**：所有城市对页 ≥ 400 字独特文本（不计重复的 nav / footer）
2. **独特价值可见**：每页至少 **3 个数据点因城市对而变**（时差、overlap、最佳时间）
3. **非程序化内容**：博客 10+ 篇高质量文章，证明站点有"编辑团队"属性
4. **About 页讲故事**：你为什么做这个站（远程工作者的亲身需求）
5. **联系方式真实**：邮箱 + 可能的社交链接
6. **分批上线**：
    - Week 3 先上 100 页 + 3 篇博客 → 索引观察 2 周
    - Week 5 再扩到 1225 页 → **不是一口气倾泻**（避免 Google 把你当 spam）
7. **手动提交首页 + 10 个关键页**到 Search Console，不要依赖 sitemap 自动爬

### 10.3 可能被拒的信号 + 补救

| 拒审理由 | 补救方案 |
|---------|---------|
| Low value content | 每页加 200 字"Cultural notes" / "Scenarios" 段落 |
| Duplicate content | 确保字母序 canonical 生效；每对的 FAQ 写独特内容 |
| Insufficient original content | 博客再加 5 篇深度长文 |
| Site under construction | 删除任何 "Coming soon" / 占位符内容 |

---

## 11. 变现组合（AdSense + 联盟）

### 11.1 AdSense 广告位（过审后部署）

| 位置 | 广告单元类型 | 优先级 |
|------|------------|-------|
| 城市对页 TL;DR 下方 | In-article 横幅 | ★★★★★ |
| 城市对页 FAQ 上方 | In-article | ★★★★ |
| 首页 hero 下方 | Display 横幅 | ★★★ |
| 博客文章正文中 | In-article | ★★★★ |
| 侧边栏（桌面）| Sticky sidebar | ★★★★ |
| 页脚上方 | Display | ★★ |

**禁止**：不在 Planner 交互工具页上放广告（影响核心功能体验 + Google 会警告）

### 11.2 联盟营销（Week 12 之后加，AdSense 过审稳定后）

| 联盟 | 插入位置 | 预期月收入 |
|------|--------|----------|
| **Notion** | 博客"remote work tools"文中 | $10-50 |
| **Calendly** | "Schedule this meeting"按钮附近文字链 | $20-100 |
| **Linear / Asana** | 博客"project management"主题 | $10-50 |
| **Nomad List** | "Top cities for nomads"博客 | $5-30 |
| **Wise / Revolut**（数字游牧用）| 博客 | $10-50 |

### 11.3 未来收益升级（12+ 月）

- 流量到 **50k UV/月** → 申请 **Ezoic** 或 **Mediavine**（RPM 2-5x AdSense）
- 流量到 **100k UV/月** → 考虑 Chrome 扩展 + 付费版 Meeting Planner（$4.99/月）

---

## 12. 6-8 周路线图（到 AdSense 申请）

### Week 1：数据 & 骨架

- [ ] `npx create-next-app@latest timezone-planner`
- [ ] 装 shadcn/ui + Tailwind + luxon + ics
- [ ] 定义 `cities.ts`（50 座城市全字段）
- [ ] 搭基础 layout + 首页空壳
- [ ] 部署 Cloudflare Pages（`*.pages.dev`）
- [ ] **关键**：验证 luxon DST 计算对所有 50 城市正确（测试用例 50+）

### Week 2：核心页面模板

- [ ] Meeting Planner 交互组件（多城市 timeline 滑块）
- [ ] `/meet/[pair]/page.tsx` 模板（含 SSG）
- [ ] `/city/[city]/page.tsx` 模板
- [ ] 先只生成 **100 页**（手选 10 × 10 = 45 对 + 10 城市 + 其他）
- [ ] JSON-LD 组件封装

### Week 3：功能 & 扩展

- [ ] Schedule as .ics 下载功能
- [ ] Shareable URL（URL 参数序列化）
- [ ] Business hours overlap 可视化
- [ ] 时区信息页 `/timezone/[tz]`
- [ ] sitemap.ts / robots.ts
- [ ] 第 1-3 篇博客文章

### Week 4：内容 & 合规

- [ ] 扩展到全部 1,225 城市对页
- [ ] 第 4-7 篇博客文章
- [ ] About / Privacy / Terms / Contact 4 页
- [ ] 404 / 500 页
- [ ] 性能优化（达到第 8 章性能目标）

### Week 5：域名 & Search Console

- [ ] 从 Cloudflare Registrar 买域名（$10/年）
    - 推荐候选：`teamtime.io` / `meetingtimes.app` / `remotehours.com`
- [ ] Cloudflare Pages 绑定自定义域名
- [ ] 更新所有 canonical URL
- [ ] 注册 Google Search Console
- [ ] 提交分片 sitemap
- [ ] 手动"请求编入索引"首页 + 5 个热门对 + 3 篇博客

### Week 6：最后补强

- [ ] 第 8-10 篇博客文章
- [ ] 所有页面走查：meta、JSON-LD、alt 文字
- [ ] `public/ads.txt` 准备就绪
- [ ] AdSense 验证脚本占位

### Week 7：申请 AdSense

- [ ] 注册 <https://adsense.google.com>
- [ ] 提交站点
- [ ] 部署验证脚本
- [ ] 耐心等待（3-14 天）

### Week 8+：等审核 + 持续迭代

- [ ] **被拒绝**：按 10.3 补救，48h 后再申请
- [ ] **通过**：按 11.1 部署广告位
- [ ] 持续产出博客（周更 1 篇）
- [ ] 监控 GSC 收录情况

---

## 13. 收益预期 & 放弃条件

### 13.1 诚实的预期

| 时间点 | UV/天 | 月收益（USD） | 说明 |
|-------|-------|-------------|-----|
| 第 2 个月 | 20-100 | $0（未过审） | 新站 + 等索引 |
| 第 4 个月 | 100-500 | $5-30 | AdSense 刚过审 |
| 第 6 个月 | 500-2k | $30-100 | SEO 长尾开始起 |
| 第 9 个月 | 2k-6k | $80-300 | 稳定增长期 |
| 第 12 个月 | 5k-15k | **$150-500** | **跑通标志** |
| 第 18 个月 | 10k-50k | $400-1500 | 可能升级 Ezoic |
| 第 24 个月 | 30k-150k | $1000-5000 | 成熟期 |

> **"跑通"的定义**：第 12 个月月收益稳定 ≥ $100 即视为**模式验证成功**。达不到再考虑调整（但不是换赛道，是改策略）。

### 13.2 放弃 / pivot 信号

**继续坚持的信号**（即使收益慢）：
- GSC 曝光**每月都在增长**（哪怕只涨 10%）
- AdSense 过审（说明内容质量 OK）
- 偶尔有自然分享 / Reddit 提及

**需要改策略（不是换赛道）的信号**：
- 6 个月时 GSC 曝光 < 5,000/月 → 关键词选错，调整博客主题
- 3 次 AdSense 申请都被拒 → 内容密度问题，加博客
- 特定城市对页没索引 → 分批提交策略调整

**真正考虑 pivot 的信号**（6 个月后）：
- 整站流量 < 100 UV/天 且无增长趋势
- 域名被算法惩罚（GSC 有手动处罚警告）

---

## 14. 风险与应对

| 风险 | 等级 | 应对 |
|-----|------|-----|
| timeanddate 打压 | 🔴 高 | 只打长尾，不打头部 |
| AdSense 拒审（programmatic）| 🔴 高 | 每页 400+ 字 + 博客 10+ 篇 |
| Google 把 2450 页判 spam | 🟡 中 | 分批上线 + 手动提交 + 真实内链 |
| DST 计算 bug | 🟡 中 | 用 luxon + 50+ 单元测试 |
| Cloudflare build 超额 | 🟢 低 | 500 次/月够用 |
| 联盟营销政策冲突 AdSense | 🟢 低 | 联盟链接 `rel="sponsored"` 标注 |
| 自己半路想换赛道 | 🔴 **最高** | **已签署本文档方向冻结条款** |

---

## 15. 第一周行动清单

按顺序做，目标**第一周末有一个可访问的 URL + 完成 50 城市数据 + Meeting Planner 能用**。

> **进度更新（2026-05-08）**：Day 1-3 已完成，提前进入 Day 4-5 阶段。
> - 仓库：https://github.com/puchunjie/timezone-planner
> - 线上：https://timezone-planner.puchunjie.workers.dev/

### Day 1（Mon，2-3h）✅ 完成
- [x] `pnpm create next-app@latest`（Next.js 16 + TS + Tailwind v4 + App Router）
- [x] `pnpm i luxon @vvo/tzdb ics @types/luxon`
- [x] `pnpm dlx shadcn@latest init`（neutral base，已生成 `components/ui/button.tsx` + `lib/utils.ts`）
- [x] 推 GitHub（私有仓库）
- [x] 配 Cloudflare Workers 自动部署（OpenNext 适配，自动加上 `wrangler.jsonc`）

**Day 1 实际遇到并解决的坑**：
- Node 18 → 20 → 22（Next.js 16 要 ≥20，Cloudflare Wrangler 4.x 要 ≥22）
- pnpm 切 Node 后需要 `corepack enable && corepack prepare pnpm@10.9.0 --activate`
- `~/Desktop/node_modules` 历史残留干扰 Turbopack → `next.config.ts` 加 `turbopack.root`
- 加 `.nvmrc` 锁住 Node 22

### Day 2（Tue，2-3h）✅ 完成
- [x] `data/cities.ts`：50 座城市全字段（slug / name / country / IANA tz / 坐标 / 人口 / isNomadHub / SEO 简介）
- [x] `lib/timezone.ts`：`getOffsetHours` / `getOffsetLabel` / `getTimeDifferenceHours` / `getOverlap`（cityA 锚定当天 + cityB 跨 ±1 天匹配）/ `isDST` / `nextDSTChange` / `suggestMeetingTimes`
- [x] `vitest` + `tests/timezone.test.ts`：**219 个用例全部通过**
  - 50 城 IANA tz 合法
  - 北半球 21 城夏季 DST、冬季无 DST
  - 南半球 4 城（含 Santiago）反向 DST
  - 25 个 no-DST 城市夏冬偏移恒定
  - 关键基准点：NY、London、Tokyo、Sydney、Bengaluru、Auckland
  - NY-Tokyo overlap=0h、NY-London summer=4-5h、Singapore-Tokyo overlap≥7h

### Day 3（Wed，2-3h）✅ 完成（提前合并 Day 4 部分内容）
- [x] `components/meeting-planner.tsx`：客户端交互组件，最多 5 城同时显示
  - 48 半小时分辨率 timeline
  - 单个时间指针拖动 → 所有城市时间联动
  - 9-18 工作时段绿条可视化
  - overlap 实时计算
  - add/remove/reset 城市
- [x] `app/page.tsx`：MVP 落地页（Hero + Planner + 3 feature 卡）
- [x] `app/meet/[pair]/page.tsx`：SSG 模板（含 TL;DR / 时区介绍 / best meeting times / scenarios / FAQ / related pairs 内链）
- [x] `lib/pairs.ts`：`pairSlug` / `allPairSlugs` / `parsePairSlug` / `relatedPairs`
- [x] **压力测试通过**：1229 个静态页 8.8 秒 SSG 完成（提前实现原计划 Week 4 的全量 1225 页规模）
- [x] 改用 system font 替代 `next/font/google`（中国网络无障碍 build）

### Day 4（Thu，2-3h）✅ 完成
- [x] `/city/[city]/page.tsx` 模板 + 50 个单城市页（offset 对照表、popular pairs、DST schedule、nomad 标识）
- [x] `/timezone/[tz]/page.tsx` + 13 个常用缩写（PST/EST/CST/GMT/CET/EET/IST/SGT/JST/KST/AEST/NZST/GST）
- [x] `.ics` 下载功能（`lib/ics.ts`）
- [x] Shareable URL（`lib/shared-meeting.ts` + `?c=&t=&d=` 参数 + `/meeting` 接收页 noindex）
- [x] MeetingPlanner 升级：duration 选择、Add to Calendar、Share link（剪贴板）、URL params 自动初始化（Suspense 包裹 useSearchParams）

### Day 5（Fri，1-2h）✅ 完成
- [x] About / Privacy / Terms / Contact 4 页（AdSense 合规必备）
- [x] `app/sitemap.ts` 自动生成 1300+ URL（含 home / 合规 / blog / 50 city / 13 timezone / 1225 pair）
- [x] `app/robots.ts` 禁止 `/meeting`、指向 sitemap
- [x] `lib/site.ts` SITE_URL 单一源（可通过 `NEXT_PUBLIC_SITE_URL` env 覆盖，切自定义域名只改一行）
- [ ] 在手机上测试（**还没做**，需要你打开线上 URL 在手机访问）
- [ ] Lighthouse Core Web Vitals（**还没做**）

### Weekend（2-3h）✅ 完成
- [x] 全局 SiteHeader + SiteFooter（含 5 个底部合规链接 + 顶部 Planner / Blog / About 导航）
- [x] JSON-LD 组件：`WebSite` / `Article` / `Place` / `BreadcrumbList`（`components/json-ld.tsx`）
- [x] JSON-LD 植入：root layout（WebSite）、meet 页（Article + Breadcrumb）、city 页（Place + Breadcrumb）、blog 页（Article + Breadcrumb）
- [x] 博客 1-3 篇（均 ≥1500 字）：
  - "Best Practices for Scheduling Meetings Across Time Zones"（约 1500 字）
  - "The Complete Guide to Daylight Saving Time for Remote Workers"（约 1800 字）
  - "Top 10 Cities for Digital Nomads in 2026"（约 2000 字）
- [x] `/blog` 索引 + `/blog/[slug]` 详情（零依赖 Markdown 渲染，避免引入 MDX）

**第一周结束的 Demo URL**：~~`timezone-planner-xxx.pages.dev`~~ → **已就绪**：https://timezone-planner.puchunjie.workers.dev/

### Week 1 实际产出 vs 原计划

| 项目 | 原计划在 | 实际完成在 |
|---|---|---|
| 50 城市数据 + DST 测试 | Day 2 | ✅ Day 2（219 测试） |
| Meeting Planner 联动 | Day 4 | ✅ Day 3（提前一天） |
| 部署到 Cloudflare | Day 5 | ✅ Day 1（提前 4 天，OpenNext Workers） |
| 1225 城市对页 SSG | **Week 4** | ✅ Day 3（**提前 3 周**） |
| 50 单城市页 | Week 2 | ✅ Day 4 |
| 时区信息页 | Week 3 | ✅ Day 4 |
| `.ics` + Shareable URL | Week 3 | ✅ Day 4 |
| 博客 1-3 篇 | Week 4 | ✅ Weekend |
| About / Privacy / Terms / Contact | Week 4 | ✅ Day 5 |
| sitemap / robots | Week 5 | ✅ Day 5 |
| JSON-LD | Week 5 | ✅ Weekend |

**第 1 周末实际站点规模**：1303 静态页（首页 + 1225 城市对 + 50 城市 + 13 时区 + 4 合规 + 3 博客 + 索引 + 系统页）

### 还差但未完成
- [ ] 手机端实测（你需要在手机访问 https://timezone-planner.puchunjie.workers.dev/ 走一遍核心流程）
- [ ] Lighthouse 跑一次（确认 LCP / CLS / INP 达标，详见第 8 章性能目标）
- [ ] 给自己交付物录一个 1 分钟"我做到了"视频（仪式感，别跳过）

### 下一步建议（Week 2 起）

按原计划 Week 2-3 已基本提前完成，接下来真正剩下的工作：

1. **Week 2-3 节奏可放慢**，重点放在博客增量（再写 4-7 篇，凑够 10+ 篇）+ 性能调优
2. **Week 5 提前到 Week 2**：买域名（推荐候选 `teamtime.io` / `meetingtimes.app` / `remotehours.com`）+ 注册 Search Console + 提交 sitemap
3. **Week 6-7 仍按原计划**：申请 AdSense（站点已经达到原计划 Week 6 的内容密度）

---

## 附录 A：决策冻结清单

以下已决策，**除非发现致命缺陷，6 个月不变**：

- ✅ 赛道：时区 meeting planner
- ✅ 定位：Remote team / 数字游牧向
- ✅ 语言：English-only
- ✅ 规模：50 城市 MVP
- ✅ 技术栈：Next.js 15 + Cloudflare Pages + luxon
- ✅ 变现：AdSense + 联盟
- ✅ 路线：6-8 周到 AdSense 申请

## 附录 B：未冻结 / 后续决策

- ⬜ 域名名称（Week 5 前定）
- ⬜ 站点 Logo / 品牌色（Week 2 前定）
- ⬜ 博客前 10 篇的具体标题（Week 3 前定）
- ⬜ Share link 的具体 URL 结构（Week 3 前定）
- ⬜ 是否加 Chrome 扩展 / PWA（12 个月后再看）

---

## 附录 C：官方参考

- Next.js App Router SSG：<https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic>
- luxon Time Zone：<https://moment.github.io/luxon/#/zones>
- IANA tzdata：<https://www.iana.org/time-zones>
- Cloudflare Pages：<https://developers.cloudflare.com/pages/>
- AdSense Content Guidelines：<https://support.google.com/adsense/answer/1348737>
- Google Scaled Content Abuse Policy：<https://developers.google.com/search/docs/essentials/spam-policies#scaled-content>

---

**文档版本**：v2.0（2026-05-08，完全替换 v1.0 工具站版本）
**下次修订节点**：Week 4（中期复盘）、Week 8（AdSense 申请前）、第 3 个月（策略回顾）
