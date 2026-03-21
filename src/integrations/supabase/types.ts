export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      admin_school_access: {
        Row: {
          admin_profile_id: string
          created_at: string
          id: string
          school_id: string
        }
        Insert: {
          admin_profile_id: string
          created_at?: string
          id?: string
          school_id: string
        }
        Update: {
          admin_profile_id?: string
          created_at?: string
          id?: string
          school_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_school_access_admin_profile_id_fkey"
            columns: ["admin_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_school_access_admin_profile_id_fkey"
            columns: ["admin_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_school_access_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      families: {
        Row: {
          admin_rate: number | null
          created_at: string
          dante_rate: number | null
          family_name: string
          has_package: boolean
          hourly_rate: number
          id: string
          sessions_remaining: number
          tutor_rate: number | null
          upfront_payment: number
        }
        Insert: {
          admin_rate?: number | null
          created_at?: string
          dante_rate?: number | null
          family_name: string
          has_package?: boolean
          hourly_rate?: number
          id?: string
          sessions_remaining?: number
          tutor_rate?: number | null
          upfront_payment?: number
        }
        Update: {
          admin_rate?: number | null
          created_at?: string
          dante_rate?: number | null
          family_name?: string
          has_package?: boolean
          hourly_rate?: number
          id?: string
          sessions_remaining?: number
          tutor_rate?: number | null
          upfront_payment?: number
        }
        Relationships: []
      }
      family_members: {
        Row: {
          created_at: string
          family_id: string
          hourly_rate: number | null
          id: string
          profile_id: string
          relationship_type: string
        }
        Insert: {
          created_at?: string
          family_id: string
          hourly_rate?: number | null
          id?: string
          profile_id: string
          relationship_type: string
        }
        Update: {
          created_at?: string
          family_id?: string
          hourly_rate?: number | null
          id?: string
          profile_id?: string
          relationship_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "family_members_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "families"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "family_members_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "family_members_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles_public"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          read_at: string | null
          recipient_id: string
          sender_id: string
          session_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          read_at?: string | null
          recipient_id: string
          sender_id: string
          session_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          read_at?: string | null
          recipient_id?: string
          sender_id?: string
          session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string
          created_at: string
          id: string
          is_read: boolean
          link: string | null
          profile_id: string
          title: string
          type: string
        }
        Insert: {
          body: string
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          profile_id: string
          title: string
          type: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          profile_id?: string
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles_public"
            referencedColumns: ["id"]
          },
        ]
      }
      outstanding_payments: {
        Row: {
          amount: number
          created_at: string
          duration_minutes: number
          family_id: string
          hourly_rate: number
          id: string
          paid_at: string | null
          session_id: string
          status: string
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          duration_minutes: number
          family_id: string
          hourly_rate: number
          id?: string
          paid_at?: string | null
          session_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          duration_minutes?: number
          family_id?: string
          hourly_rate?: number
          id?: string
          paid_at?: string | null
          session_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "outstanding_payments_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "families"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outstanding_payments_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: true
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          client_paid: boolean
          company_profit: number
          created_at: string
          id: string
          notes: string | null
          school_id: string | null
          session_date: string
          session_duration_minutes: number
          session_id: string | null
          session_rate: number
          status: Database["public"]["Enums"]["payment_status"]
          student_profile_id: string | null
          total_amount: number
          tutor_earnings: number
          tutor_id: string | null
          tutor_paid: boolean
          updated_at: string
        }
        Insert: {
          client_paid?: boolean
          company_profit: number
          created_at?: string
          id?: string
          notes?: string | null
          school_id?: string | null
          session_date: string
          session_duration_minutes: number
          session_id?: string | null
          session_rate: number
          status?: Database["public"]["Enums"]["payment_status"]
          student_profile_id?: string | null
          total_amount: number
          tutor_earnings: number
          tutor_id?: string | null
          tutor_paid?: boolean
          updated_at?: string
        }
        Update: {
          client_paid?: boolean
          company_profit?: number
          created_at?: string
          id?: string
          notes?: string | null
          school_id?: string | null
          session_date?: string
          session_duration_minutes?: number
          session_id?: string | null
          session_rate?: number
          status?: Database["public"]["Enums"]["payment_status"]
          student_profile_id?: string | null
          total_amount?: number
          tutor_earnings?: number
          tutor_id?: string | null
          tutor_paid?: boolean
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_student_profile_id_fkey"
            columns: ["student_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_student_profile_id_fkey"
            columns: ["student_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutors_public"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          auth_id: string
          avatar_url: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          is_active: boolean
          is_approved: boolean
          last_name: string
          onboarding_completed: boolean
          phone: string
          preferred_payment_method: string | null
          referred_by: string | null
          role: Database["public"]["Enums"]["user_role"]
          school_id: string | null
          updated_at: string
          venmo_username: string | null
          zelle_email: string | null
          zelle_phone: string | null
        }
        Insert: {
          auth_id: string
          avatar_url?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: string
          is_active?: boolean
          is_approved?: boolean
          last_name: string
          onboarding_completed?: boolean
          phone: string
          preferred_payment_method?: string | null
          referred_by?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          school_id?: string | null
          updated_at?: string
          venmo_username?: string | null
          zelle_email?: string | null
          zelle_phone?: string | null
        }
        Update: {
          auth_id?: string
          avatar_url?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          is_active?: boolean
          is_approved?: boolean
          last_name?: string
          onboarding_completed?: boolean
          phone?: string
          preferred_payment_method?: string | null
          referred_by?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          school_id?: string | null
          updated_at?: string
          venmo_username?: string | null
          zelle_email?: string | null
          zelle_phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      push_subscriptions: {
        Row: {
          auth: string
          created_at: string
          endpoint: string
          id: string
          p256dh: string
          profile_id: string
          updated_at: string
        }
        Insert: {
          auth: string
          created_at?: string
          endpoint: string
          id?: string
          p256dh: string
          profile_id: string
          updated_at?: string
        }
        Update: {
          auth?: string
          created_at?: string
          endpoint?: string
          id?: string
          p256dh?: string
          profile_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "push_subscriptions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "push_subscriptions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles_public"
            referencedColumns: ["id"]
          },
        ]
      }
      referrals: {
        Row: {
          created_at: string
          discount_applied_at: string | null
          id: string
          referred_email: string
          referred_name: string
          referred_profile_id: string | null
          referrer_profile_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          discount_applied_at?: string | null
          id?: string
          referred_email: string
          referred_name: string
          referred_profile_id?: string | null
          referrer_profile_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          discount_applied_at?: string | null
          id?: string
          referred_email?: string
          referred_name?: string
          referred_profile_id?: string | null
          referrer_profile_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "referrals_referred_profile_id_fkey"
            columns: ["referred_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_referred_profile_id_fkey"
            columns: ["referred_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_referrer_profile_id_fkey"
            columns: ["referrer_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_referrer_profile_id_fkey"
            columns: ["referrer_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles_public"
            referencedColumns: ["id"]
          },
        ]
      }
      schools: {
        Row: {
          address: string | null
          city: string | null
          created_at: string
          id: string
          name: string
          owner: string
          state: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string
          id?: string
          name: string
          owner?: string
          state?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string
          id?: string
          name?: string
          owner?: string
          state?: string | null
        }
        Relationships: []
      }
      session_change_request_comments: {
        Row: {
          change_request_id: string
          content: string | null
          created_at: string
          id: string
          profile_id: string
          proposed_end_time: string | null
          proposed_start_time: string | null
        }
        Insert: {
          change_request_id: string
          content?: string | null
          created_at?: string
          id?: string
          profile_id: string
          proposed_end_time?: string | null
          proposed_start_time?: string | null
        }
        Update: {
          change_request_id?: string
          content?: string | null
          created_at?: string
          id?: string
          profile_id?: string
          proposed_end_time?: string | null
          proposed_start_time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "session_change_request_comments_change_request_id_fkey"
            columns: ["change_request_id"]
            isOneToOne: false
            referencedRelation: "session_change_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      session_change_requests: {
        Row: {
          created_at: string
          id: string
          reason: string | null
          rejection_reason: string | null
          requested_by_profile_id: string
          requested_end_time: string | null
          requested_start_time: string | null
          reviewed_at: string | null
          reviewed_by_profile_id: string | null
          session_id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          reason?: string | null
          rejection_reason?: string | null
          requested_by_profile_id: string
          requested_end_time?: string | null
          requested_start_time?: string | null
          reviewed_at?: string | null
          reviewed_by_profile_id?: string | null
          session_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          reason?: string | null
          rejection_reason?: string | null
          requested_by_profile_id?: string
          requested_end_time?: string | null
          requested_start_time?: string | null
          reviewed_at?: string | null
          reviewed_by_profile_id?: string | null
          session_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_change_requests_requested_by_profile_id_fkey"
            columns: ["requested_by_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_change_requests_requested_by_profile_id_fkey"
            columns: ["requested_by_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_change_requests_reviewed_by_profile_id_fkey"
            columns: ["reviewed_by_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_change_requests_reviewed_by_profile_id_fkey"
            columns: ["reviewed_by_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_change_requests_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      session_discounts: {
        Row: {
          applied_by: string
          created_at: string
          discount_type: string
          discount_value: number
          id: string
          session_id: string
        }
        Insert: {
          applied_by: string
          created_at?: string
          discount_type: string
          discount_value: number
          id?: string
          session_id: string
        }
        Update: {
          applied_by?: string
          created_at?: string
          discount_type?: string
          discount_value?: number
          id?: string
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_discounts_applied_by_fkey"
            columns: ["applied_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_discounts_applied_by_fkey"
            columns: ["applied_by"]
            isOneToOne: false
            referencedRelation: "profiles_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_discounts_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: true
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      session_files: {
        Row: {
          created_at: string
          file_name: string
          file_size: number | null
          file_url: string
          id: string
          session_id: string
          uploaded_by_profile_id: string | null
        }
        Insert: {
          created_at?: string
          file_name: string
          file_size?: number | null
          file_url: string
          id?: string
          session_id: string
          uploaded_by_profile_id?: string | null
        }
        Update: {
          created_at?: string
          file_name?: string
          file_size?: number | null
          file_url?: string
          id?: string
          session_id?: string
          uploaded_by_profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "session_files_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_files_uploaded_by_profile_id_fkey"
            columns: ["uploaded_by_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_files_uploaded_by_profile_id_fkey"
            columns: ["uploaded_by_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles_public"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          created_at: string
          end_time: string
          ended_email_sent: boolean | null
          id: string
          is_recurring: boolean
          notes: string | null
          recurring_group_id: string | null
          reminder_10min_sent: boolean | null
          reminder_1day_sent: boolean | null
          reminder_1hour_sent: boolean | null
          reminder_24h_sent: boolean | null
          reminder_2day_sent: boolean | null
          school_id: string | null
          start_time: string
          starting_email_sent: boolean | null
          status: Database["public"]["Enums"]["session_status"]
          student_confirmed: boolean
          student_confirmed_at: string | null
          student_profile_id: string
          tutor_confirmed: boolean
          tutor_confirmed_at: string | null
          tutor_id: string
          tutor_summary: string | null
          updated_at: string
          video_room_id: string | null
        }
        Insert: {
          created_at?: string
          end_time: string
          ended_email_sent?: boolean | null
          id?: string
          is_recurring?: boolean
          notes?: string | null
          recurring_group_id?: string | null
          reminder_10min_sent?: boolean | null
          reminder_1day_sent?: boolean | null
          reminder_1hour_sent?: boolean | null
          reminder_24h_sent?: boolean | null
          reminder_2day_sent?: boolean | null
          school_id?: string | null
          start_time: string
          starting_email_sent?: boolean | null
          status?: Database["public"]["Enums"]["session_status"]
          student_confirmed?: boolean
          student_confirmed_at?: string | null
          student_profile_id: string
          tutor_confirmed?: boolean
          tutor_confirmed_at?: string | null
          tutor_id: string
          tutor_summary?: string | null
          updated_at?: string
          video_room_id?: string | null
        }
        Update: {
          created_at?: string
          end_time?: string
          ended_email_sent?: boolean | null
          id?: string
          is_recurring?: boolean
          notes?: string | null
          recurring_group_id?: string | null
          reminder_10min_sent?: boolean | null
          reminder_1day_sent?: boolean | null
          reminder_1hour_sent?: boolean | null
          reminder_24h_sent?: boolean | null
          reminder_2day_sent?: boolean | null
          school_id?: string | null
          start_time?: string
          starting_email_sent?: boolean | null
          status?: Database["public"]["Enums"]["session_status"]
          student_confirmed?: boolean
          student_confirmed_at?: string | null
          student_profile_id?: string
          tutor_confirmed?: boolean
          tutor_confirmed_at?: string | null
          tutor_id?: string
          tutor_summary?: string | null
          updated_at?: string
          video_room_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sessions_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_student_profile_id_fkey"
            columns: ["student_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_student_profile_id_fkey"
            columns: ["student_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutors_public"
            referencedColumns: ["id"]
          },
        ]
      }
      student_tutor_assignments: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          student_profile_id: string
          tutor_profile_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          student_profile_id: string
          tutor_profile_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          student_profile_id?: string
          tutor_profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_tutor_assignments_student_profile_id_fkey"
            columns: ["student_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_tutor_assignments_student_profile_id_fkey"
            columns: ["student_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_tutor_assignments_tutor_profile_id_fkey"
            columns: ["tutor_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_tutor_assignments_tutor_profile_id_fkey"
            columns: ["tutor_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles_public"
            referencedColumns: ["id"]
          },
        ]
      }
      tutor_applications: {
        Row: {
          act_score: number | null
          ap_fives_count: number | null
          availability_notes: string | null
          bio: string | null
          college: string | null
          created_at: string
          email: string
          first_name: string
          grade_levels: string[]
          high_school: string | null
          hourly_rate_preference: number | null
          id: string
          last_name: string
          linkedin_url: string | null
          major: string | null
          minor: string | null
          phone: string | null
          prior_experience: string | null
          profile_id: string | null
          rejection_reason: string | null
          resume_url: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          sat_score: number | null
          status: string
          subjects: string[]
          updated_at: string
        }
        Insert: {
          act_score?: number | null
          ap_fives_count?: number | null
          availability_notes?: string | null
          bio?: string | null
          college?: string | null
          created_at?: string
          email: string
          first_name: string
          grade_levels?: string[]
          high_school?: string | null
          hourly_rate_preference?: number | null
          id?: string
          last_name: string
          linkedin_url?: string | null
          major?: string | null
          minor?: string | null
          phone?: string | null
          prior_experience?: string | null
          profile_id?: string | null
          rejection_reason?: string | null
          resume_url?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          sat_score?: number | null
          status?: string
          subjects?: string[]
          updated_at?: string
        }
        Update: {
          act_score?: number | null
          ap_fives_count?: number | null
          availability_notes?: string | null
          bio?: string | null
          college?: string | null
          created_at?: string
          email?: string
          first_name?: string
          grade_levels?: string[]
          high_school?: string | null
          hourly_rate_preference?: number | null
          id?: string
          last_name?: string
          linkedin_url?: string | null
          major?: string | null
          minor?: string | null
          phone?: string | null
          prior_experience?: string | null
          profile_id?: string | null
          rejection_reason?: string | null
          resume_url?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          sat_score?: number | null
          status?: string
          subjects?: string[]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tutor_applications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tutor_applications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tutor_applications_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tutor_applications_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles_public"
            referencedColumns: ["id"]
          },
        ]
      }
      tutor_availability: {
        Row: {
          created_at: string
          day_of_week: Database["public"]["Enums"]["day_of_week"]
          effective_from: string | null
          effective_until: string | null
          end_time: string
          id: string
          is_recurring: boolean
          start_time: string
          tutor_id: string
        }
        Insert: {
          created_at?: string
          day_of_week: Database["public"]["Enums"]["day_of_week"]
          effective_from?: string | null
          effective_until?: string | null
          end_time: string
          id?: string
          is_recurring?: boolean
          start_time: string
          tutor_id: string
        }
        Update: {
          created_at?: string
          day_of_week?: Database["public"]["Enums"]["day_of_week"]
          effective_from?: string | null
          effective_until?: string | null
          end_time?: string
          id?: string
          is_recurring?: boolean
          start_time?: string
          tutor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tutor_availability_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tutor_availability_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutors_public"
            referencedColumns: ["id"]
          },
        ]
      }
      tutors: {
        Row: {
          bio: string | null
          commission_rate: number
          created_at: string
          hourly_rate: number
          id: string
          is_active: boolean
          profile_id: string
          school_id: string | null
          subjects: string[] | null
          updated_at: string
          w9_url: string | null
        }
        Insert: {
          bio?: string | null
          commission_rate?: number
          created_at?: string
          hourly_rate?: number
          id?: string
          is_active?: boolean
          profile_id: string
          school_id?: string | null
          subjects?: string[] | null
          updated_at?: string
          w9_url?: string | null
        }
        Update: {
          bio?: string | null
          commission_rate?: number
          created_at?: string
          hourly_rate?: number
          id?: string
          is_active?: boolean
          profile_id?: string
          school_id?: string | null
          subjects?: string[] | null
          updated_at?: string
          w9_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tutors_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tutors_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tutors_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      profiles_public: {
        Row: {
          avatar_url: string | null
          first_name: string | null
          id: string | null
          is_active: boolean | null
          is_approved: boolean | null
          last_name: string | null
          preferred_payment_method: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          school_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          first_name?: string | null
          id?: string | null
          is_active?: boolean | null
          is_approved?: boolean | null
          last_name?: string | null
          preferred_payment_method?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          school_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          first_name?: string | null
          id?: string | null
          is_active?: boolean | null
          is_approved?: boolean | null
          last_name?: string | null
          preferred_payment_method?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          school_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      tutors_public: {
        Row: {
          bio: string | null
          created_at: string | null
          hourly_rate: number | null
          id: string | null
          is_active: boolean | null
          profile_id: string | null
          school_id: string | null
          subjects: string[] | null
          updated_at: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          hourly_rate?: number | null
          id?: string | null
          is_active?: boolean | null
          profile_id?: string | null
          school_id?: string | null
          subjects?: string[] | null
          updated_at?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          hourly_rate?: number | null
          id?: string | null
          is_active?: boolean | null
          profile_id?: string | null
          school_id?: string | null
          subjects?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tutors_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tutors_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tutors_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      admin_has_school_access: {
        Args: { target_school_id: string }
        Returns: boolean
      }
      bootstrap_admin_ceo: { Args: never; Returns: undefined }
      can_message_for_session: {
        Args: { p_recipient_id: string; p_sender_id: string }
        Returns: boolean
      }
      can_see_student_profile: { Args: { target_id: string }; Returns: boolean }
      can_see_tutor_profile: { Args: { target_id: string }; Returns: boolean }
      can_view_profile: {
        Args: { target_profile_id: string }
        Returns: boolean
      }
      ensure_current_user_profile: { Args: never; Returns: string }
      get_current_profile: {
        Args: never
        Returns: {
          auth_id: string
          avatar_url: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          is_active: boolean
          is_approved: boolean
          last_name: string
          onboarding_completed: boolean
          phone: string
          preferred_payment_method: string | null
          referred_by: string | null
          role: Database["public"]["Enums"]["user_role"]
          school_id: string | null
          updated_at: string
          venmo_username: string | null
          zelle_email: string | null
          zelle_phone: string | null
        }
        SetofOptions: {
          from: "*"
          to: "profiles"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      get_current_user_role: {
        Args: never
        Returns: Database["public"]["Enums"]["user_role"]
      }
      get_family_member_profile_ids: { Args: never; Returns: string[] }
      get_tutor_blocked_slots: {
        Args: { p_end_date: string; p_start_date: string; p_tutor_id: string }
        Returns: {
          end_time: string
          start_time: string
        }[]
      }
      get_user_profile_id: { Args: never; Returns: string }
      get_user_role: {
        Args: never
        Returns: Database["public"]["Enums"]["user_role"]
      }
      is_admin_ceo: { Args: never; Returns: boolean }
      is_any_admin: { Args: never; Returns: boolean }
      is_family_member: { Args: { target_family_id: string }; Returns: boolean }
      is_family_member_for_session: {
        Args: { target_session_id: string }
        Returns: boolean
      }
      is_family_member_of_student: {
        Args: { target_student_id: string }
        Returns: boolean
      }
      is_tutor_for_session: {
        Args: { target_session_id: string }
        Returns: boolean
      }
      is_user_approved: { Args: never; Returns: boolean }
      parent_can_book_for_student: {
        Args: { target_student_id: string }
        Returns: boolean
      }
    }
    Enums: {
      day_of_week:
        | "monday"
        | "tuesday"
        | "wednesday"
        | "thursday"
        | "friday"
        | "saturday"
        | "sunday"
      payment_status: "pending" | "paid" | "refunded"
      session_status:
        | "scheduled"
        | "completed"
        | "cancelled"
        | "no_show"
        | "confirmed"
      user_role: "parent" | "student" | "tutor" | "admin_ceo" | "admin_limited"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      day_of_week: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ],
      payment_status: ["pending", "paid", "refunded"],
      session_status: [
        "scheduled",
        "completed",
        "cancelled",
        "no_show",
        "confirmed",
      ],
      user_role: ["parent", "student", "tutor", "admin_ceo", "admin_limited"],
    },
  },
} as const
