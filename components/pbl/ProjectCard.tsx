"use client"

import React from 'react'
import { PBLProject } from '@/lib/pbl-data'
import {
  Users,
  Clock,
  Star,
  Calendar,
  Target,
  Zap,
  Brain,
  Palette,
  BookOpen
} from 'lucide-react'

interface ProjectCardProps {
  project: PBLProject
  viewMode: 'grid' | 'list'
  onClick: () => void
}

export function ProjectCard({ project, viewMode, onClick }: ProjectCardProps) {
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
        return <Target className="w-5 h-5" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'consciousness':
        return 'bg-resonance-600'
      case 'science':
        return 'bg-blue-600'
      case 'creative':
        return 'bg-purple-600'
      case 'guidance':
        return 'bg-green-600'
      default:
        return 'bg-primary-600'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-400'
      case 'intermediate':
        return 'text-yellow-400'
      case 'advanced':
        return 'text-orange-400'
      case 'expert':
        return 'text-red-400'
      default:
        return 'text-cosmic-400'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'recruiting':
        return 'bg-green-600'
      case 'active':
        return 'bg-blue-600'
      case 'completed':
        return 'bg-cosmic-600'
      case 'paused':
        return 'bg-yellow-600'
      default:
        return 'bg-cosmic-600'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'recruiting':
        return '招募中'
      case 'active':
        return '进行中'
      case 'completed':
        return '已完成'
      case 'paused':
        return '暂停'
      default:
        return status
    }
  }

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return '初学者'
      case 'intermediate':
        return '中级'
      case 'advanced':
        return '高级'
      case 'expert':
        return '专家'
      default:
        return difficulty
    }
  }

  const participationRate = (project.current_participants / project.max_participants) * 100

  if (viewMode === 'list') {
    return (
      <div
        onClick={onClick}
        className="card-cosmic cursor-pointer hover:scale-[1.02] transition-all duration-300 p-6"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center mb-3">
              <div className={`w-10 h-10 ${getCategoryColor(project.category)} rounded-lg flex items-center justify-center text-white mr-4`}>
                {getCategoryIcon(project.category)}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{project.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-cosmic-400">
                  <span className={getDifficultyColor(project.difficulty_level)}>
                    {getDifficultyText(project.difficulty_level)}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {project.duration_weeks}周
                  </span>
                  <span className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {project.current_participants}/{project.max_participants}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-cosmic-300 text-sm mb-3 line-clamp-2">{project.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-cosmic-700/50 text-cosmic-300 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <span className={`px-3 py-1 ${getStatusColor(project.status)} text-white text-xs rounded-full`}>
                {getStatusText(project.status)}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={onClick}
      className="card-cosmic cursor-pointer hover:scale-105 transition-all duration-300 consciousness-wave"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${getCategoryColor(project.category)} rounded-xl flex items-center justify-center text-white`}>
          {getCategoryIcon(project.category)}
        </div>
        <span className={`px-3 py-1 ${getStatusColor(project.status)} text-white text-xs rounded-full`}>
          {getStatusText(project.status)}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">{project.title}</h3>
      <p className="text-cosmic-300 text-sm mb-4 line-clamp-3">{project.description}</p>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-cosmic-400">难度等级</span>
          <span className={`font-medium ${getDifficultyColor(project.difficulty_level)}`}>
            {getDifficultyText(project.difficulty_level)}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-cosmic-400">项目周期</span>
          <span className="text-white flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {project.duration_weeks}周
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-cosmic-400">参与者</span>
            <span className="text-white">
              {project.current_participants}/{project.max_participants}
            </span>
          </div>
          <div className="w-full bg-cosmic-700 rounded-full h-2">
            <div
              className="bg-gradient-cosmic h-2 rounded-full transition-all duration-300"
              style={{ width: `${participationRate}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.slice(0, 3).map((tag, index) => (
          <span key={index} className="px-2 py-1 bg-cosmic-700/50 text-cosmic-300 text-xs rounded-full">
            {tag}
          </span>
        ))}
        {project.tags.length > 3 && (
          <span className="px-2 py-1 bg-cosmic-700/50 text-cosmic-400 text-xs rounded-full">
            +{project.tags.length - 3}
          </span>
        )}
      </div>

      <button className="w-full btn-cosmic-outline text-sm py-2">
        {project.status === 'recruiting' ? '申请加入' : '查看详情'}
      </button>
    </div>
  )
}
