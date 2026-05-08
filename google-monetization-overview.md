# Google 自建网站 / App 变现渠道汇总

> **信息截止日期**：2026-05-08
> **范围**：仅限 Google 官方对发布者（Publisher / Creator）开放的变现产品。
> **来源**：`support.google.com`、`adsense.google.com`、`admanager.google.com`、`admob.google.com`、`developers.google.com`、`blog.google`。
> **说明**：Google 政策与地区可用性变动较快，落地前请以官方文档为准。

---

## 目录

1. [一张图看懂选哪个](#1-一张图看懂选哪个)
2. [产品逐项说明](#2-产品逐项说明)
    - 2.1 [Google AdSense](#21-google-adsense网站展示广告)
    - 2.2 [Google Ad Manager（含 AdX）](#22-google-ad-manager含-adx-程序化)
    - 2.3 [Google AdMob](#23-google-admob移动-app)
    - 2.4 [YouTube Partner Program](#24-youtube-partner-programypp)
    - 2.5 [Reader Revenue Manager / Subscribe with Google](#25-reader-revenue-manager--subscribe-with-google)
    - 2.6 [Privacy & messaging（原 Funding Choices）](#26-privacy--messaging原-funding-choices)
    - 2.7 [Google News Showcase](#27-google-news-showcase新闻发行商专项)
3. [横向对比表](#3-横向对比表)
4. [组合使用建议](#4-组合使用建议)
5. [政策合规红线](#5-政策合规红线-必读)
6. [常见误区 & 不在范围内的项目](#6-常见误区--不在范围内的项目)
7. [参考资料](#7-参考资料全部官方)

---

## 1. 一张图看懂选哪个

```
是个人博客 / 中小网站？        → AdSense
是中大型媒体 / 要程序化？      → Ad Manager（+ AdX）
只有移动 App？                 → AdMob
做视频？                       → YouTube Partner Program（YPP）
要做订阅 / 付费墙？            → Reader Revenue Manager / Subscribe with Google
需要 GDPR 同意、反 Adblock？   → Privacy & messaging（所有上述产品的通用合规层）
是正规新闻出版机构？           → News Showcase（邀请制，额外叠加）
```

> **核心理念**：Google 的变现产品不是互斥的。一个成熟站点通常是 **AdSense / Ad Manager + Privacy & messaging + Reader Revenue Manager** 的组合拳。

---

## 2. 产品逐项说明

### 2.1 Google AdSense（网站展示广告）

**官方定位**：面向中小站长的一站式展示广告变现平台，自动在网页上投放 Google 广告生态的展示、原生、匹配内容广告。

**收益模式**
- 按 **eCPM 结算**，底层混合 CPC（点击付费）与 CPM（千次展示付费）。
- **AdSense for Content：发布者净分成 80%**（Google 预先扣除 Ads 端 15% 购买方费用后，发布者从剩余部分拿 80%，整体到手约 **68%**）。
- AdSense for Search 等子产品分成不同，官方不统一披露。

**准入门槛**
- 申请人**年满 18 岁**；未成年人需家长以本人 Google 账号代为申请。
- 对网站具有所有权或管理权，内容原创、高质量，有稳定访问量。
- 提交申请 → 通过站点审核 → 激活投放。

**典型收益触发行为**
- 用户浏览带 AdSense 代码的页面（产生 impression）。
- 用户点击广告（产生 click，对 CPC 类广告计费）。
- 用户与原生广告互动（engagement）。

**官方文档**
- 收益分成：<https://support.google.com/adsense/answer/180195>
- 资质要求：<https://support.google.com/adsense/answer/9724>
- 无效流量政策：<https://support.google.com/adsense/answer/16737>

---

### 2.2 Google Ad Manager（含 AdX 程序化）

**官方定位**：面向中大型发布者的企业级广告服务器 + 变现平台，统一管理**直销广告、第三方广告网络、程序化交易（Ad Exchange / Authorized Buyers）**。

**版本**
- **Ad Manager（免费版）**：功能齐全，适合有一定规模的站点。
- **Ad Manager 360（付费企业版）**：通过合同开通，支持团队协作、AdX 高级能力、SLA。

**收益模式**
- 按已成交（filled）展示计费，支持 **CPM / CPC / CPD / vCPM** 等多种计费方式。
- AdX 为实时竞价（RTB），Google 按合同收取技术服务费，具体分成**不公开**。
- 被识别为**无效流量的展示不计费**，VAST 错误、未成交展示等按规则不计费。

**准入门槛**
- 免费版需达到一定流量规模并通过 Google 审核。
- Ad Manager 360 由 Google 销售团队对接、签合同开通；账户需具备 Legal manager 角色的用户签署。

**官方文档**
- 核心概念：<https://support.google.com/admanager/answer/6012282>
- AM360 计费：<https://support.google.com/admanager/answer/7079586>
- App 场景接入：<https://support.google.com/admanager/answer/6238688>

---

### 2.3 Google AdMob（移动 App）

**官方定位**：为 Android / iOS 应用开发者提供广告变现与中介（mediation）能力，通过 Google Mobile Ads SDK 接入。

**收益模式**
- 展示广告 + bidding 实时竞价。
- 大部分广告网络收入由 AdMob 代付；部分 ad source 为 **direct pay**，由广告网络直接结算。
- 报表区分 **estimated earnings**（估算）与 **finalized earnings**（最终）。

**准入门槛**
- 需有可运营的 Android / iOS 应用。
- 符合 AdMob 发布者政策与行为政策。
- 适合**仅有 App、没有网站**的开发者；如同时运营网站 + App 且规模较大，更推荐用 Ad Manager 统一管理。

**官方文档**
- 入门 FAQ：<https://support.google.com/admob/answer/6168758>
- 行为政策：<https://support.google.com/admob/answer/2753860>

---

### 2.4 YouTube Partner Program（YPP）

**官方定位**：YouTube 官方创作者变现计划，打包广告、会员、打赏、购物等多元收益渠道。

**收益模式（核心）**
| 收益来源 | 创作者分成 |
|----------|-----------|
| **长视频 Watch Page 广告** | **55%**（净收入，签署 Watch Page Monetization Module 后生效） |
| Shorts Feed 广告 | 按创作者池（Creator Pool）分配，扣除音乐授权成本 |
| YouTube Premium 分成 | 按观看时长占比分配 |
| 频道会员（Channel Memberships） | 创作者分成（扣平台费、税费） |
| Super Chat / Super Stickers / Super Thanks | 同上 |
| YouTube Shopping 联盟 | 按合作商家佣金结算 |

**准入门槛（2026 年当前公开规则）**
- 居住在 YPP 开放地区，无 Community Guidelines 警告，开启两步验证，关联 AdSense。
- **订阅数 ≥ 1,000** + 满足以下之一：
  - 过去 12 个月**公开长视频观看时长 ≥ 4,000 小时**，或
  - 过去 90 天**公开 Shorts 观看量 ≥ 1,000 万次**。
- **500 订阅入门版**：仅限部分地区开放，功能有限（打赏、会员等优先，广告在满足主门槛后开启）。

**结算方式**
- 收入通过 **AdSense for YouTube** 发放，按月结算（月 20 日前达到阈值当月支付）。

**官方文档**
- 资格要求：<https://support.google.com/youtube/answer/72851>
- 收益与分成：<https://support.google.com/youtube/answer/72902>
- 付款流程：<https://support.google.com/youtube/answer/14728151>

---

### 2.5 Reader Revenue Manager / Subscribe with Google

**官方定位**：Google Publisher Center 提供的**读者付费变现工具**，为没有自建会员系统的发布者快速上线：
- 订阅（Subscriptions）
- 捐赠（Contributions）
- 注册墙（Registration wall）
- 通讯订阅（Newsletter signup）

企业级版本称 **Reader Revenue Manager Enterprise（RRME）**，承接原 **Subscribe with Google** 的订阅能力。

**收益模式**
- 读者用 Google 账户 / 支付方式完成付款，Google 作为**支付通道**。
- **交易费低（含信用卡费用约 5%）**，扣除后结算到发布者 payments profile。

**准入门槛**
- 在 Publisher Center 创建 publication、完成支付档案验证。
- 当前覆盖 **40+ 国家 / 地区**（印度等仍在 rollout）。

**官方文档**
- 入门指引：<https://support.google.com/news/publisher-center/answer/11449914>
- Publisher Center 概览：<https://support.google.com/news/publisher-center/answer/9606538>
- 开发者文档（SwG.js）：<https://developers.google.com/news/subscribe>

---

### 2.6 Privacy & messaging（原 Funding Choices）

**官方定位**：Ad Manager / AdSense / AdMob 控制台内置的**同意管理平台（CMP）+ 消息工具**，服务两类场景：
1. **合规**：GDPR / UK / 瑞士同意弹窗、美国各州隐私选择、iOS IDFA 说明。
2. **挽回收益**：
    - **Ad blocking recovery**：检测到广告拦截时提示用户关闭 Adblock 或订阅。
    - **Offerwall**：让未订阅 / 被拦截的用户通过**观看激励广告**继续访问内容。

**收益模式**
- 本身不独立产生广告分成，但通过**合规同意保住可变现流量**，并通过 Offerwall / Ad blocking recovery **把流失流量重新激活为广告展示**。
- 最终收益仍走 AdSense / Ad Manager / AdMob 的原有分成体系。

**准入门槛**
- 任何使用 Ad Manager / AdSense / AdMob 的发布者均可启用。
- 同一站点 / App 的消息配置**跨三个平台共享**，不可重复建。

**官方文档**
- 概览：<https://support.google.com/admanager/answer/10075997>
- 消息类型（含 Offerwall / Ad blocking recovery）：<https://support.google.com/admanager/answer/10075998>
- 跨 Ad Manager / AdSense / AdMob 使用：<https://support.google.com/admanager/answer/14188809>

---

### 2.7 Google News Showcase（新闻发行商专项）

**官方定位**：针对正规新闻出版机构的**许可费 / 内容采购计划**。发布者在 Publisher Center 中编辑 Showcase 面板，展示在 Google News 与 Discover；Google **按月支付许可费**给出版商，并为读者解锁部分付费墙内容。

**收益模式**
- **按合同的月度 licensing 付款**，不是 CPM/CPC。
- 可与 Reader Revenue Manager 订阅变现叠加。
- 2020 年启动时 Google 承诺 3 年内投入 **10 亿美元**，已在 20+ 国家与 2,300+ 家出版商签约（约 90% 为本地 / 区域出版物）。

**准入门槛**
- **邀请制 / 合同制**，非自助注册。
- 需为**符合资质的新闻出版机构**，通过各地本地框架签约。
- 普通博客、内容站、自媒体**不适用**。

**官方文档**
- 10 亿美元投资公告：<https://blog.google/outreach-initiatives/google-news-initiative/google-news-showcase>
- 一年回顾：<https://blog.google/products-and-platforms/products/news/news-showcase-one-year->
- 美国落地 + RRM 更名：<https://blog.google/products-and-platforms/products/news/google-local-news-support>

---

## 3. 横向对比表

| 产品 | 面向对象 | 计费 / 分成 | 准入门槛 | 申请方式 |
|-----|---------|------------|---------|---------|
| **AdSense** | 中小站点、博客 | eCPM，内容广告**发布者 80%，到手约 68%** | 18+、原创内容、有流量 | 自助申请 |
| **Ad Manager（免费版）** | 中大型媒体 | CPM/CPC/CPD，分成不公开 | 具一定流量规模 | 自助 + 审核 |
| **Ad Manager 360** | 大型媒体 / 出版集团 | 含 AdX 高级能力 | 签合同 | 销售对接 |
| **AdMob** | 移动 App 开发者 | CPM/CPC + bidding | App 合规 | 自助申请 |
| **YouTube YPP** | 视频创作者 | **长视频 Watch Page 广告 55%** + 会员 / 打赏 / Shorts / Premium | 1,000 订阅 + 4,000 小时 / 1,000 万 Shorts 观看 | 频道后台申请 |
| **Reader Revenue Manager** | 需要订阅 / 付费墙的站点 | 支付通道费约 5% | Publisher Center 账户 | 自助配置 |
| **Subscribe with Google（RRME）** | 企业级订阅发行商 | 同上 + 深度集成 | 合同 + SwG.js 接入 | 销售对接 |
| **Privacy & messaging** | 所有使用 AdSense/AM/AdMob 的人 | 不单独分成 | 已有上述账户即可 | 控制台启用 |
| **News Showcase** | 正规新闻出版机构 | 按合同月付许可费 | 出版资质 + 邀请 | 邀请制 |

---

## 4. 组合使用建议

### 场景 A：个人博客 / 内容站
```
AdSense（主变现）
  └─ Privacy & messaging（合规 + Ad blocking recovery）
  └─ 可选：Reader Revenue Manager（开通"打赏 / 通讯订阅"）
```

### 场景 B：垂直媒体 / 成长期内容站
```
Ad Manager（免费版，统一管理 AdSense + 直销广告）
  └─ Privacy & messaging（Offerwall 挽回被 Adblock 的流量）
  └─ Reader Revenue Manager（订阅 + 捐赠）
  └─ 视频栏目 → 同步 YouTube YPP
```

### 场景 C：大型媒体集团
```
Ad Manager 360 + AdX（程序化 + 直销 + 第三方网络）
  └─ Privacy & messaging（全球合规）
  └─ Subscribe with Google / RRME（订阅会员体系）
  └─ News Showcase（若资质符合，额外许可费收入）
  └─ YouTube 官方频道 → YPP
```

### 场景 D：移动 App 开发者
```
AdMob（中小 App）
  或 Ad Manager（大 App / 同时有网站，统一管理）
  └─ Privacy & messaging（UMP SDK 同意管理）
```

---

## 5. 政策合规红线 ⚠️ 必读

违反以下任一条都可能导致**限流、停投、封号、扣除已产生收益**。

### 5.1 无效流量（Invalid Traffic，IVT）
- **自点自己的广告**（包括用家人、朋友账号帮点）
- **诱导点击**（"点一下广告支持我"、"点击这里查看"）
- 机器人、爬虫、自动刷新脚本
- 同一用户短时间内重复点击
- **处理**：AdSense / Ad Manager / AdMob 会自动扣除无效展示收益，严重者封号且**不退还广告主扣费**。

### 5.2 内容政策
- 禁止：违法内容、成人内容（广告主友好版本以外）、危险或贬损内容、枪支武器、烟草、仇恨言论、知识产权侵权……
- YouTube 还需遵守 **Advertiser-friendly content guidelines**（自评 Self-Certification）。

### 5.3 用户同意（隐私合规）
- 面向欧盟 / 英国 / 瑞士用户必须获取合法同意才能投放**个性化广告**。
- 美国各州（加州 CCPA/CPRA 等）需提供"Do Not Sell / Share"选项。
- 未接入 Privacy & messaging 或等效 CMP，可能导致**流量不变现或合规风险**。

### 5.4 广告布局政策
- 禁止广告与内容混淆（误导点击）。
- 禁止广告紧贴功能按钮造成误触。
- 弹窗 / 覆盖层广告需符合 Better Ads Standards。

---

## 6. 常见误区 & 不在范围内的项目

- ❌ **Google Opinion Rewards**：是**用户端**的问卷奖励 App，不是给站长的变现产品。
- ❌ **Google Ads（前 AdWords）**：是**广告主投放端**，不是发布者端。
- ❌ **Google Analytics**：是数据分析工具，不直接产生变现。
- ❌ 第三方广告网络（Media.net、Ezoic、Mediavine 等）：非 Google 官方，不在本文范围。
- ⚠️ **AdSense for Search / AdSense for Shopping**：是 AdSense 子产品，分成与内容广告不同，本文未展开。
- ⚠️ **Google Discover / Search 的"创作者变现"**：目前没有独立的按浏览量付费计划；流量变现仍需通过 AdSense / Ad Manager。

---

## 7. 参考资料（全部官方）

### AdSense
- <https://support.google.com/adsense/answer/180195>
- <https://support.google.com/adsense/answer/9724>
- <https://support.google.com/adsense/answer/16737>

### Ad Manager
- <https://support.google.com/admanager/answer/6012282>
- <https://support.google.com/admanager/answer/7079586>
- <https://support.google.com/admanager/answer/6238688>

### AdMob
- <https://support.google.com/admob/answer/6168758>
- <https://support.google.com/admob/answer/2753860>

### YouTube Partner Program
- <https://support.google.com/youtube/answer/72851>
- <https://support.google.com/youtube/answer/72902>
- <https://support.google.com/youtube/answer/14728151>

### Reader Revenue Manager / Subscribe with Google
- <https://support.google.com/news/publisher-center/answer/11449914>
- <https://support.google.com/news/publisher-center/answer/9606538>
- <https://developers.google.com/news/subscribe>

### Privacy & messaging
- <https://support.google.com/admanager/answer/10075997>
- <https://support.google.com/admanager/answer/10075998>
- <https://support.google.com/admanager/answer/14188809>

### News Showcase
- <https://blog.google/outreach-initiatives/google-news-initiative/google-news-showcase>
- <https://blog.google/products-and-platforms/products/news/news-showcase-one-year->
- <https://blog.google/products-and-platforms/products/news/google-local-news-support>

---

**文档维护提示**：Google 产品线每年会更新分成比例、门槛和地区可用性（尤其 YPP 与 Reader Revenue Manager）。建议每季度回查一次本文参考链接，核对当前数据。
