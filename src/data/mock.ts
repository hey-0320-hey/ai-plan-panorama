import type { Vendor, PlanCategory, Plan, Announcement } from '@/types/plan'

export const mockCategories: PlanCategory[] = [
  { id: 'cat-1', name: 'Token Plan', slug: 'token-plan' },
  { id: 'cat-2', name: 'Coding Plan', slug: 'coding-plan' },
  { id: 'cat-3', name: 'Agent Plan', slug: 'agent-plan' },
  { id: 'cat-4', name: '会员包', slug: 'membership' },
]

export const mockVendors: Vendor[] = [
  { id: 'v-1', name: '阿里云百炼', slug: 'aliyun-bailian', logo_url: null, website_url: 'https://bailian.console.aliyun.com/', description: '阿里云大模型平台', is_stopped: false, sort_order: 1, created_at: '2025-01-01' },
  { id: 'v-2', name: '火山方舟', slug: 'volcengine', logo_url: null, website_url: 'https://www.volcengine.com/', description: '字节跳动旗下大模型平台', is_stopped: false, sort_order: 2, created_at: '2025-01-01' },
  { id: 'v-3', name: '讯飞星火', slug: 'iflytek', logo_url: null, website_url: 'https://xinghuo.xfyun.cn/', description: '科大讯飞大模型平台', is_stopped: false, sort_order: 3, created_at: '2025-01-01' },
  { id: 'v-4', name: '智谱', slug: 'zhipu', logo_url: null, website_url: 'https://open.bigmodel.cn/', description: '智谱AI大模型平台', is_stopped: false, sort_order: 4, created_at: '2025-01-01' },
  { id: 'v-5', name: '月之暗面', slug: 'moonshot', logo_url: null, website_url: 'https://platform.moonshot.cn/', description: 'Kimi 大模型平台', is_stopped: false, sort_order: 5, created_at: '2025-01-01' },
  { id: 'v-6', name: 'MiniMax', slug: 'minimax', logo_url: null, website_url: 'https://platform.minimaxi.com/', description: 'MiniMax 大模型平台', is_stopped: false, sort_order: 6, created_at: '2025-01-01' },
  { id: 'v-7', name: '百度千帆', slug: 'baidu-qianfan', logo_url: null, website_url: 'https://qianfan.baidubce.com/', description: '百度大模型平台', is_stopped: false, sort_order: 7, created_at: '2025-01-01' },
  { id: 'v-8', name: '腾讯云', slug: 'tencent-cloud', logo_url: null, website_url: 'https://cloud.tencent.com/', description: '腾讯混元大模型', is_stopped: false, sort_order: 8, created_at: '2025-01-01' },
  { id: 'v-9', name: '阶跃星辰', slug: 'stepfun', logo_url: null, website_url: 'https://platform.stepfun.com/', description: '阶跃星辰大模型', is_stopped: false, sort_order: 9, created_at: '2025-01-01' },
  { id: 'v-10', name: 'OpenCode', slug: 'opencode', logo_url: null, website_url: 'https://opencode.ai/', description: '海外 AI 编程套餐', is_stopped: false, sort_order: 10, created_at: '2025-01-01' },
  { id: 'v-11', name: '小米 MiMo', slug: 'xiaomi-mimo', logo_url: null, website_url: 'https://mimo.xiaomi.com/', description: '小米大模型', is_stopped: false, sort_order: 11, created_at: '2025-01-01' },
  { id: 'v-12', name: '优云智算', slug: 'youyun', logo_url: null, website_url: 'https://www.youyun.com/', description: '优云智算平台', is_stopped: false, sort_order: 12, created_at: '2025-01-01' },
]

export const mockPlans: Plan[] = [
  // 阿里云百炼
  { id: 'p-1', vendor_id: 'v-1', category_id: 'cat-1', name: '团队版 标准坐席', slug: 'aliyun-standard', status: 'on_sale', price_monthly: 198, price_yearly: null, currency: 'CNY', credits_5h: null, credits_weekly: null, credits_monthly: 25000, credits_unit: 'Credits', model_count: 15, features_json: null, promo_text: null, affiliate_url: null, sort_order: 1, created_at: '2025-01-01', updated_at: '2025-01-01' },
  { id: 'p-2', vendor_id: 'v-1', category_id: 'cat-1', name: '团队版 高级坐席', slug: 'aliyun-advanced', status: 'on_sale', price_monthly: 698, price_yearly: null, currency: 'CNY', credits_5h: null, credits_weekly: null, credits_monthly: 100000, credits_unit: 'Credits', model_count: 15, features_json: null, promo_text: null, affiliate_url: null, sort_order: 2, created_at: '2025-01-01', updated_at: '2025-01-01' },
  { id: 'p-3', vendor_id: 'v-1', category_id: 'cat-1', name: '团队版 尊享坐席', slug: 'aliyun-premium', status: 'on_sale', price_monthly: 1398, price_yearly: null, currency: 'CNY', credits_5h: null, credits_weekly: null, credits_monthly: 250000, credits_unit: 'Credits', model_count: 15, features_json: null, promo_text: null, affiliate_url: null, sort_order: 3, created_at: '2025-01-01', updated_at: '2025-01-01' },
  { id: 'p-4', vendor_id: 'v-1', category_id: 'cat-1', name: '团队版 共享包', slug: 'aliyun-shared', status: 'on_sale', price_monthly: 5000, price_yearly: null, currency: 'CNY', credits_5h: null, credits_weekly: null, credits_monthly: 625000, credits_unit: 'Credits', model_count: 15, features_json: { note: '有效期1月' }, promo_text: null, affiliate_url: null, sort_order: 4, created_at: '2025-01-01', updated_at: '2025-01-01' },

  // 火山方舟 Token Plan
  { id: 'p-5', vendor_id: 'v-2', category_id: 'cat-1', name: 'Lite', slug: 'volc-lite', status: 'limited', price_monthly: 40, price_yearly: null, currency: 'CNY', credits_5h: 1200, credits_weekly: 9000, credits_monthly: 18000, credits_unit: '次', model_count: 12, features_json: null, promo_text: null, affiliate_url: null, sort_order: 1, created_at: '2025-01-01', updated_at: '2025-01-01' },
  { id: 'p-6', vendor_id: 'v-2', category_id: 'cat-1', name: 'Pro', slug: 'volc-pro', status: 'on_sale', price_monthly: 200, price_yearly: null, currency: 'CNY', credits_5h: 6000, credits_weekly: 45000, credits_monthly: 90000, credits_unit: '次', model_count: 12, features_json: null, promo_text: null, affiliate_url: null, sort_order: 2, created_at: '2025-01-01', updated_at: '2025-01-01' },

  // 火山方舟 Agent Plan
  { id: 'p-7', vendor_id: 'v-2', category_id: 'cat-3', name: 'Small', slug: 'volc-agent-small', status: 'on_sale', price_monthly: 40, price_yearly: null, currency: 'CNY', credits_5h: 2000, credits_weekly: 7000, credits_monthly: 20000, credits_unit: 'AFP', model_count: 12, features_json: null, promo_text: null, affiliate_url: null, sort_order: 3, created_at: '2025-01-01', updated_at: '2025-01-01' },
  { id: 'p-8', vendor_id: 'v-2', category_id: 'cat-3', name: 'Medium', slug: 'volc-agent-medium', status: 'on_sale', price_monthly: 200, price_yearly: null, currency: 'CNY', credits_5h: 10000, credits_weekly: 35000, credits_monthly: 100000, credits_unit: 'AFP', model_count: 15, features_json: null, promo_text: null, affiliate_url: null, sort_order: 4, created_at: '2025-01-01', updated_at: '2025-01-01' },
  { id: 'p-9', vendor_id: 'v-2', category_id: 'cat-3', name: 'Large', slug: 'volc-agent-large', status: 'on_sale', price_monthly: 500, price_yearly: null, currency: 'CNY', credits_5h: 25000, credits_weekly: 87500, credits_monthly: 250000, credits_unit: 'AFP', model_count: 15, features_json: null, promo_text: null, affiliate_url: null, sort_order: 5, created_at: '2025-01-01', updated_at: '2025-01-01' },
  { id: 'p-10', vendor_id: 'v-2', category_id: 'cat-3', name: 'Max', slug: 'volc-agent-max', status: 'on_sale', price_monthly: 1000, price_yearly: null, currency: 'CNY', credits_5h: 50000, credits_weekly: 175000, credits_monthly: 500000, credits_unit: 'AFP', model_count: 15, features_json: null, promo_text: null, affiliate_url: null, sort_order: 6, created_at: '2025-01-01', updated_at: '2025-01-01' },

  // 讯飞星火
  { id: 'p-11', vendor_id: 'v-3', category_id: 'cat-2', name: '无忧版', slug: 'iflytek-free', status: 'on_sale', price_monthly: 3.9, price_yearly: null, currency: 'CNY', credits_5h: null, credits_weekly: null, credits_monthly: null, credits_unit: '次', model_count: 5, features_json: { note: '请求次数不限' }, promo_text: null, affiliate_url: null, sort_order: 1, created_at: '2025-01-01', updated_at: '2025-01-01' },
  { id: 'p-12', vendor_id: 'v-3', category_id: 'cat-2', name: '专业版', slug: 'iflytek-pro', status: 'on_sale', price_monthly: 39, price_yearly: null, currency: 'CNY', credits_5h: 1200, credits_weekly: 9000, credits_monthly: 18000, credits_unit: '次', model_count: 13, features_json: null, promo_text: null, affiliate_url: null, sort_order: 2, created_at: '2025-01-01', updated_at: '2025-01-01' },
  { id: 'p-13', vendor_id: 'v-3', category_id: 'cat-2', name: '高效版', slug: 'iflytek-efficient', status: 'on_sale', price_monthly: 199, price_yearly: null, currency: 'CNY', credits_5h: 6000, credits_weekly: 45000, credits_monthly: 90000, credits_unit: '次', model_count: 13, features_json: null, promo_text: null, affiliate_url: null, sort_order: 3, created_at: '2025-01-01', updated_at: '2025-01-01' },

  // 智谱
  { id: 'p-14', vendor_id: 'v-4', category_id: 'cat-2', name: 'Lite', slug: 'zhipu-lite', status: 'limited', price_monthly: 49, price_yearly: 39, currency: 'CNY', credits_5h: 80, credits_weekly: 400, credits_monthly: null, credits_unit: 'prompts', model_count: 4, features_json: null, promo_text: null, affiliate_url: null, sort_order: 1, created_at: '2025-01-01', updated_at: '2025-01-01' },
  { id: 'p-15', vendor_id: 'v-4', category_id: 'cat-2', name: 'Pro', slug: 'zhipu-pro', status: 'limited', price_monthly: 149, price_yearly: 119, currency: 'CNY', credits_5h: 400, credits_weekly: 2000, credits_monthly: null, credits_unit: 'prompts', model_count: 4, features_json: null, promo_text: null, affiliate_url: null, sort_order: 2, created_at: '2025-01-01', updated_at: '2025-01-01' },
  { id: 'p-16', vendor_id: 'v-4', category_id: 'cat-2', name: 'Max', slug: 'zhipu-max', status: 'limited', price_monthly: 469, price_yearly: 375, currency: 'CNY', credits_5h: 1600, credits_weekly: 8000, credits_monthly: null, credits_unit: 'prompts', model_count: 4, features_json: null, promo_text: null, affiliate_url: null, sort_order: 3, created_at: '2025-01-01', updated_at: '2025-01-01' },

  // 月之暗面
  { id: 'p-17', vendor_id: 'v-5', category_id: 'cat-4', name: 'Andante', slug: 'kimi-andante', status: 'on_sale', price_monthly: 49, price_yearly: 39, currency: 'CNY', credits_5h: null, credits_weekly: null, credits_monthly: 30, credits_unit: '次', model_count: 3, features_json: { note: '约30个Agent/月' }, promo_text: null, affiliate_url: null, sort_order: 1, created_at: '2025-01-01', updated_at: '2025-01-01' },
  { id: 'p-18', vendor_id: 'v-5', category_id: 'cat-4', name: 'Moderato', slug: 'kimi-moderato', status: 'on_sale', price_monthly: 99, price_yearly: 79, currency: 'CNY', credits_5h: null, credits_weekly: null, credits_monthly: 60, credits_unit: '次', model_count: 3, features_json: { note: '约60个Agent/月' }, promo_text: null, affiliate_url: null, sort_order: 2, created_at: '2025-01-01', updated_at: '2025-01-01' },
  { id: 'p-19', vendor_id: 'v-5', category_id: 'cat-4', name: 'Allegretto', slug: 'kimi-allegretto', status: 'on_sale', price_monthly: 199, price_yearly: 159, currency: 'CNY', credits_5h: null, credits_weekly: null, credits_monthly: 150, credits_unit: '次', model_count: 3, features_json: { note: '约150个Agent/月' }, promo_text: null, affiliate_url: null, sort_order: 3, created_at: '2025-01-01', updated_at: '2025-01-01' },
  { id: 'p-20', vendor_id: 'v-5', category_id: 'cat-4', name: 'Allegro', slug: 'kimi-allegro', status: 'on_sale', price_monthly: 699, price_yearly: 559, currency: 'CNY', credits_5h: null, credits_weekly: null, credits_monthly: 360, credits_unit: '次', model_count: 3, features_json: { note: '约360个Agent/月' }, promo_text: null, affiliate_url: null, sort_order: 4, created_at: '2025-01-01', updated_at: '2025-01-01' },

  // MiniMax
  { id: 'p-21', vendor_id: 'v-6', category_id: 'cat-1', name: 'Starter', slug: 'minimax-starter', status: 'on_sale', price_monthly: 29, price_yearly: null, currency: 'CNY', credits_5h: 600, credits_weekly: null, credits_monthly: null, credits_unit: '次', model_count: 3, features_json: null, promo_text: null, affiliate_url: null, sort_order: 1, created_at: '2025-01-01', updated_at: '2025-01-01' },
  { id: 'p-22', vendor_id: 'v-6', category_id: 'cat-1', name: 'Plus', slug: 'minimax-plus', status: 'on_sale', price_monthly: 49, price_yearly: 41, currency: 'CNY', credits_5h: 1500, credits_weekly: null, credits_monthly: null, credits_unit: '次', model_count: 4, features_json: null, promo_text: null, affiliate_url: null, sort_order: 2, created_at: '2025-01-01', updated_at: '2025-01-01' },
  { id: 'p-23', vendor_id: 'v-6', category_id: 'cat-1', name: 'Max', slug: 'minimax-max', status: 'on_sale', price_monthly: 119, price_yearly: 99, currency: 'CNY', credits_5h: 4500, credits_weekly: null, credits_monthly: null, credits_unit: '次', model_count: 6, features_json: null, promo_text: null, affiliate_url: null, sort_order: 3, created_at: '2025-01-01', updated_at: '2025-01-01' },

  // 百度千帆
  { id: 'p-24', vendor_id: 'v-7', category_id: 'cat-2', name: 'Lite', slug: 'baidu-lite', status: 'on_sale', price_monthly: 40, price_yearly: null, currency: 'CNY', credits_5h: 1200, credits_weekly: 9000, credits_monthly: 18000, credits_unit: '次', model_count: 7, features_json: null, promo_text: null, affiliate_url: null, sort_order: 1, created_at: '2025-01-01', updated_at: '2025-01-01' },
  { id: 'p-25', vendor_id: 'v-7', category_id: 'cat-2', name: 'Pro', slug: 'baidu-pro', status: 'on_sale', price_monthly: 200, price_yearly: null, currency: 'CNY', credits_5h: 6000, credits_weekly: 9000, credits_monthly: 90000, credits_unit: '次', model_count: 7, features_json: null, promo_text: null, affiliate_url: null, sort_order: 2, created_at: '2025-01-01', updated_at: '2025-01-01' },

  // 腾讯云
  { id: 'p-26', vendor_id: 'v-8', category_id: 'cat-1', name: '基础版', slug: 'tencent-basic', status: 'on_sale', price_monthly: 59, price_yearly: null, currency: 'CNY', credits_5h: null, credits_weekly: null, credits_monthly: 110, credits_unit: '亿Tokens', model_count: 6, features_json: null, promo_text: null, affiliate_url: null, sort_order: 1, created_at: '2025-01-01', updated_at: '2025-01-01' },
  { id: 'p-27', vendor_id: 'v-8', category_id: 'cat-1', name: 'Pro', slug: 'tencent-pro', status: 'on_sale', price_monthly: 329, price_yearly: null, currency: 'CNY', credits_5h: null, credits_weekly: null, credits_monthly: 380, credits_unit: '亿Tokens', model_count: 6, features_json: null, promo_text: null, affiliate_url: null, sort_order: 2, created_at: '2025-01-01', updated_at: '2025-01-01' },
  { id: 'p-28', vendor_id: 'v-8', category_id: 'cat-1', name: 'Max', slug: 'tencent-max', status: 'on_sale', price_monthly: 659, price_yearly: null, currency: 'CNY', credits_5h: null, credits_weekly: null, credits_monthly: 820, credits_unit: '亿Tokens', model_count: 6, features_json: null, promo_text: null, affiliate_url: null, sort_order: 3, created_at: '2025-01-01', updated_at: '2025-01-01' },

  // 阶跃星辰
  { id: 'p-29', vendor_id: 'v-9', category_id: 'cat-2', name: 'Flash Mini', slug: 'stepfun-flash-mini', status: 'on_sale', price_monthly: 9.9, price_yearly: null, currency: 'CNY', credits_5h: 300, credits_weekly: 2100, credits_monthly: 4200, credits_unit: '次', model_count: 4, features_json: null, promo_text: null, affiliate_url: null, sort_order: 1, created_at: '2025-01-01', updated_at: '2025-01-01' },
  { id: 'p-30', vendor_id: 'v-9', category_id: 'cat-2', name: 'Pro', slug: 'stepfun-pro', status: 'on_sale', price_monthly: 99, price_yearly: null, currency: 'CNY', credits_5h: 3000, credits_weekly: 21000, credits_monthly: 42000, credits_unit: '次', model_count: 8, features_json: null, promo_text: null, affiliate_url: null, sort_order: 2, created_at: '2025-01-01', updated_at: '2025-01-01' },

  // OpenCode
  { id: 'p-31', vendor_id: 'v-10', category_id: 'cat-2', name: 'Go', slug: 'opencode-go', status: 'on_sale', price_monthly: 72, price_yearly: null, currency: 'USD', credits_5h: 12, credits_weekly: 30, credits_monthly: 60, credits_unit: 'Credits', model_count: 15, features_json: null, promo_text: '首月', affiliate_url: null, sort_order: 1, created_at: '2025-01-01', updated_at: '2025-01-01' },

  // 小米 MiMo
  { id: 'p-32', vendor_id: 'v-11', category_id: 'cat-1', name: '基础版', slug: 'mimo-basic', status: 'on_sale', price_monthly: 29, price_yearly: null, currency: 'CNY', credits_5h: null, credits_weekly: null, credits_monthly: 500, credits_unit: 'Credits', model_count: 3, features_json: { note: '永久降价最高99%' }, promo_text: null, affiliate_url: null, sort_order: 1, created_at: '2025-01-01', updated_at: '2025-01-01' },
  { id: 'p-33', vendor_id: 'v-11', category_id: 'cat-1', name: '高级版', slug: 'mimo-advanced', status: 'on_sale', price_monthly: 99, price_yearly: null, currency: 'CNY', credits_5h: null, credits_weekly: null, credits_monthly: 2000, credits_unit: 'Credits', model_count: 5, features_json: null, promo_text: null, affiliate_url: null, sort_order: 2, created_at: '2025-01-01', updated_at: '2025-01-01' },

  // 优云智算
  { id: 'p-34', vendor_id: 'v-12', category_id: 'cat-2', name: 'Mini 迷你版', slug: 'youyun-mini', status: 'on_sale', price_monthly: 49, price_yearly: null, currency: 'CNY', credits_5h: 200, credits_weekly: 650, credits_monthly: 1900, credits_unit: '次', model_count: 5, features_json: null, promo_text: null, affiliate_url: null, sort_order: 1, created_at: '2025-01-01', updated_at: '2025-01-01' },
  { id: 'p-35', vendor_id: 'v-12', category_id: 'cat-2', name: 'Lite 入门版', slug: 'youyun-lite', status: 'on_sale', price_monthly: 99, price_yearly: null, currency: 'CNY', credits_5h: 400, credits_weekly: 1300, credits_monthly: 3800, credits_unit: '次', model_count: 5, features_json: null, promo_text: null, affiliate_url: null, sort_order: 2, created_at: '2025-01-01', updated_at: '2025-01-01' },
  { id: 'p-36', vendor_id: 'v-12', category_id: 'cat-2', name: 'Basic 基础版', slug: 'youyun-basic', status: 'on_sale', price_monthly: 199, price_yearly: null, currency: 'CNY', credits_5h: 800, credits_weekly: 2600, credits_monthly: 7600, credits_unit: '次', model_count: 5, features_json: null, promo_text: null, affiliate_url: null, sort_order: 3, created_at: '2025-01-01', updated_at: '2025-01-01' },
  { id: 'p-37', vendor_id: 'v-12', category_id: 'cat-2', name: 'Pro 增强版', slug: 'youyun-pro', status: 'on_sale', price_monthly: 499, price_yearly: null, currency: 'CNY', credits_5h: 2000, credits_weekly: 6500, credits_monthly: 19000, credits_unit: '次', model_count: 5, features_json: null, promo_text: null, affiliate_url: null, sort_order: 4, created_at: '2025-01-01', updated_at: '2025-01-01' },
]

export const mockAnnouncements: Announcement[] = [
  { id: 'a-1', content: '5月27日，小米 MiMo 大模型全面升级计费与套餐体系，永久降价最高 99%', date: '2026-05-27', is_active: true },
  { id: 'a-2', content: '5月22日，DeepSeek 宣布 DeepSeek-V4-Pro 2.5折优惠结束后永久转为2.5折价格', date: '2026-05-22', is_active: true },
  { id: 'a-3', content: '5月27日，OpenCode Go 订阅增加 Qwen3.7 Max 模型', date: '2026-05-27', is_active: true },
]
