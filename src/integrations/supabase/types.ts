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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      budgets: {
        Row: {
          budget_number: string
          client_name: string
          created_at: string | null
          description: string
          id: string
          status: string
          total_value: number
          valid_until: string
        }
        Insert: {
          budget_number: string
          client_name: string
          created_at?: string | null
          description: string
          id?: string
          status: string
          total_value: number
          valid_until: string
        }
        Update: {
          budget_number?: string
          client_name?: string
          created_at?: string | null
          description?: string
          id?: string
          status?: string
          total_value?: number
          valid_until?: string
        }
        Relationships: []
      }
      expenses: {
        Row: {
          amount: number
          category: string
          created_at: string | null
          description: string
          due_date: string
          id: string
          payment_method: string | null
          status: string
        }
        Insert: {
          amount: number
          category: string
          created_at?: string | null
          description: string
          due_date: string
          id?: string
          payment_method?: string | null
          status: string
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string | null
          description?: string
          due_date?: string
          id?: string
          payment_method?: string | null
          status?: string
        }
        Relationships: []
      }
      financial_overview: {
        Row: {
          balance: number
          created_at: string | null
          id: string
          inflow: number
          month: number
          outflow: number
          period_date: string
          year: number
        }
        Insert: {
          balance?: number
          created_at?: string | null
          id?: string
          inflow?: number
          month: number
          outflow?: number
          period_date: string
          year: number
        }
        Update: {
          balance?: number
          created_at?: string | null
          id?: string
          inflow?: number
          month?: number
          outflow?: number
          period_date?: string
          year?: number
        }
        Relationships: []
      }
      orders: {
        Row: {
          created_at: string | null
          customer_name: string
          due_date: string
          id: string
          order_number: string
          product_name: string
          quantity: number
          status: string
          total_value: number
        }
        Insert: {
          created_at?: string | null
          customer_name: string
          due_date: string
          id?: string
          order_number: string
          product_name: string
          quantity: number
          status: string
          total_value: number
        }
        Update: {
          created_at?: string | null
          customer_name?: string
          due_date?: string
          id?: string
          order_number?: string
          product_name?: string
          quantity?: number
          status?: string
          total_value?: number
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string
          created_at: string | null
          id: string
          name: string
          stock: number
          unit_price: number
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: string
          name: string
          stock?: number
          unit_price: number
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: string
          name?: string
          stock?: number
          unit_price?: number
        }
        Relationships: []
      }
      sales: {
        Row: {
          created_at: string | null
          date: string
          id: string
          payment_method: string
          product_name: string
          quantity: number
          seller: string
          status: string
          total_value: number
          unit_price: number
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: string
          payment_method: string
          product_name: string
          quantity: number
          seller: string
          status?: string
          total_value: number
          unit_price: number
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: string
          payment_method?: string
          product_name?: string
          quantity?: number
          seller?: string
          status?: string
          total_value?: number
          unit_price?: number
        }
        Relationships: []
      }
      service_orders: {
        Row: {
          client_name: string
          created_at: string | null
          due_date: string
          estimated_value: number | null
          id: string
          order_number: string
          priority: string
          service_type: string
          status: string
          technician: string
        }
        Insert: {
          client_name: string
          created_at?: string | null
          due_date: string
          estimated_value?: number | null
          id?: string
          order_number: string
          priority: string
          service_type: string
          status: string
          technician: string
        }
        Update: {
          client_name?: string
          created_at?: string | null
          due_date?: string
          estimated_value?: number | null
          id?: string
          order_number?: string
          priority?: string
          service_type?: string
          status?: string
          technician?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
