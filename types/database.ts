export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

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
          role: 'user' | 'content_viewer' | 'content_editor' | 'content_admin' | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          consciousness_level?: number
          role?: 'user' | 'content_viewer' | 'content_editor' | 'content_admin' | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          consciousness_level?: number
          role?: 'user' | 'content_viewer' | 'content_editor' | 'content_admin' | null
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
          session_id: string | null
          messages: Record<string, unknown>[]
          title: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          session_id?: string | null
          messages?: Record<string, unknown>[]
          title?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          session_id?: string | null
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
      content_module: {
        Row: {
          id: string
          key: string
          title: string
          description: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          title: string
          description?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          title?: string
          description?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      content_item: {
        Row: {
          id: string
          module_id: string
          slug: string
          title: string
          summary: string | null
          default_locale: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          module_id: string
          slug: string
          title: string
          summary?: string | null
          default_locale?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          module_id?: string
          slug?: string
          title?: string
          summary?: string | null
          default_locale?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      video_links: {
        Row: {
          id: string
          title: string
          url: string
          platform: 'youtube' | 'bilibili' | 'other'
          description: string | null
          module_id: string | null
          item_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          url: string
          platform: 'youtube' | 'bilibili' | 'other'
          description?: string | null
          module_id?: string | null
          item_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          url?: string
          platform?: 'youtube' | 'bilibili' | 'other'
          description?: string | null
          module_id?: string | null
          item_id?: string | null
          created_at?: string
        }
      }
      media_resources: {
        Row: {
          id: string
          module_id: string | null
          item_id: string | null
          resource_type: 'video_link' | 'courseware' | 'link' | 'document'
          title: string
          url: string
          platform: string | null
          description: string | null
          meta: Json | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          module_id?: string | null
          item_id?: string | null
          resource_type: 'video_link' | 'courseware' | 'link' | 'document'
          title: string
          url: string
          platform?: string | null
          description?: string | null
          meta?: Json | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          module_id?: string | null
          item_id?: string | null
          resource_type?: 'video_link' | 'courseware' | 'link' | 'document'
          title?: string
          url?: string
          platform?: string | null
          description?: string | null
          meta?: Json | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
