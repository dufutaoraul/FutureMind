'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, MessageCircle, TreePine, Users, Shield } from 'lucide-react'
import GaiaDialog from '@/components/GaiaDialog'
import AuthModal from '@/components/AuthModal'
import { createClient } from '@/lib/supabase/client'

export default function Home() {
  const [showGaiaDialog, setShowGaiaDialog] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  // 确保只在客户端渲染
  useEffect(() => {
    setIsMounted(true)
    checkAdminStatus()
  }, [])

  // 检查管理员状态和登录状态
  const checkAdminStatus = async () => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      // 如果用户已登录
      if (user) {
        setIsLoggedIn(true)

        // 从profiles表查询role字段
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single()

        // 检查role字段是否为content_admin或content_editor
        // content_admin: 最高管理员权限
        // content_editor: 内容编辑权限
        const userRole = (profile as unknown as { role?: string })?.role
        if (userRole === 'content_admin' || userRole === 'content_editor') {
          setIsAdmin(true)
        }
      } else {
        setIsLoggedIn(false)
        setIsAdmin(false)
      }
    } catch (error) {
      console.error('检查管理员状态失败:', error)
      setIsLoggedIn(false)
      setIsAdmin(false)
    } finally {
      setLoading(false)
    }
  }

  // 处理"与盖亚对话"按钮点击
  const handleGaiaClick = () => {
    if (!isLoggedIn) {
      setShowAuthModal(true)
    } else {
      setShowGaiaDialog(true)
    }
  }

  // 处理"探索者联盟"按钮点击
  const handlePBLClick = () => {
    if (!isLoggedIn) {
      setShowAuthModal(true)
    } else {
      window.location.href = '/pbl'
    }
  }

  // 生成固定的粒子配置
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
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

      {/* Header with login/logout button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-8 right-8 z-20"
      >
        {isLoggedIn ? (
          <button
            onClick={async () => {
              const supabase = createClient()
              await supabase.auth.signOut()
              window.location.reload()
            }}
            className="px-6 py-2 bg-purple-600/20 border border-purple-400/50 rounded-full text-purple-300 hover:bg-purple-600/40 transition-all duration-300"
          >
            退出登录
          </button>
        ) : (
          <button
            onClick={() => setShowAuthModal(true)}
            className="px-6 py-2 bg-purple-600/20 border border-purple-400/50 rounded-full text-purple-300 hover:bg-purple-600/40 transition-all duration-300"
          >
            登录
          </button>
        )}
      </motion.div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center z-10 max-w-4xl mx-auto px-6"
      >
        {/* Logo and title */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <TreePine className="w-12 h-12 text-purple-400 mr-3" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              未来心灵学院
            </h1>
          </div>
          <p className="text-xl text-purple-200 font-light">
            Future Mind Institute
          </p>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg text-gray-300 mb-12 leading-relaxed"
        >
          一个面向后AGI时代的全球意识觉醒生态系统
          <br />
          <span className="text-purple-300">
            宇宙正在低语，你，准备好聆听了吗？
          </span>
        </motion.p>

        {/* Season announcement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-purple-500/30"
        >
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-yellow-400 mr-3" />
            <h2 className="text-2xl font-semibold text-white">
              第一季：声音的交响
            </h2>
          </div>
          <p className="text-gray-300 mb-6">
            一场关于声音、寂静与实相的旅程即将开启
          </p>
          <div className="text-sm text-purple-300">
            全球同步探索 • 意识觉醒之旅 • 与盖亚共创
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <button
            onClick={handleGaiaClick}
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
          >
            <MessageCircle className="w-5 h-5 inline mr-2" />
            与盖亚对话
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </button>

          <button
            onClick={handlePBLClick}
            className="group px-8 py-4 border-2 border-purple-400 rounded-full text-purple-300 font-semibold text-lg hover:bg-purple-400 hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            <Users className="w-5 h-5 inline mr-2" />
            探索者联盟
          </button>

          <button
            onClick={() => window.location.href = '/portal'}
            className="group px-8 py-4 border-2 border-green-400 rounded-full text-green-300 font-semibold text-lg hover:bg-green-400 hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            <TreePine className="w-5 h-5 inline mr-2" />
            个人门户
          </button>

          {/* 管理员入口 - 仅管理员可见 */}
          {isAdmin && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              onClick={() => window.location.href = '/admin/lessons'}
              className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 rounded-full text-white font-semibold text-lg hover:from-red-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
            >
              <Shield className="w-5 h-5 inline mr-2" />
              课程管理中心
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </motion.button>
          )}
        </motion.div>

        {/* Features preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
        >
          <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <TreePine className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">意识进化树</h3>
            <p className="text-gray-400 text-sm">可视化你的觉醒成长轨迹</p>
          </div>
          <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <Sparkles className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">主线剧情</h3>
            <p className="text-gray-400 text-sm">全球同步的探索之旅</p>
          </div>
          <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <MessageCircle className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">盖亚对话</h3>
            <p className="text-gray-400 text-sm">AI导师的个性化指导</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Gaia chat button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
        onClick={handleGaiaClick}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110 z-50"
      >
        <MessageCircle className="w-8 h-8 text-white" />
      </motion.button>

      {/* Gaia Dialog */}
      <GaiaDialog isOpen={showGaiaDialog} onClose={() => setShowGaiaDialog(false)} />

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  )
}
