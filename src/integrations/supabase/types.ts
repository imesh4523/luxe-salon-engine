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
      bookings: {
        Row: {
          booking_date: string
          created_at: string
          customer_id: string
          end_time: string
          id: string
          notes: string | null
          platform_commission: number
          salon_id: string
          service_id: string
          staff_id: string
          start_time: string
          status: Database["public"]["Enums"]["booking_status"]
          total_amount: number
          updated_at: string
          vendor_payout: number
        }
        Insert: {
          booking_date: string
          created_at?: string
          customer_id: string
          end_time: string
          id?: string
          notes?: string | null
          platform_commission: number
          salon_id: string
          service_id: string
          staff_id: string
          start_time: string
          status?: Database["public"]["Enums"]["booking_status"]
          total_amount: number
          updated_at?: string
          vendor_payout: number
        }
        Update: {
          booking_date?: string
          created_at?: string
          customer_id?: string
          end_time?: string
          id?: string
          notes?: string | null
          platform_commission?: number
          salon_id?: string
          service_id?: string
          staff_id?: string
          start_time?: string
          status?: Database["public"]["Enums"]["booking_status"]
          total_amount?: number
          updated_at?: string
          vendor_payout?: number
        }
        Relationships: [
          {
            foreignKeyName: "bookings_salon_id_fkey"
            columns: ["salon_id"]
            isOneToOne: false
            referencedRelation: "salons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          booking_id: string
          comment: string | null
          created_at: string
          customer_id: string
          id: string
          rating: number
          salon_id: string
        }
        Insert: {
          booking_id: string
          comment?: string | null
          created_at?: string
          customer_id: string
          id?: string
          rating: number
          salon_id: string
        }
        Update: {
          booking_id?: string
          comment?: string | null
          created_at?: string
          customer_id?: string
          id?: string
          rating?: number
          salon_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: true
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_salon_id_fkey"
            columns: ["salon_id"]
            isOneToOne: false
            referencedRelation: "salons"
            referencedColumns: ["id"]
          },
        ]
      }
      salon_images: {
        Row: {
          created_at: string
          display_order: number | null
          id: string
          image_url: string
          salon_id: string
        }
        Insert: {
          created_at?: string
          display_order?: number | null
          id?: string
          image_url: string
          salon_id: string
        }
        Update: {
          created_at?: string
          display_order?: number | null
          id?: string
          image_url?: string
          salon_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "salon_images_salon_id_fkey"
            columns: ["salon_id"]
            isOneToOne: false
            referencedRelation: "salons"
            referencedColumns: ["id"]
          },
        ]
      }
      salons: {
        Row: {
          address: string
          city: string
          commission_rate: number | null
          cover_image: string | null
          created_at: string
          description: string | null
          email: string | null
          id: string
          latitude: number | null
          logo: string | null
          longitude: number | null
          name: string
          owner_id: string
          phone: string | null
          rating: number | null
          review_count: number | null
          status: Database["public"]["Enums"]["salon_status"]
          updated_at: string
        }
        Insert: {
          address: string
          city: string
          commission_rate?: number | null
          cover_image?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          id?: string
          latitude?: number | null
          logo?: string | null
          longitude?: number | null
          name: string
          owner_id: string
          phone?: string | null
          rating?: number | null
          review_count?: number | null
          status?: Database["public"]["Enums"]["salon_status"]
          updated_at?: string
        }
        Update: {
          address?: string
          city?: string
          commission_rate?: number | null
          cover_image?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          id?: string
          latitude?: number | null
          logo?: string | null
          longitude?: number | null
          name?: string
          owner_id?: string
          phone?: string | null
          rating?: number | null
          review_count?: number | null
          status?: Database["public"]["Enums"]["salon_status"]
          updated_at?: string
        }
        Relationships: []
      }
      service_categories: {
        Row: {
          created_at: string
          icon: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          icon?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          icon?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          category_id: string | null
          created_at: string
          description: string | null
          duration_minutes: number
          id: string
          is_active: boolean | null
          name: string
          price: number
          salon_id: string
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          duration_minutes?: number
          id?: string
          is_active?: boolean | null
          name: string
          price: number
          salon_id: string
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          duration_minutes?: number
          id?: string
          is_active?: boolean | null
          name?: string
          price?: number
          salon_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "services_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "services_salon_id_fkey"
            columns: ["salon_id"]
            isOneToOne: false
            referencedRelation: "salons"
            referencedColumns: ["id"]
          },
        ]
      }
      staff: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          id: string
          is_active: boolean | null
          name: string
          salon_id: string
          title: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          name: string
          salon_id: string
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          name?: string
          salon_id?: string
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "staff_salon_id_fkey"
            columns: ["salon_id"]
            isOneToOne: false
            referencedRelation: "salons"
            referencedColumns: ["id"]
          },
        ]
      }
      staff_availability: {
        Row: {
          day_of_week: Database["public"]["Enums"]["day_of_week"]
          end_time: string
          id: string
          is_available: boolean | null
          staff_id: string
          start_time: string
        }
        Insert: {
          day_of_week: Database["public"]["Enums"]["day_of_week"]
          end_time: string
          id?: string
          is_available?: boolean | null
          staff_id: string
          start_time: string
        }
        Update: {
          day_of_week?: Database["public"]["Enums"]["day_of_week"]
          end_time?: string
          id?: string
          is_available?: boolean | null
          staff_id?: string
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "staff_availability_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
        ]
      }
      staff_services: {
        Row: {
          id: string
          service_id: string
          staff_id: string
        }
        Insert: {
          id?: string
          service_id: string
          staff_id: string
        }
        Update: {
          id?: string
          service_id?: string
          staff_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "staff_services_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_services_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      owns_salon: {
        Args: { _salon_id: string; _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "customer" | "vendor" | "admin"
      booking_status:
        | "pending"
        | "confirmed"
        | "in_progress"
        | "completed"
        | "cancelled"
      day_of_week:
        | "monday"
        | "tuesday"
        | "wednesday"
        | "thursday"
        | "friday"
        | "saturday"
        | "sunday"
      salon_status: "pending" | "approved" | "rejected" | "suspended"
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
      app_role: ["customer", "vendor", "admin"],
      booking_status: [
        "pending",
        "confirmed",
        "in_progress",
        "completed",
        "cancelled",
      ],
      day_of_week: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ],
      salon_status: ["pending", "approved", "rejected", "suspended"],
    },
  },
} as const
