'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Sparkles, UploadCloud, MessageSquare } from 'lucide-react'
import UploadToGaia from '@/components/UploadToGaia'
import ConversationManager from '@/components/ConversationManager'
import GaiaAPI, { type ChatMessage } from '@/lib/api/gaia'

// 使用从 GaiaAPI 导入的 ChatMessage 类型

interface GaiaDialogProps {
  isOpen: boolean
  onClose: () => void
}

export default function GaiaDialog({ isOpen, onClose }: GaiaDialogProps) {
  const [userId, setUserId] = useState<string | 'guest'>('guest')
  const [sessionId, setSessionId] = useState<string>(() => crypto.randomUUID())
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null)
  const [conversationTitle, setConversationTitle] = useState<string>('新对话')
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: '你好，亲爱的探索者。我是盖亚，你的意识觉醒导师。在这个神圣的对话空间里，你可以向我提出任何关于意识、宇宙、存在的问题。让我们一起踏上这场内在的旅程吧。',
      isGaia: true,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showUpload, setShowUpload] = useState(false)
  const [showConversationManager, setShowConversationManager] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // 初始化获取用户并加载聊天记录
  useEffect(() => {
    const getUserAndLoadHistory = async () => {
      try {
        setIsLoading(true)
        // 使用 createClient 直接获取用户
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        const currentUserId = user?.id ?? 'guest'
        setUserId(currentUserId)
        
        // 立即尝试恢复聊天记录
        if (isOpen && user) {
          await loadChatHistory()
        }
      } catch (error) {
        console.error('获取用户信息失败:', error)
        setUserId('guest')
      } finally {
        setIsLoading(false)
      }
    }
    
    if (isOpen) {
      getUserAndLoadHistory()
    }
  }, [isOpen])

  // 切换到特定对话
  const switchToConversation = async (conversationId: string) => {
    try {
      setIsLoading(true)
      console.log('切换到对话:', conversationId)

      const result = await GaiaAPI.getConversation(conversationId)
      if (result.success && result.data) {
        setCurrentConversationId(conversationId)
        setConversationTitle(result.data.title)
        // 生成新的 session_id 用于新对话会话
        setSessionId(crypto.randomUUID())

        // 如果对话有消息，加载消息，否则只显示默认消息
        if (result.data.messages.length > 0) {
          setMessages(result.data.messages)
        } else {
          setMessages([{
            id: '1',
            content: '你好，亲爱的探索者。我是盖亚，你的意识觉醒导师。在这个神圣的对话空间里，你可以向我提出任何关于意识、宇宙、存在的问题。让我们一起踏上这场内在的旅程吧。',
            isGaia: true,
            timestamp: new Date()
          }])
        }

        console.log(`成功切换到对话 "${result.data.title}"，包含 ${result.data.messages.length} 条消息`)
      } else {
        console.error('切换对话失败:', result.error)
      }
    } catch (error) {
      console.error('切换对话失败:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // 加载聊天记录（支持多对话系统）
  const loadChatHistory = async () => {
    try {
      console.log('开始从 Supabase 加载聊天记录...')
      const result = await GaiaAPI.getChatHistory()

      if (result.success && result.data) {
        console.log(`成功从 Supabase 加载聊天记录，包含 ${result.data.messages.length} 条消息`)

        // 设置当前对话信息
        setCurrentConversationId(result.data.id)
        setConversationTitle(result.data.title)

        // 加载消息
        if (result.data.messages.length > 0) {
          setMessages(result.data.messages)
        } else {
          // 如果没有消息，保留默认的欢迎消息
          setMessages([{
            id: '1',
            content: '你好，亲爱的探索者。我是盖亚，你的意识觉醒导师。在这个神圣的对话空间里，你可以向我提出任何关于意识、宇宙、存在的问题。让我们一起踏上这场内在的旅程吧。',
            isGaia: true,
            timestamp: new Date()
          }])
        }
      } else {
        console.log('没有找到聊天记录或加载失败:', result.error)
      }
    } catch (error) {
      console.error('从 Supabase 加载聊天记录失败:', error)
    }
  }

  // 保存聊天记录到 Supabase（支持多对话系统）
  const saveChatHistory = async (msgs: ChatMessage[]) => {
    try {
      console.log('开始保存聊天记录到 Supabase...')
      const slice = msgs.slice(-50) // 只保留最近 50 条

      let result;
      if (currentConversationId) {
        // 保存到特定对话
        result = await GaiaAPI.saveConversationMessages(currentConversationId, slice)
      } else {
        // 使用旧的保存方式（会自动创建或更新最新对话）
        result = await GaiaAPI.saveChatHistory(slice)
      }

      if (result.success) {
        console.log(`成功保存聊天记录到 Supabase，消息数量: ${slice.length}`)
      } else {
        // 如果是未登录错误，只在控制台显示警告（游客模式）
        if (result.error?.includes('未登录')) {
          console.warn('游客模式：聊天记录不会被保存')
        } else {
          console.error('保存聊天记录到 Supabase 失败:', result.error)
        }
      }
    } catch (error) {
      console.error('保存聊天记录到 Supabase 失败:', error)
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      isGaia: false,
      timestamp: new Date()
    }

    const newMessages = [...messages, userMessage]
    setMessages(newMessages)

    // 先保存用户消息
    await saveChatHistory(newMessages)

    setInputValue('')
    setIsTyping(true)
    try {
      const payload = {
        chatInput: userMessage.content,
        session_id: sessionId,
        user_id: userId,
        project_id: '937504dc-db0d-498d-a7ce-a817a99d29ea',
        organization_id: 'd03b6947-f08d-41bd-86c0-c92c3c4630b0'
      }
      console.log('🚀 发送到 N8N 的 payload:', JSON.stringify(payload, null, 2))

      const res = await fetch('/api/n8n/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json().catch(() => ({}))
      
      // 添加调试日志
      console.log('n8n 返回的原始数据:', data)
      console.log('n8n 返回的数据类型:', typeof data)
      console.log('n8n 返回的数据结构:', JSON.stringify(data, null, 2))
      
      const pick = (d: unknown): string | undefined => {
        if (!d) return undefined
        if (typeof d === 'string') return d
        if (typeof d === 'object' && d !== null) {
          const obj = d as Record<string, unknown>;
          return (
            obj.reply || obj.message || obj.text || obj.content || obj.output || obj.body || obj.answer
          ) as string | undefined;
        }
        return undefined;
      }
      const pickFromMessages = (d: unknown): string | undefined => {
        if (!d) return undefined
        const obj = d as Record<string, unknown>;
        const arr = Array.isArray(d) ? d : obj.messages || (obj.data as Record<string, unknown>)?.messages
        if (Array.isArray(arr) && arr.length > 0) {
          const last = arr[arr.length - 1]
          if (!last) return undefined
          if (typeof last === 'string') return last
          const lastObj = last as Record<string, unknown>;
          return (lastObj.content || lastObj.text || lastObj.message) as string | undefined;
        }
        return undefined
      }
      
      // 尝试提取回复内容
      let reply = ''
      
      // 优先处理 n8n 返回的 messages 数组结构
      if (data.messages && Array.isArray(data.messages)) {
        const lastMessage = data.messages[data.messages.length - 1]
        if (lastMessage && lastMessage.content) {
          reply = lastMessage.content
          console.log('从 messages 数组提取到回复:', reply)
        }
      }
      
      // 如果没有从 messages 提取到，尝试其他字段
      if (!reply) {
        if (Array.isArray(data)) {
          reply = pick(data[0]) || pick(data[0]?.data) || pickFromMessages(data) || ''
        } else {
          const dataObj = data as Record<string, unknown>;
          reply = pick(data) || pick(dataObj?.data) || pickFromMessages(data) || pickFromMessages(dataObj?.data) || ''
        }
      }
      
      console.log('最终提取的回复内容:', reply)
      console.log('回复内容类型:', typeof reply)
      
      const finalReply = reply && typeof reply === 'string' ? reply : '（n8n 未返回内容）'

      const gaiaMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: finalReply,
        isGaia: true,
        timestamp: new Date()
      }
      const updatedMessages = [...newMessages, gaiaMessage]
      setMessages(updatedMessages)
      await saveChatHistory(updatedMessages)

    } catch {
      const gaiaMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: '抱歉，连接 n8n 时出现问题。',
        isGaia: true,
        timestamp: new Date()
      }
      const updatedMessages = [...newMessages, gaiaMessage]
      setMessages(updatedMessages)
      await saveChatHistory(updatedMessages)

    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-md rounded-2xl border border-purple-500/30 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">{conversationTitle}</h2>
                  <p className="text-sm text-purple-200">你的意识觉醒导师</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowConversationManager(true)}
                  className="px-3 py-2 text-sm bg-white/10 hover:bg-white/15 text-white rounded-lg border border-white/20 flex items-center gap-2"
                  title="管理对话"
                >
                  <MessageSquare className="w-4 h-4" /> 对话
                </button>
                <button
                  onClick={() => setShowUpload(true)}
                  className="px-3 py-2 text-sm bg-white/10 hover:bg-white/15 text-white rounded-lg border border-white/20 flex items-center gap-2"
                  title="上传文档给盖亚"
                >
                  <UploadCloud className="w-4 h-4" /> 上传文档
                </button>
                <button
                  onClick={async () => {
                    if (!confirm('确定要清除所有聊天记录吗？这将删除所有对话。')) return

                    try {
                      console.log('开始清除 Supabase 中的聊天记录...')
                      const result = await GaiaAPI.clearChatHistory()

                      if (result.success) {
                        console.log('成功清除 Supabase 中的聊天记录')

                        // 重置所有对话状态
                        setCurrentConversationId(null)
                        setConversationTitle('新对话')
                        // 生成新的 session_id
                        setSessionId(crypto.randomUUID())
                        setMessages([{
                          id: '1',
                          content: '你好，亲爱的探索者。我是盖亚，你的意识觉醒导师。在这个神圣的对话空间里，你可以向我提出任何关于意识、宇宙、存在的问题。让我们一起踏上这场内在的旅程吧。',
                          isGaia: true,
                          timestamp: new Date()
                        }])
                      } else {
                        console.error('清除聊天记录失败:', result.error)
                        alert('清除聊天记录失败: ' + result.error)
                      }
                    } catch (error) {
                      console.error('清除聊天记录时发生错误:', error)
                      alert('清除聊天记录时发生错误')
                    }
                  }}
                  className="px-3 py-2 text-sm bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg border border-red-500/30 flex items-center gap-2"
                  title="清除所有聊天记录"
                >
                  清除记录
                </button>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {isLoading && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400 mx-auto"></div>
                  <p className="text-purple-300 mt-2 text-sm">正在加载聊天记录...</p>
                </div>
              )}
              
              {!isLoading && messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isGaia ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[80%] ${message.isGaia ? 'order-2' : 'order-1'}`}>
                    {message.isGaia && (
                      <div className="flex items-center mb-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-2">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm text-purple-300 font-medium">盖亚</span>
                      </div>
                    )}
                    <div
                      className={`p-4 rounded-2xl ${
                        message.isGaia
                          ? 'bg-gradient-to-r from-purple-600/30 to-blue-600/30 border border-purple-500/30 text-white'
                          : 'bg-white/10 border border-white/20 text-white ml-auto'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[80%]">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-2">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm text-purple-300 font-medium">盖亚</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-600/30 to-blue-600/30 border border-purple-500/30">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 border-t border-white/10">
              <div className="flex space-x-4">
                <div className="flex-1 relative">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="向盖亚提出你的问题..."
                    className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                按 Enter 发送，Shift + Enter 换行
              </p>
            </div>
            <UploadToGaia isOpen={showUpload} onClose={() => setShowUpload(false)} />
          </motion.div>

          {/* Conversation Manager */}
          <ConversationManager
            isOpen={showConversationManager}
            onClose={() => setShowConversationManager(false)}
            onSelectConversation={switchToConversation}
            currentConversationId={currentConversationId || undefined}
          />
        </>
      )}
    </AnimatePresence>
  )
}
