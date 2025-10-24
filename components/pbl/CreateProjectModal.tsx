"use client"

import React, { useState } from 'react'
import { X, Plus, Brain, Zap, Palette, BookOpen } from 'lucide-react'

interface CreateProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (projectData: ProjectFormData) => void
  loading?: boolean
}

export interface ProjectFormData {
  title: string
  description: string
  category: 'consciousness' | 'science' | 'creative' | 'guidance'
  difficulty_level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  max_participants: number
  duration_weeks: number
  learning_objectives: string[]
  requirements: string[]
  tags: string[]
}

export function CreateProjectModal({ isOpen, onClose, onConfirm, loading = false }: CreateProjectModalProps) {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    category: 'consciousness',
    difficulty_level: 'beginner',
    max_participants: 8,
    duration_weeks: 8,
    learning_objectives: [''],
    requirements: [''],
    tags: []
  })
  const [tagInput, setTagInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.title.trim() && formData.description.trim()) {
      // 过滤空的学习目标和要求
      const cleanedData = {
        ...formData,
        learning_objectives: formData.learning_objectives.filter(obj => obj.trim()),
        requirements: formData.requirements.filter(req => req.trim())
      }
      onConfirm(cleanedData)
    }
  }

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      category: 'consciousness',
      difficulty_level: 'beginner',
      max_participants: 8,
      duration_weeks: 8,
      learning_objectives: [''],
      requirements: [''],
      tags: []
    })
    setTagInput('')
    onClose()
  }

  const addLearningObjective = () => {
    setFormData(prev => ({
      ...prev,
      learning_objectives: [...prev.learning_objectives, '']
    }))
  }

  const updateLearningObjective = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      learning_objectives: prev.learning_objectives.map((obj, i) => i === index ? value : obj)
    }))
  }

  const removeLearningObjective = (index: number) => {
    setFormData(prev => ({
      ...prev,
      learning_objectives: prev.learning_objectives.filter((_, i) => i !== index)
    }))
  }

  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }))
  }

  const updateRequirement = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.map((req, i) => i === index ? value : req)
    }))
  }

  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }))
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }))
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'consciousness':
        return <Brain className="w-5 h-5" />
      case 'science':
        return <Zap className="w-5 h-5" />
      case 'creative':
        return <Palette className="w-5 h-5" />
      case 'guidance':
        return <BookOpen className="w-5 h-5" />
      default:
        return <Brain className="w-5 h-5" />
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-cosmic-900 rounded-2xl border border-cosmic-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-4">
        <div className="p-6 border-b border-cosmic-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">创建探索项目</h2>
            <button
              onClick={handleClose}
              className="p-2 text-cosmic-400 hover:text-white transition-colors rounded-lg hover:bg-cosmic-800"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-cosmic-400 mt-2">设计一个引人入胜的探索项目，吸引志同道合的伙伴</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* 基本信息 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-cosmic-300 mb-2">
                项目标题 *
              </label>
              <input
                type="text"
                required
                className="input-cosmic w-full"
                placeholder="给你的项目起一个吸引人的名字..."
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                disabled={loading}
                autoFocus
              />
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-cosmic-300 mb-2">
                项目描述 *
              </label>
              <textarea
                required
                className="input-cosmic w-full resize-none"
                placeholder="详细描述你的项目，让其他探索者了解项目的魅力..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                disabled={loading}
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-cosmic-300 mb-2">
                项目分类 *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'consciousness', label: '意识探索', color: 'bg-resonance-600' },
                  { value: 'science', label: '科学研究', color: 'bg-blue-600' },
                  { value: 'creative', label: '创意实践', color: 'bg-purple-600' },
                  { value: 'guidance', label: '学习引导', color: 'bg-green-600' }
                ].map((category) => (
                  <button
                    key={category.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, category: category.value as any }))}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.category === category.value
                        ? `${category.color} border-white/30 text-white`
                        : 'bg-cosmic-800/50 border-cosmic-600 text-cosmic-300 hover:border-cosmic-500'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(category.value)}
                      <span className="text-sm font-medium">{category.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-cosmic-300 mb-2">
                难度等级 *
              </label>
              <select
                value={formData.difficulty_level}
                onChange={(e) => setFormData(prev => ({ ...prev, difficulty_level: e.target.value as any }))}
                className="input-cosmic w-full"
                disabled={loading}
              >
                <option value="beginner">初学者</option>
                <option value="intermediate">中级</option>
                <option value="advanced">高级</option>
                <option value="expert">专家</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-cosmic-300 mb-2">
                最大参与者数量
              </label>
              <input
                type="number"
                min="2"
                max="50"
                className="input-cosmic w-full"
                value={formData.max_participants}
                onChange={(e) => setFormData(prev => ({ ...prev, max_participants: parseInt(e.target.value) || 8 }))}
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-cosmic-300 mb-2">
                项目周期（周）
              </label>
              <input
                type="number"
                min="1"
                max="52"
                className="input-cosmic w-full"
                value={formData.duration_weeks}
                onChange={(e) => setFormData(prev => ({ ...prev, duration_weeks: parseInt(e.target.value) || 8 }))}
                disabled={loading}
              />
            </div>
          </div>

          {/* 学习目标 */}
          <div>
            <label className="block text-sm font-medium text-cosmic-300 mb-2">
              学习目标
            </label>
            <div className="space-y-2">
              {formData.learning_objectives.map((objective, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    className="input-cosmic flex-1"
                    placeholder="输入学习目标..."
                    value={objective}
                    onChange={(e) => updateLearningObjective(index, e.target.value)}
                    disabled={loading}
                  />
                  {formData.learning_objectives.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLearningObjective(index)}
                      className="p-2 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addLearningObjective}
                className="btn-cosmic-outline text-sm"
                disabled={loading}
              >
                <Plus className="w-4 h-4 mr-2 inline" />
                添加学习目标
              </button>
            </div>
          </div>

          {/* 参与要求 */}
          <div>
            <label className="block text-sm font-medium text-cosmic-300 mb-2">
              参与要求
            </label>
            <div className="space-y-2">
              {formData.requirements.map((requirement, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    className="input-cosmic flex-1"
                    placeholder="输入参与要求..."
                    value={requirement}
                    onChange={(e) => updateRequirement(index, e.target.value)}
                    disabled={loading}
                  />
                  {formData.requirements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRequirement(index)}
                      className="p-2 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addRequirement}
                className="btn-cosmic-outline text-sm"
                disabled={loading}
              >
                <Plus className="w-4 h-4 mr-2 inline" />
                添加参与要求
              </button>
            </div>
          </div>

          {/* 标签 */}
          <div>
            <label className="block text-sm font-medium text-cosmic-300 mb-2">
              项目标签
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                className="input-cosmic flex-1"
                placeholder="输入标签后按回车添加..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addTag()
                  }
                }}
                disabled={loading}
              />
              <button
                type="button"
                onClick={addTag}
                className="btn-cosmic-outline"
                disabled={loading}
              >
                添加
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary-600/20 text-primary-300 rounded-full text-sm border border-primary-500/30 flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-primary-400 hover:text-primary-300"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* 提交按钮 */}
          <div className="flex gap-4 pt-4 border-t border-cosmic-700">
            <button
              type="button"
              onClick={handleClose}
              className="btn-cosmic-outline flex-1"
              disabled={loading}
            >
              取消
            </button>
            <button
              type="submit"
              disabled={!formData.title.trim() || !formData.description.trim() || loading}
              className="btn-cosmic flex-1 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  创建项目
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
