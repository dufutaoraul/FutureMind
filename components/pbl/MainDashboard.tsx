"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ProjectExplorer } from './ProjectExplorer'
import { ProjectDetailModal } from './ProjectDetailModal'
import GaiaDialog from '@/components/GaiaDialog'
import { PBLProject, pblDataService } from '@/lib/pbl-data'
import { createClient } from '@/lib/supabase/client'
import {
  Compass,
  BookOpen,
  Users,
  Sparkles,
  LogOut,
  User,
  Zap,
  Home
} from 'lucide-react'

type ViewType = 'explore' | 'my-projects' | 'community' | 'demo' | 'profile'

export function MainDashboard() {
  const [currentView, setCurrentView] = useState<ViewType>('explore')
  const [selectedProject, setSelectedProject] = useState<PBLProject | null>(null)
  const [showProjectDetail, setShowProjectDetail] = useState(false)
  const [showGaiaDialog, setShowGaiaDialog] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isGuest, setIsGuest] = useState(true)
  const [loading, setLoading] = useState(true)

  // 检查认证状态
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const supabase = createClient()
      const { data: { user: authUser } } = await supabase.auth.getUser()

      if (authUser) {
        setUser({
          name: authUser.user_metadata?.name || authUser.email?.split('@')[0] || '探索者',
          email: authUser.email,
          consciousness_level: authUser.user_metadata?.consciousness_level || 0
        })
        setIsGuest(false)
      } else {
        setUser({
          name: '匿名探索者',
          email: 'guest@pbl.local',
          consciousness_level: 0
        })
        setIsGuest(true)
      }
    } catch (error) {
      console.error('检查认证状态失败:', error)
      setUser({
        name: '匿名探索者',
        email: 'guest@pbl.local',
        consciousness_level: 0
      })
      setIsGuest(true)
    } finally {
      setLoading(false)
    }
  }

  const handleProjectSelect = async (projectId: string) => {
    try {
      const project = await pblDataService.getProjectById(projectId)
      setSelectedProject(project)
      setShowProjectDetail(true)
      console.log('选中项目:', project)
    } catch (error) {
      console.error('加载项目详情失败:', error)
    }
  }

  const handleSignOut = async () => {
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      window.location.href = '/'
    } catch (error) {
      console.error('退出登录失败:', error)
    }
  }

  const handleDeleteProject = (project: PBLProject) => {
    console.log('删除项目:', project)
    // TODO: 实现实际的删除逻辑
    setShowProjectDetail(false)
  }

  const renderContent = () => {
    switch (currentView) {
      case 'explore':
        return <ProjectExplorer onProjectSelect={handleProjectSelect} />
      case 'my-projects':
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <BookOpen className="w-16 h-16 text-cosmic-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">我的项目</h3>
              <p className="text-cosmic-400">功能开发中...</p>
            </div>
          </div>
        )
      case 'community':
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Users className="w-16 h-16 text-cosmic-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">社区</h3>
              <p className="text-cosmic-400">功能开发中...</p>
            </div>
          </div>
        )
      case 'demo':
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Zap className="w-16 h-16 text-cosmic-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">功能演示</h3>
              <p className="text-cosmic-400">功能开发中...</p>
            </div>
          </div>
        )
      case 'profile':
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <User className="w-16 h-16 text-cosmic-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">个人资料</h3>
              <p className="text-cosmic-400">功能开发中...</p>
            </div>
          </div>
        )
      default:
        return <ProjectExplorer onProjectSelect={handleProjectSelect} />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <Sparkles className="w-12 h-12 text-primary-500 animate-pulse mx-auto mb-4" />
          <p className="text-cosmic-400">加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-black">
      {/* 侧边栏 */}
      <div className="w-64 bg-cosmic-800/50 backdrop-blur-sm border-r border-cosmic-700">
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 bg-gradient-cosmic rounded-full flex items-center justify-center mr-3">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white font-cosmic">探索者联盟</h1>
              <p className="text-xs text-cosmic-400">PBL学习平台</p>
            </div>
          </div>

          {/* 返回主页按钮 */}
          <Link
            href="/"
            className="w-full flex items-center px-4 py-3 rounded-lg text-cosmic-300 hover:bg-cosmic-700/50 hover:text-white transition-colors mb-6 border border-cosmic-700"
          >
            <Home className="w-5 h-5 mr-3" />
            返回主页
          </Link>

          {/* 用户信息 */}
          <div className="mb-8 p-4 bg-cosmic-700/30 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-cosmic rounded-full flex items-center justify-center mr-3">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user?.name || '探索者'}
                </p>
                <p className="text-xs text-cosmic-400 truncate">
                  {isGuest ? '游客模式' : user?.email}
                </p>
              </div>
            </div>
            {user?.consciousness_level !== undefined && (
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-cosmic-400 mb-1">
                  <span>意识等级</span>
                  <span>Lv.{user.consciousness_level}</span>
                </div>
                <div className="w-full bg-cosmic-800 rounded-full h-2">
                  <div
                    className="bg-gradient-cosmic h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(user.consciousness_level * 20, 100)}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* 导航菜单 */}
          <nav className="space-y-2">
            <button
              onClick={() => setCurrentView('explore')}
              className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                currentView === 'explore'
                  ? 'bg-primary-600/20 text-primary-300 border border-primary-500/30'
                  : 'text-cosmic-300 hover:bg-cosmic-700/50 hover:text-white'
              }`}
            >
              <Compass className="w-5 h-5 mr-3" />
              探索项目
            </button>

            <button
              onClick={() => setCurrentView('my-projects')}
              className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                currentView === 'my-projects'
                  ? 'bg-primary-600/20 text-primary-300 border border-primary-500/30'
                  : 'text-cosmic-300 hover:bg-cosmic-700/50 hover:text-white'
              }`}
            >
              <BookOpen className="w-5 h-5 mr-3" />
              我的项目
            </button>

            <button
              onClick={() => setCurrentView('community')}
              className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                currentView === 'community'
                  ? 'bg-primary-600/20 text-primary-300 border border-primary-500/30'
                  : 'text-cosmic-300 hover:bg-cosmic-700/50 hover:text-white'
              }`}
            >
              <Users className="w-5 h-5 mr-3" />
              社区
            </button>

            <button
              onClick={() => setCurrentView('demo')}
              className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                currentView === 'demo'
                  ? 'bg-primary-600/20 text-primary-300 border border-primary-500/30'
                  : 'text-cosmic-300 hover:bg-cosmic-700/50 hover:text-white'
              }`}
            >
              <Zap className="w-5 h-5 mr-3" />
              功能演示
            </button>

            <button
              onClick={() => setCurrentView('profile')}
              className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                currentView === 'profile'
                  ? 'bg-primary-600/20 text-primary-300 border border-primary-500/30'
                  : 'text-cosmic-300 hover:bg-cosmic-700/50 hover:text-white'
              }`}
            >
              <User className="w-5 h-5 mr-3" />
              个人资料
            </button>
          </nav>

          {/* 登出按钮 */}
          <div className="mt-8 pt-4 border-t border-cosmic-700">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center px-4 py-3 rounded-lg text-left text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3" />
              {isGuest ? '退出游客模式' : '退出登录'}
            </button>
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>

      {/* 塞娅AI助手 - 浮动按钮 */}
      <button
        onClick={() => setShowGaiaDialog(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-cosmic rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group z-40 hover:scale-110"
        aria-label="打开塞娅对话"
      >
        <Sparkles className="w-7 h-7 text-white group-hover:rotate-12 transition-transform" />
      </button>

      {/* 塞娅对话框 */}
      <GaiaDialog
        isOpen={showGaiaDialog}
        onClose={() => setShowGaiaDialog(false)}
      />

      {/* 项目详情模态框 */}
      <ProjectDetailModal
        isOpen={showProjectDetail}
        onClose={() => setShowProjectDetail(false)}
        project={selectedProject}
        onDelete={handleDeleteProject}
      />
    </div>
  )
}
