import { createClient } from '@supabase/supabase-js'

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          consciousness_level: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          consciousness_level?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          consciousness_level?: number
          created_at?: string
          updated_at?: string
        }
      }
      seasons: {
        Row: {
          id: string
          title: string
          description: string
          start_date: string
          end_date: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          start_date: string
          end_date: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          start_date?: string
          end_date?: string
          is_active?: boolean
          created_at?: string
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          season_id: string
          current_day: number
          completed_tasks: string[]
          consciousness_growth: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          season_id: string
          current_day?: number
          completed_tasks?: string[]
          consciousness_growth?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          season_id?: string
          current_day?: number
          completed_tasks?: string[]
          consciousness_growth?: number
          created_at?: string
          updated_at?: string
        }
      }
      gaia_conversations: {
        Row: {
          id: string
          user_id: string
          messages: Record<string, unknown>[]
          title: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          messages?: Record<string, unknown>[]
          title?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          messages?: Record<string, unknown>[]
          title?: string
          created_at?: string
          updated_at?: string
        }
      }
      pbl_projects: {
        Row: {
          id: string
          title: string
          description: string | null
          season_id: string
          max_participants: number
          current_participants: number
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          season_id: string
          max_participants?: number
          current_participants?: number
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          season_id?: string
          max_participants?: number
          current_participants?: number
          status?: string
          created_at?: string
        }
      }
      project_participants: {
        Row: {
          id: string
          project_id: string
          user_id: string
          role: string
          joined_at: string
        }
        Insert: {
          id?: string
          project_id: string
          user_id: string
          role?: string
          joined_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          user_id?: string
          role?: string
          joined_at?: string
        }
      }
      insights: {
        Row: {
          id: string
          user_id: string
          title: string
          content: string
          summary: string | null
          tags: string[]
          visibility: string
          guild_id: string | null
          status: string
          likes_count: number
          comments_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          content: string
          summary?: string | null
          tags?: string[]
          visibility?: string
          guild_id?: string | null
          status?: string
          likes_count?: number
          comments_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          content?: string
          summary?: string | null
          tags?: string[]
          visibility?: string
          guild_id?: string | null
          status?: string
          likes_count?: number
          comments_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      domain_exploration: {
        Row: {
          id: string
          user_id: string
          domain_type: string
          depth_score: number
          breadth_score: number
          last_activity: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          domain_type: string
          depth_score?: number
          breadth_score?: number
          last_activity?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          domain_type?: string
          depth_score?: number
          breadth_score?: number
          last_activity?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

// 使用环境变量创建 Supabase 客户端，构建时允许缺失
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
)
