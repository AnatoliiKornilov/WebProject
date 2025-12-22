export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          email: string
          full_name: string | null
          position: string | null
          bio: string | null
          avatar_url: string | null
          github_url: string | null
          gitlab_url: string | null
          phone: string | null
          birth_date: string | null
          experience: string | null
          education: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          email: string
          full_name?: string | null
          position?: string | null
          bio?: string | null
          avatar_url?: string | null
          github_url?: string | null
          gitlab_url?: string | null
          phone?: string | null
          birth_date?: string | null
          experience?: string | null
          education?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          email?: string
          full_name?: string | null
          position?: string | null
          bio?: string | null
          avatar_url?: string | null
          github_url?: string | null
          gitlab_url?: string | null
          phone?: string | null
          birth_date?: string | null
          experience?: string | null
          education?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          image_url: string | null
          technologies: string[]
          role: string
          demo_url: string | null
          code_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description: string
          image_url?: string | null
          technologies?: string[]
          role: string
          demo_url?: string | null
          code_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string
          image_url?: string | null
          technologies?: string[]
          role?: string
          demo_url?: string | null
          code_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
