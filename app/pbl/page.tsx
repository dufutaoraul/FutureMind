"use client"

import React, { useState } from 'react'
import { ProjectExplorer } from '@/components/pbl/ProjectExplorer'
import { FloatingGaia } from '@/components/pbl/FloatingGaia'
import { PBLProject, pblDataService } from '@/lib/pbl-data'

export default function PBLPage() {
  const [currentProject, setCurrentProject] = useState<PBLProject | null>(null)

  const handleProjectSelect = async (projectId: string) => {
    try {
      const project = await pblDataService.getProjectById(projectId)
      setCurrentProject(project)
      // 这里可以添加导航到项目详情页的逻辑
      console.log('选中项目:', project)
    } catch (error) {
      console.error('加载项目详情失败:', error)
    }
  }

  return (
    <div className="min-h-screen relative">
      {/* 项目浏览器 - 完全复制自PBL文件夹 */}
      <ProjectExplorer onProjectSelect={handleProjectSelect} />

      {/* 浮动的塞娅AI助手 - 唯一添加的功能 */}
      <FloatingGaia
        currentProject={currentProject || undefined}
        showProjectSelector={false}
        userName="探索者"
      />
    </div>
  )
}
