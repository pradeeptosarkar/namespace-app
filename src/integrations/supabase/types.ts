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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      admin_credentials: {
        Row: {
          created_at: string
          id: string
          password_hash: string
          username: string
        }
        Insert: {
          created_at?: string
          id?: string
          password_hash: string
          username: string
        }
        Update: {
          created_at?: string
          id?: string
          password_hash?: string
          username?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          approval_enabled: boolean | null
          banner_url: string | null
          contest_type: string | null
          created_at: string
          date: string
          description: string | null
          display_image_url: string | null
          duration: number | null
          eligibility: string | null
          end_date: string | null
          event_type: Database["public"]["Enums"]["event_type"]
          id: string
          judging_criteria: string | null
          max_participants: number | null
          mode: string | null
          name: string
          networking: string | null
          prerequisites: string | null
          prizes: string | null
          refreshments: string | null
          rules: string | null
          speaker: string | null
          speakers: string[] | null
          submission_format: string | null
          team_size: number | null
          tech_stack: string[] | null
          timezone: string | null
          topics: string[] | null
          updated_at: string
          venue: string
        }
        Insert: {
          approval_enabled?: boolean | null
          banner_url?: string | null
          contest_type?: string | null
          created_at?: string
          date: string
          description?: string | null
          display_image_url?: string | null
          duration?: number | null
          eligibility?: string | null
          end_date?: string | null
          event_type: Database["public"]["Enums"]["event_type"]
          id?: string
          judging_criteria?: string | null
          max_participants?: number | null
          mode?: string | null
          name: string
          networking?: string | null
          prerequisites?: string | null
          prizes?: string | null
          refreshments?: string | null
          rules?: string | null
          speaker?: string | null
          speakers?: string[] | null
          submission_format?: string | null
          team_size?: number | null
          tech_stack?: string[] | null
          timezone?: string | null
          topics?: string[] | null
          updated_at?: string
          venue: string
        }
        Update: {
          approval_enabled?: boolean | null
          banner_url?: string | null
          contest_type?: string | null
          created_at?: string
          date?: string
          description?: string | null
          display_image_url?: string | null
          duration?: number | null
          eligibility?: string | null
          end_date?: string | null
          event_type?: Database["public"]["Enums"]["event_type"]
          id?: string
          judging_criteria?: string | null
          max_participants?: number | null
          mode?: string | null
          name?: string
          networking?: string | null
          prerequisites?: string | null
          prizes?: string | null
          refreshments?: string | null
          rules?: string | null
          speaker?: string | null
          speakers?: string[] | null
          submission_format?: string | null
          team_size?: number | null
          tech_stack?: string[] | null
          timezone?: string | null
          topics?: string[] | null
          updated_at?: string
          venue?: string
        }
        Relationships: []
      }
      form_fields: {
        Row: {
          created_at: string
          field_type: Database["public"]["Enums"]["form_field_type"]
          form_id: string
          id: string
          label: string
          options: Json | null
          order_index: number
          placeholder: string | null
          required: boolean | null
        }
        Insert: {
          created_at?: string
          field_type: Database["public"]["Enums"]["form_field_type"]
          form_id: string
          id?: string
          label: string
          options?: Json | null
          order_index: number
          placeholder?: string | null
          required?: boolean | null
        }
        Update: {
          created_at?: string
          field_type?: Database["public"]["Enums"]["form_field_type"]
          form_id?: string
          id?: string
          label?: string
          options?: Json | null
          order_index?: number
          placeholder?: string | null
          required?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "form_fields_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
        ]
      }
      form_submissions: {
        Row: {
          form_id: string
          id: string
          submission_data: Json
          submitted_at: string
        }
        Insert: {
          form_id: string
          id?: string
          submission_data: Json
          submitted_at?: string
        }
        Update: {
          form_id?: string
          id?: string
          submission_data?: Json
          submitted_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "form_submissions_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
        ]
      }
      forms: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_published: boolean | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_published?: boolean | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_published?: boolean | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          college: string | null
          created_at: string
          date_of_birth: string | null
          degree: string | null
          email: string
          full_name: string | null
          github_url: string | null
          graduation_year: number | null
          id: string
          leetcode_url: string | null
          linkedin_url: string | null
          phone_number: string | null
          profile_completed: boolean | null
          skills: string[] | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          college?: string | null
          created_at?: string
          date_of_birth?: string | null
          degree?: string | null
          email: string
          full_name?: string | null
          github_url?: string | null
          graduation_year?: number | null
          id: string
          leetcode_url?: string | null
          linkedin_url?: string | null
          phone_number?: string | null
          profile_completed?: boolean | null
          skills?: string[] | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          college?: string | null
          created_at?: string
          date_of_birth?: string | null
          degree?: string | null
          email?: string
          full_name?: string | null
          github_url?: string | null
          graduation_year?: number | null
          id?: string
          leetcode_url?: string | null
          linkedin_url?: string | null
          phone_number?: string | null
          profile_completed?: boolean | null
          skills?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      registrations: {
        Row: {
          event_id: string
          id: string
          registered_at: string
          status: Database["public"]["Enums"]["registration_status"] | null
          user_id: string
          utm_source: string | null
        }
        Insert: {
          event_id: string
          id?: string
          registered_at?: string
          status?: Database["public"]["Enums"]["registration_status"] | null
          user_id: string
          utm_source?: string | null
        }
        Update: {
          event_id?: string
          id?: string
          registered_at?: string
          status?: Database["public"]["Enums"]["registration_status"] | null
          user_id?: string
          utm_source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "registration_leaderboard"
            referencedColumns: ["event_id"]
          },
        ]
      }
    }
    Views: {
      registration_leaderboard: {
        Row: {
          event_id: string | null
          event_name: string | null
          referral_count: number | null
          referrer_name: string | null
          utm_source: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      event_type: "webinar" | "hackathon" | "meetup" | "contest" | "bootcamp"
      form_field_type:
        | "text"
        | "email"
        | "number"
        | "textarea"
        | "radio"
        | "checkbox"
        | "select"
        | "date"
        | "time"
        | "file"
      registration_status: "pending" | "approved" | "rejected"
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
      event_type: ["webinar", "hackathon", "meetup", "contest", "bootcamp"],
      form_field_type: [
        "text",
        "email",
        "number",
        "textarea",
        "radio",
        "checkbox",
        "select",
        "date",
        "time",
        "file",
      ],
      registration_status: ["pending", "approved", "rejected"],
    },
  },
} as const
