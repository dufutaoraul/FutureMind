# 未来心灵学院 (Future Mind Institute)

一个面向后AGI时代的全球意识觉醒生态系统

## 🎯 项目概述

未来心灵学院是一个创新的在线学习平台，旨在通过意识觉醒、跨学科探索和基于项目的学习（PBL）来培养面向未来的思维能力。

### 核心特性

- **意识进化树** - 可视化追踪学员的成长轨迹
- **与盖亚对话** - AI导师个性化指导（基于N8N工作流）
- **探索者联盟（PBL）** - 全球协作的项目式学习
- **主线剧情** - 季度主题式同步探索
- **暗色主题** - 优雅的用户界面

## 🛠️ 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS v4
- **动画**: Framer Motion
- **数据库**: Supabase (PostgreSQL)
- **认证**: Supabase Auth
- **AI集成**: N8N工作流
- **部署**: Vercel

## 📋 前置要求

- Node.js >= 20.0.0
- npm >= 9.0.0

## 🚀 快速开始

### 1. 安装依赖

\`\`\`bash
npm install
\`\`\`

### 2. 配置环境变量

复制 `.env.example` 到 `.env.local` 并填写以下变量：

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=你的supabase地址
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的supabase匿名密钥
\`\`\`

### 3. 启动开发服务器

\`\`\`bash
npm run dev
\`\`\`

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 📁 项目结构

\`\`\`
futuremind-new/
├── app/                    # Next.js App Router页面
│   ├── page.tsx           # 主页
│   ├── login/             # 登录/注册页面
│   ├── portal/            # 个人门户
│   ├── pbl/               # PBL项目页面
│   ├── simple-tree/       # 意识树详情页
│   └── api/               # API路由
│       └── n8n/           # N8N集成API
├── components/            # React组件
│   ├── GaiaDialog.tsx    # 盖亚对话组件
│   ├── ConsciousnessTree.tsx  # 意识树组件
│   └── ui/               # UI组件
├── lib/                  # 工具函数和API
│   ├── supabase/         # Supabase配置
│   └── api/              # API客户端
├── types/                # TypeScript类型定义
└── public/               # 静态资源
\`\`\`

## 🔧 主要功能

### 1. 用户认证
- 邮箱/密码登录注册
- Supabase Auth集成
- ✅ 修复了hydration error
- ✅ 修复了密码框图标逻辑

### 2. 主页
- ✅ 纯黑暗色主题
- ✅ 登录检测（"与盖亚对话"和"探索者联盟"）
- ✅ 删除了测试页面按钮

### 3. 个人门户
- 意识进化树可视化
- 学习进度追踪
- 任务管理系统

### 4. PBL项目
- 全球协作项目
- 项目进度管理
- 团队协作功能

### 5. 盖亚对话
- N8N工作流集成
- 对话历史管理
- 文档上传功能

## 🌐 部署到 Vercel

### Vercel配置说明

1. **Framework Preset**: 选择 `Next.js`
2. **Root Directory**: `.`（项目根目录）
3. **Build Command**: `npm run build`
4. **Output Directory**: `.next`

### 环境变量设置

在Vercel项目设置中添加以下环境变量：

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://lvjezsnwesyblnlkkirz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的密钥
\`\`\`

### 部署步骤

1. 将项目推送到GitHub仓库
2. 在Vercel中导入项目
3. 配置环境变量
4. 点击Deploy

## 🔗 N8N工作流

项目集成了两个N8N工作流：

1. **聊天工作流**: `https://n8n.aifunbox.com/webhook/b568b56a-79f0-47d4-b016-969612e5fa19`
   - 用于盖亚对话功能

2. **文档上传工作流**: `https://n8n.aifunbox.com/webhook/fca634ab-8e03-4a6f-99f3-c7dc46e772ae`
   - 用于课程资料向量化

## 🐛 已修复的问题

1. ✅ **登录页面hydration error** - 使用useMemo和isMounted修复
2. ✅ **密码框眼睛图标逻辑反了** - 睁眼=可见，闭眼=隐藏
3. ✅ **主界面底色问题** - 改为纯黑暗色主题
4. ✅ **删除过时的dashboard页面** - 只保留portal页面
5. ✅ **探索者联盟跳转** - 改为跳转到/pbl页面

## 📝 开发说明

### 代码规范

- 使用TypeScript严格模式
- 遵循ESLint规则
- 使用Tailwind CSS进行样式开发
- 组件使用函数式组件 + Hooks

### Git工作流

- `main` - 生产分支
- `develop` - 开发分支
- `feature/*` - 功能分支

## 📄 许可证

本项目为私有项目，未经授权不得复制或分发。

## 👥 团队

- **项目负责人**: 杜富陶
- **AI助手**: Claude Code

## 📞 联系方式

如有问题，请联系项目负责人。

---

**最后更新时间**: 2025-10-23
**版本**: v1.0.0
