'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Users, Search, Target, Zap, Globe, Heart, Lightbulb, MessageCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import GaiaDialog from '@/components/GaiaDialog'

interface PBLProject {
  id: string
  title: string
  description: string | null
  max_participants: number
  current_participants: number
  status: string
  created_at: string
}

export default function PBLPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [dbProjects, setDbProjects] = useState<PBLProject[]>([])
  const [selectedProject, setSelectedProject] = useState<PBLProject | null>(null)
  const [showProjectModal, setShowProjectModal] = useState(false)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [isJoining, setIsJoining] = useState(false)
  const [showGaiaDialog, setShowGaiaDialog] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const router = useRouter()
  const supabase = createClient()

  // Fix hydration error
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setIsAuthenticated(!!user)
        setCurrentUserId(user?.id || null)
      } catch (error) {
        console.error('检查认证状态失败:', error)
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [supabase])

  // 从数据库读取PBL项目
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('pbl_projects')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) {
          console.error('读取项目失败:', error)
          return
        }

        if (data && data.length > 0) {
          setDbProjects(data as PBLProject[])
        }
      } catch (error) {
        console.error('读取项目异常:', error)
      }
    }

    fetchProjects()
  }, [supabase])

  // Generate fixed particle configuration
  const particles = useMemo(() => {
    if (!isMounted) return []
    return [...Array(50)].map((_, i) => ({
      id: i,
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      duration: Math.random() * 3 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
    }))
  }, [isMounted])

  // 示例项目数据（当数据库没有数据时使用）
  const exampleProjects = [
    {
      id: 'example-1',
      title: '伊卡洛斯行动：声音与意识',
      description: '探索声音频率对人类意识的影响，通过实验验证声音疗愈的科学原理',
      max_participants: 20,
      current_participants: 12,
      status: 'active',
      created_at: '2025-01-15T00:00:00Z'
    },
    {
      id: 'example-2',
      title: '量子意识实验',
      description: '研究意识与量子场的互动关系，探索意识如何影响物质世界',
      max_participants: 15,
      current_participants: 8,
      status: 'active',
      created_at: '2025-01-10T00:00:00Z'
    },
    {
      id: 'example-3',
      title: '冥想神经科学',
      description: '使用脑电图技术研究冥想对大脑的影响，量化意识觉察的神经基础',
      max_participants: 20,
      current_participants: 15,
      status: 'active',
      created_at: '2025-01-05T00:00:00Z'
    }
  ]

  // 使用数据库数据或示例数据
  const projects = dbProjects.length > 0 ? dbProjects : exampleProjects

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-400 mx-auto"></div>
          <p className="text-purple-300 mt-4 text-lg">正在连接探索者网络...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {isMounted && particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-30"
            animate={{
              x: [0, particle.x],
              y: [0, particle.y],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
          />
        ))}
      </div>

      {/* 导航栏 */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 bg-white/5 backdrop-blur-md border-b border-white/10"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* 左侧：返回主页 */}
            <button
              onClick={() => router.push('/')}
              className="flex items-center space-x-2 text-purple-300 hover:text-purple-200 transition-colors duration-300 group"
            >
              <div className="w-8 h-8 bg-purple-600/20 rounded-full flex items-center justify-center group-hover:bg-purple-600/40 transition-colors duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </div>
              <span className="font-medium">返回主页</span>
            </button>

            {/* 中间：页面标题 */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-600/20 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">探索者联盟</h2>
            </div>

            {/* 右侧：个人门户 */}
            <button
              onClick={() => router.push('/portal')}
              className="flex items-center space-x-2 text-green-300 hover:text-green-200 transition-colors duration-300 group"
            >
              <span className="font-medium">个人门户</span>
              <div className="w-8 h-8 bg-green-600/20 rounded-full flex items-center justify-center group-hover:bg-green-600/40 transition-colors duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* 头部区域 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-blue-900/40"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-16">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-wide"
            >
              探索者联盟
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-purple-300/90 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              基于项目式学习(PBL)的深度协作空间，让志同道合的探索者汇聚一堂，
              共同揭开宇宙最深的秘密
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-5 justify-center items-center"
            >
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="group relative px-7 py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-102 shadow-lg hover:shadow-purple-500/20"
                  >
                    <Lightbulb className="w-5 h-5 inline mr-2" />
                    提交项目想法
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  </button>
                  <button
                    onClick={() => {
                      const projectsSection = document.getElementById('projects-section')
                      projectsSection?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="group px-7 py-3.5 border border-purple-400 rounded-full text-purple-300 font-medium text-lg hover:scale-102"
                  >
                    <Users className="w-5 h-5 inline mr-2" />
                    发现项目
                  </button>
                </>
              ) : (
                <div className="text-center">
                  <p className="text-purple-300/80 mb-4">登录后可以创建和加入PBL项目</p>
                  <button
                    onClick={() => router.push('/login?redirect=/pbl')}
                    className="group relative px-7 py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-102 shadow-lg hover:shadow-purple-500/20"
                  >
                    立即登录
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* 特色功能展示 */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="container mx-auto px-6 py-12 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center group">
            <div className="w-14 h-14 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-600/40 transition-colors duration-300">
              <Zap className="w-7 h-7 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">真实探索</h3>
            <p className="text-purple-200 text-sm">基于真实问题的项目式学习，让知识在实践中生根</p>
          </div>

          <div className="text-center group">
            <div className="w-14 h-14 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600/40 transition-colors duration-300">
              <Target className="w-7 h-7 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">跨学科融合</h3>
            <p className="text-blue-200 text-sm">打破学科边界，在多元视角中发现新的可能</p>
          </div>

          <div className="text-center group">
            <div className="w-14 h-14 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600/40 transition-colors duration-300">
              <Globe className="w-7 h-7 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">全球协作</h3>
            <p className="text-green-200 text-sm">与全球探索者实时协作，突破地理限制</p>
          </div>

          <div className="text-center group">
            <div className="w-14 h-14 bg-pink-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-pink-600/40 transition-colors duration-300">
              <Heart className="w-7 h-7 text-pink-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">成长记录</h3>
            <p className="text-pink-200 text-sm">完整记录探索历程，见证意识的成长轨迹</p>
          </div>
        </div>
      </motion.div>

      {/* 所有项目 */}
      <motion.div
        id="projects-section"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="container mx-auto px-6 py-12 relative z-10"
      >
        <div className="max-w-7xl mx-auto bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.25)] px-4 md:px-6 py-10 md:py-12">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              🚀 活跃的探索项目
            </h2>
            <p className="text-purple-200 text-base md:text-lg mb-6 md:mb-8">
              加入正在进行的PBL项目，与全球探索者一起解开宇宙之谜
            </p>

            {/* 搜索框 */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
              <input
                type="text"
                placeholder="搜索项目主题或名称..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-all duration-300"
              />
            </div>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-400/50 transition-all duration-300 group hover:bg-white/10"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'forming' ? 'bg-yellow-500/20 text-yellow-400' :
                      project.status === 'active' ? 'bg-green-500/20 text-green-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {project.status === 'forming' ? '正在组建' :
                       project.status === 'active' ? '进行中' : '已完成'}
                    </span>
                    <div className="flex items-center space-x-1 text-purple-300">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{project.current_participants}/{project.max_participants}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-purple-300 text-sm mb-4 line-clamp-3">
                    {project.description || '暂无描述'}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-purple-400">
                      {new Date(project.created_at).toLocaleDateString('zh-CN')}
                    </span>
                  </div>

                  {/* 查看详情按钮 */}
                  <button
                    onClick={() => {
                      setSelectedProject(project)
                      setShowProjectModal(true)
                    }}
                    className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-white text-sm font-medium transition-all duration-300 transform hover:scale-102"
                  >
                    查看详情
                  </button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">未找到匹配的项目</h3>
              <p className="text-purple-200 mb-6">
                {searchQuery ? '尝试调整搜索关键词，或者提交一个新的项目想法' : '目前还没有PBL项目，成为第一个创建者吧！'}
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* 项目详情模态框 */}
      {showProjectModal && selectedProject && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setShowProjectModal(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl border border-purple-500/30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  selectedProject.status === 'active' ? 'bg-green-500/20 text-green-400' :
                  selectedProject.status === 'forming' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {selectedProject.status === 'active' ? '进行中' :
                   selectedProject.status === 'forming' ? '正在组建' : '已完成'}
                </span>
              </div>
              <button
                onClick={() => setShowProjectModal(false)}
                className="text-gray-400 hover:text-white transition-colors p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-purple-300 mb-2">项目简介</h3>
                <p className="text-gray-300 leading-relaxed">
                  {selectedProject.description || '暂无详细描述'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <Users className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-gray-400">参与人数</span>
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {selectedProject.current_participants} / {selectedProject.max_participants}
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm text-gray-400">创建时间</span>
                  </div>
                  <p className="text-lg font-semibold text-white">
                    {new Date(selectedProject.created_at).toLocaleDateString('zh-CN')}
                  </p>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-purple-300 mb-2">📋 项目特色</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span>跨学科协作，融合多元视角</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span>真实项目实践，深度探索学习</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span>全球探索者协作，突破地域限制</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-4">
                {isAuthenticated ? (
                  <button
                    onClick={async () => {
                      if (!currentUserId) return
                      setIsJoining(true)
                      try {
                        const { error } = await supabase
                          .from('project_participants')
                          .insert({
                            project_id: selectedProject.id,
                            user_id: currentUserId,
                            role: 'participant'
                          } as any)

                        if (error) {
                          if (error.code === '23505') {
                            alert('您已经加入了这个项目！')
                          } else {
                            console.error('加入项目失败:', error)
                            alert('加入项目失败，请稍后重试')
                          }
                        } else {
                          alert('成功加入项目！')
                          setShowProjectModal(false)
                          // 重新加载项目列表
                          const { data } = await supabase
                            .from('pbl_projects')
                            .select('*')
                            .order('created_at', { ascending: false })
                          if (data) setDbProjects(data as PBLProject[])
                        }
                      } catch (error) {
                        console.error('加入项目异常:', error)
                        alert('加入项目失败，请稍后重试')
                      } finally {
                        setIsJoining(false)
                      }
                    }}
                    disabled={isJoining}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-white font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isJoining ? '加入中...' : '🚀 加入项目'}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowProjectModal(false)
                      router.push('/login?redirect=/pbl')
                    }}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-white font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    登录后加入
                  </button>
                )}
                <button
                  onClick={() => setShowProjectModal(false)}
                  className="px-6 py-3 border border-gray-500 hover:border-gray-400 rounded-lg text-gray-300 hover:text-white font-semibold transition-all duration-300"
                >
                  关闭
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* 创建项目模态框 */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setShowCreateModal(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-3xl max-w-md w-full p-8 shadow-2xl border border-purple-500/30"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-white mb-6">✨ 提交项目想法</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">项目名称</label>
                <input
                  type="text"
                  placeholder="例如：伊卡洛斯行动"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">项目描述</label>
                <textarea
                  placeholder="描述你的项目想法..."
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                />
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => {
                    alert('项目想法提交功能开发中！请稍后再试。')
                    setShowCreateModal(false)
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-white font-semibold transition-all duration-300"
                >
                  提交
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-3 border border-gray-500 hover:border-gray-400 rounded-lg text-gray-300 hover:text-white font-semibold transition-all duration-300"
                >
                  取消
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* 盖亚浮动按钮 */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
        onClick={() => setShowGaiaDialog(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110 z-50"
      >
        <MessageCircle className="w-8 h-8 text-white" />
      </motion.button>

      {/* Gaia Dialog */}
      <GaiaDialog isOpen={showGaiaDialog} onClose={() => setShowGaiaDialog(false)} />
    </div>
  )
}
