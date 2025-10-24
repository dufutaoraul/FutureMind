"use client"

import React, { useState, useEffect } from 'react'
import {
  Users, MessageCircle, Heart, Share2, Eye, Clock,
  Sparkles, Globe, Coffee, Search, Plus,
  BookOpen, Lightbulb, Target, Award
} from 'lucide-react'

// 社区数据类型
interface CommunityPost {
  id: string
  title: string
  content: string
  author: {
    id: string
    name: string
    avatar: string
    level: number
    badge: string
  }
  category: 'discussion' | 'insight' | 'question' | 'showcase' | 'collaboration'
  tags: string[]
  likes: number
  comments: number
  views: number
  isLiked: boolean
  createdAt: string
  projectName?: string
}

interface CommunityMember {
  id: string
  name: string
  avatar: string
  level: number
  badge: string
  speciality: string
  projects: number
  contributions: number
  isOnline: boolean
}

interface CommunityPageProps {
  isGuest: boolean
}

export function CommunityPage({ isGuest }: CommunityPageProps) {
  const [activeTab, setActiveTab] = useState<'feed' | 'members' | 'events'>('feed')
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [members, setMembers] = useState<CommunityMember[]>([])
  const [loading, setLoading] = useState(true)
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    loadCommunityData()
  }, [])

  const loadCommunityData = async () => {
    try {
      setLoading(true)

      // 模拟社区数据
      const mockPosts: CommunityPost[] = [
        {
          id: '1',
          title: '薛定谔的猫砂盆实验：我的宠物真的能感应到我的意念吗？',
          content: '参与"薛定谔的猫砂盆"项目已经3周了，今天的实验结果让我震惊！当我在办公室"决定"回家的瞬间，家里的摄像头显示我的猫立刻跑到门口等待。这不是巧合，我们用了严格的随机化设计...',
          author: {
            id: '1',
            name: '量子猫奴',
            avatar: '🐱',
            level: 6,
            badge: '科学探索者'
          },
          category: 'insight',
          tags: ['薛定谔的猫砂盆', '量子纠缠', '宠物感应', '实验设计'],
          likes: 89,
          comments: 34,
          views: 267,
          isLiked: false,
          createdAt: '2024-03-15T10:30:00Z',
          projectName: '薛定谔的猫砂盆：测试意念的非定域性'
        },
        {
          id: '2',
          title: '寻找"生物贝尔实验"项目的物理学背景伙伴',
          content: '我是哲学专业的学生，对意识与量子物理的关系非常感兴趣。现在想参与"生物贝尔实验"项目，但需要物理学背景的伙伴帮助理解贝尔不等式的数学推导。有没有愿意一起探索的小伙伴？',
          author: {
            id: '2',
            name: '哲学思辨者',
            avatar: '🤔',
            level: 4,
            badge: '跨界探索者'
          },
          category: 'collaboration',
          tags: ['生物贝尔实验', '量子物理', '哲学', '跨学科合作'],
          likes: 45,
          comments: 18,
          views: 134,
          isLiked: true,
          createdAt: '2024-03-14T15:45:00Z',
          projectName: '生物贝尔实验：量子纠缠在生命系统中的探索'
        },
        {
          id: '3',
          title: '小学生也能做科学研究？我6岁女儿的宠物观察日记',
          content: '参与"我的宠物的第六感日记"项目后，我女儿每天都兴奋地记录小仓鼠的行为。昨天她发现仓鼠总是在她心情不好的时候主动靠近，这让她开始思考"动物是不是能感受到人的情绪"。PBL真的能激发孩子的科学思维！',
          author: {
            id: '3',
            name: '科学妈妈',
            avatar: '👩‍👧',
            level: 3,
            badge: '家庭教育者'
          },
          category: 'showcase',
          tags: ['儿童科学', '宠物观察', '家庭教育', '科学启蒙'],
          likes: 67,
          comments: 29,
          views: 198,
          isLiked: false,
          createdAt: '2024-03-13T09:20:00Z',
          projectName: '我的宠物的第六感日记：小小探索者计划'
        },
        {
          id: '4',
          title: '伊卡洛斯计划的哲学思考：我们真的准备好挑战现实了吗？',
          content: '深度参与伊卡洛斯计划后，我开始质疑自己对现实的基本假设。如果意识真的能影响物质世界，如果量子纠缠真的存在于生物系统中，那我们的世界观需要彻底重构。这种认知冲击既令人兴奋又让人恐惧...',
          author: {
            id: '4',
            name: '现实质疑者',
            avatar: '🌌',
            level: 8,
            badge: '范式先锋'
          },
          category: 'discussion',
          tags: ['伊卡洛斯计划', '世界观', '认知革命', '哲学思辨'],
          likes: 156,
          comments: 78,
          views: 445,
          isLiked: true,
          createdAt: '2024-03-12T20:15:00Z'
        }
      ]

      const mockMembers: CommunityMember[] = [
        {
          id: '1',
          name: '量子猫奴',
          avatar: '🐱',
          level: 6,
          badge: '科学探索者',
          speciality: '动物行为与量子意识',
          projects: 3,
          contributions: 267,
          isOnline: true
        },
        {
          id: '2',
          name: '哲学思辨者',
          avatar: '🤔',
          level: 4,
          badge: '跨界探索者',
          speciality: '意识哲学与量子物理',
          projects: 2,
          contributions: 134,
          isOnline: true
        },
        {
          id: '3',
          name: '科学妈妈',
          avatar: '👩‍👧',
          level: 3,
          badge: '家庭教育者',
          speciality: '儿童科学启蒙',
          projects: 1,
          contributions: 198,
          isOnline: false
        },
        {
          id: '4',
          name: '现实质疑者',
          avatar: '🌌',
          level: 8,
          badge: '范式先锋',
          speciality: '认知革命与世界观重构',
          projects: 5,
          contributions: 445,
          isOnline: true
        },
        {
          id: '5',
          name: '实验设计师',
          avatar: '🔬',
          level: 7,
          badge: '方法论专家',
          speciality: '严谨实验设计',
          projects: 4,
          contributions: 312,
          isOnline: false
        },
        {
          id: '6',
          name: '数据分析侠',
          avatar: '📊',
          level: 5,
          badge: '统计学达人',
          speciality: '实验数据分析',
          projects: 6,
          contributions: 289,
          isOnline: true
        }
      ]

      setPosts(mockPosts)
      setMembers(mockMembers)

    } catch (error) {
      console.error('加载社区数据失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'discussion': return <MessageCircle className="w-4 h-4" />
      case 'insight': return <Lightbulb className="w-4 h-4" />
      case 'question': return <Target className="w-4 h-4" />
      case 'showcase': return <Award className="w-4 h-4" />
      case 'collaboration': return <Users className="w-4 h-4" />
      default: return <MessageCircle className="w-4 h-4" />
    }
  }

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'discussion': return '讨论'
      case 'insight': return '洞察'
      case 'question': return '提问'
      case 'showcase': return '展示'
      case 'collaboration': return '协作'
      default: return category
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'discussion': return 'text-blue-400 bg-blue-900/30'
      case 'insight': return 'text-yellow-400 bg-yellow-900/30'
      case 'question': return 'text-green-400 bg-green-900/30'
      case 'showcase': return 'text-purple-400 bg-purple-900/30'
      case 'collaboration': return 'text-pink-400 bg-pink-900/30'
      default: return 'text-cosmic-400 bg-cosmic-800/30'
    }
  }

  const filteredPosts = posts.filter(post => {
    const matchesCategory = filterCategory === 'all' || post.category === filterCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Users className="w-16 h-16 text-cosmic-500 mx-auto mb-4 animate-pulse" />
          <p className="text-cosmic-300">加载社区数据中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-auto p-6 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* 游客模式提示 */}
        {isGuest && (
          <div className="mb-6 bg-gradient-to-r from-primary-600/20 to-resonance-600/20 border border-primary-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-cosmic rounded-full flex items-center justify-center mr-3">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-medium">探索者社区</h3>
                  <p className="text-cosmic-300 text-sm">加入我们，与全球探索者一起探索意识边界</p>
                </div>
              </div>
              <button
                onClick={() => alert('注册功能开发中...')}
                className="bg-gradient-cosmic text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-all text-sm"
              >
                立即加入
              </button>
            </div>
          </div>
        )}

        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
            <Users className="w-8 h-8 mr-3 text-primary-400" />
            探索者社区
          </h1>
          <p className="text-cosmic-300">连接全球探索者，分享洞察，共同探索意识边界</p>
        </div>

        {/* 社区统计 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-cosmic-800/50 backdrop-blur-sm rounded-lg p-6 border border-cosmic-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-cosmic-400">PBL探索者</p>
                <p className="text-2xl font-bold text-white">342</p>
              </div>
              <Users className="w-8 h-8 text-primary-400" />
            </div>
            <p className="text-xs text-green-400 mt-2">↗ 本周 +18</p>
          </div>

          <div className="bg-cosmic-800/50 backdrop-blur-sm rounded-lg p-6 border border-cosmic-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-cosmic-400">实验分享</p>
                <p className="text-2xl font-bold text-white">89</p>
              </div>
              <MessageCircle className="w-8 h-8 text-blue-400" />
            </div>
            <p className="text-xs text-cosmic-500 mt-2">本周新增</p>
          </div>

          <div className="bg-cosmic-800/50 backdrop-blur-sm rounded-lg p-6 border border-cosmic-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-cosmic-400">科学洞察</p>
                <p className="text-2xl font-bold text-white">67</p>
              </div>
              <Lightbulb className="w-8 h-8 text-yellow-400" />
            </div>
            <p className="text-xs text-cosmic-500 mt-2">深度思考</p>
          </div>

          <div className="bg-cosmic-800/50 backdrop-blur-sm rounded-lg p-6 border border-cosmic-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-cosmic-400">活跃项目</p>
                <p className="text-2xl font-bold text-white">12</p>
              </div>
              <Target className="w-8 h-8 text-green-400" />
            </div>
            <p className="text-xs text-cosmic-500 mt-2">伊卡洛斯计划</p>
          </div>
        </div>

        {/* 导航标签 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex space-x-1 bg-cosmic-800/50 rounded-lg p-1">
              {[
                { key: 'feed', label: '动态', icon: <Globe className="w-4 h-4" /> },
                { key: 'members', label: '成员', icon: <Users className="w-4 h-4" /> },
                { key: 'events', label: '活动', icon: <Coffee className="w-4 h-4" /> }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.key
                      ? 'bg-primary-600/20 text-primary-300 border border-primary-500/30'
                      : 'text-cosmic-300 hover:text-white hover:bg-cosmic-700/50'
                  }`}
                >
                  {tab.icon}
                  <span className="ml-2">{tab.label}</span>
                </button>
              ))}
            </div>

            {!isGuest && (
              <button
                onClick={() => alert('发布动态功能开发中...')}
                className="bg-gradient-cosmic text-white px-4 py-2 rounded-lg hover:opacity-90 flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                发布动态
              </button>
            )}
          </div>

          {/* 动态内容 */}
          {activeTab === 'feed' && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* 左侧：筛选和搜索 */}
              <div className="lg:col-span-1">
                <div className="bg-cosmic-800/50 backdrop-blur-sm rounded-lg p-6 border border-cosmic-700 sticky top-6">
                  <h3 className="text-white font-semibold mb-4">筛选动态</h3>

                  {/* 搜索 */}
                  <div className="mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cosmic-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="搜索话题..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-cosmic-700/50 border border-cosmic-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-cosmic-400 text-sm"
                      />
                    </div>
                  </div>

                  {/* 分类筛选 */}
                  <div className="space-y-2">
                    <h4 className="text-cosmic-300 text-sm font-medium">分类</h4>
                    {[
                      { key: 'all', label: '全部', count: posts.length },
                      { key: 'discussion', label: '讨论', count: posts.filter(p => p.category === 'discussion').length },
                      { key: 'insight', label: '洞察', count: posts.filter(p => p.category === 'insight').length },
                      { key: 'collaboration', label: '协作', count: posts.filter(p => p.category === 'collaboration').length }
                    ].map(category => (
                      <button
                        key={category.key}
                        onClick={() => setFilterCategory(category.key)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                          filterCategory === category.key
                            ? 'bg-primary-600/20 text-primary-300'
                            : 'text-cosmic-300 hover:bg-cosmic-700/50 hover:text-white'
                        }`}
                      >
                        <span>{category.label}</span>
                        <span className="text-xs bg-cosmic-700 px-2 py-1 rounded-full">{category.count}</span>
                      </button>
                    ))}
                  </div>

                  {/* 热门标签 */}
                  <div className="mt-6">
                    <h4 className="text-cosmic-300 text-sm font-medium mb-3">热门标签</h4>
                    <div className="flex flex-wrap gap-2">
                      {['伊卡洛斯计划', '薛定谔的猫砂盆', '量子纠缠', '宠物感应', '实验设计', '儿童科学'].map(tag => (
                        <button
                          key={tag}
                          className="px-2 py-1 bg-cosmic-700/50 text-cosmic-300 rounded-full text-xs hover:bg-primary-600/20 hover:text-primary-300 transition-colors"
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 右侧：动态列表 */}
              <div className="lg:col-span-3">
                <div className="space-y-6">
                  {filteredPosts.map(post => (
                    <div key={post.id} className="bg-cosmic-800/50 backdrop-blur-sm rounded-lg border border-cosmic-700 hover:border-primary-500/50 transition-all duration-300">
                      <div className="p-6">
                        {/* 帖子头部 */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-cosmic rounded-full flex items-center justify-center mr-3">
                              <span className="text-lg">{post.author.avatar}</span>
                            </div>
                            <div>
                              <div className="flex items-center">
                                <h4 className="text-white font-medium">{post.author.name}</h4>
                                <span className="ml-2 px-2 py-1 bg-primary-600/20 text-primary-300 rounded-full text-xs">
                                  Lv.{post.author.level}
                                </span>
                                <span className="ml-2 px-2 py-1 bg-resonance-600/20 text-resonance-300 rounded-full text-xs">
                                  {post.author.badge}
                                </span>
                              </div>
                              <div className="flex items-center text-xs text-cosmic-400 mt-1">
                                <Clock className="w-3 h-3 mr-1" />
                                {new Date(post.createdAt).toLocaleDateString()}
                                {post.projectName && (
                                  <>
                                    <span className="mx-2">•</span>
                                    <BookOpen className="w-3 h-3 mr-1" />
                                    {post.projectName}
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                            {getCategoryIcon(post.category)}
                            <span className="ml-1">{getCategoryText(post.category)}</span>
                          </div>
                        </div>

                        {/* 帖子内容 */}
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold text-white mb-2">{post.title}</h3>
                          <p className="text-cosmic-300 text-sm leading-relaxed">{post.content}</p>
                        </div>

                        {/* 标签 */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-cosmic-700/50 text-cosmic-300 rounded-full text-xs">
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* 互动按钮 */}
                        <div className="flex items-center justify-between pt-4 border-t border-cosmic-700">
                          <div className="flex items-center space-x-4">
                            <button className={`flex items-center space-x-1 text-sm transition-colors ${
                              post.isLiked ? 'text-red-400' : 'text-cosmic-400 hover:text-red-400'
                            }`}>
                              <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                              <span>{post.likes}</span>
                            </button>
                            <button className="flex items-center space-x-1 text-sm text-cosmic-400 hover:text-blue-400 transition-colors">
                              <MessageCircle className="w-4 h-4" />
                              <span>{post.comments}</span>
                            </button>
                            <button className="flex items-center space-x-1 text-sm text-cosmic-400 hover:text-green-400 transition-colors">
                              <Share2 className="w-4 h-4" />
                              <span>分享</span>
                            </button>
                          </div>
                          <div className="flex items-center text-xs text-cosmic-500">
                            <Eye className="w-3 h-3 mr-1" />
                            {post.views} 次浏览
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 成员页面 */}
          {activeTab === 'members' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map(member => (
                <div key={member.id} className="bg-cosmic-800/50 backdrop-blur-sm rounded-lg border border-cosmic-700 hover:border-primary-500/50 transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-cosmic rounded-full flex items-center justify-center mr-4">
                          <span className="text-xl">{member.avatar}</span>
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-cosmic-800 ${
                          member.isOnline ? 'bg-green-500' : 'bg-gray-500'
                        }`}></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{member.name}</h3>
                        <p className="text-cosmic-300 text-sm">{member.speciality}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2 py-1 bg-primary-600/20 text-primary-300 rounded-full text-xs">
                        Lv.{member.level}
                      </span>
                      <span className="px-2 py-1 bg-resonance-600/20 text-resonance-300 rounded-full text-xs">
                        {member.badge}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-white">{member.projects}</div>
                        <div className="text-xs text-cosmic-400">项目</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-primary-400">{member.contributions}</div>
                        <div className="text-xs text-cosmic-400">贡献</div>
                      </div>
                    </div>

                    <button
                      onClick={() => alert(isGuest ? '请先注册登录' : '发起对话功能开发中...')}
                      className="w-full bg-cosmic-700/50 hover:bg-primary-600/20 text-cosmic-300 hover:text-primary-300 py-2 rounded-lg transition-colors text-sm"
                    >
                      {isGuest ? '注册后联系' : '发起对话'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 活动页面 */}
          {activeTab === 'events' && (
            <div className="text-center py-12">
              <Coffee className="w-16 h-16 mx-auto text-cosmic-400 mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">社区活动筹备中</h3>
              <p className="text-cosmic-400 mb-6">精彩的工作坊、研讨会和协作活动即将上线</p>
              <button
                onClick={() => alert('活动功能开发中...')}
                className="bg-gradient-cosmic text-white px-6 py-3 rounded-lg hover:opacity-90 font-medium"
              >
                {isGuest ? '注册参与活动' : '创建活动'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
