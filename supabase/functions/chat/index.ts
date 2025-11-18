import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_ANON_KEY') ?? ''
);

const tools = [
  {
    type: "function",
    function: {
      name: "get_sales_data",
      description: "Busca dados de vendas. Use para responder perguntas sobre vendas, produtos vendidos, valores de vendas. Aceita filtros de data.",
      parameters: {
        type: "object",
        properties: {
          limit: { type: "number", description: "Número máximo de registros (padrão 10)" },
          start_date: { type: "string", description: "Data inicial no formato YYYY-MM-DD (opcional)" },
          end_date: { type: "string", description: "Data final no formato YYYY-MM-DD (opcional)" },
          month: { type: "number", description: "Filtrar por mês (1-12, opcional)" },
          year: { type: "number", description: "Filtrar por ano (opcional)" }
        }
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_orders_data",
      description: "Busca dados de pedidos. Use para responder sobre pedidos, status de pedidos, clientes.",
      parameters: {
        type: "object",
        properties: {
          status: { type: "string", description: "Filtrar por status (opcional)" }
        }
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_service_orders",
      description: "Busca ordens de serviço. Use para informações sobre OS, técnicos, serviços.",
      parameters: {
        type: "object",
        properties: {
          status: { type: "string", description: "Filtrar por status (opcional)" }
        }
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_budgets",
      description: "Busca orçamentos. Use para informações sobre orçamentos, propostas, valores.",
      parameters: {
        type: "object",
        properties: {
          status: { type: "string", description: "Filtrar por status (opcional)" }
        }
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_expenses",
      description: "Busca despesas. Use para informações sobre gastos, contas a pagar.",
      parameters: {
        type: "object",
        properties: {
          status: { type: "string", description: "Filtrar por status (opcional)" }
        }
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_financial_overview",
      description: "Busca visão geral financeira com entradas, saídas e saldo.",
      parameters: {
        type: "object",
        properties: {}
      }
    }
  }
];

async function executeFunction(name: string, args: any) {
  console.log(`Executing function: ${name}`, args);
  
  try {
    switch (name) {
      case "get_sales_data": {
        let query = supabase.from('sales').select('*').order('date', { ascending: false });
        
        if (args.start_date) query = query.gte('date', args.start_date);
        if (args.end_date) query = query.lte('date', args.end_date);
        
        if (args.month && args.year) {
          const startDate = `${args.year}-${String(args.month).padStart(2, '0')}-01`;
          const endDate = new Date(args.year, args.month, 0).toISOString().split('T')[0];
          query = query.gte('date', startDate).lte('date', endDate);
        } else if (args.year) {
          query = query.gte('date', `${args.year}-01-01`).lte('date', `${args.year}-12-31`);
        }
        
        query = query.limit(args.limit || 100);
        const { data, error } = await query;
        if (error) throw error;
        
        return JSON.stringify({
          total_records: data.length,
          total_value: data.reduce((sum, sale) => sum + Number(sale.total_value), 0),
          sales: data
        });
      }
      
      case "get_orders_data": {
        let query = supabase.from('orders').select('*');
        if (args.status) query = query.eq('status', args.status);
        const { data, error } = await query;
        if (error) throw error;
        return JSON.stringify(data);
      }
      
      case "get_service_orders": {
        let query = supabase.from('service_orders').select('*');
        if (args.status) query = query.eq('status', args.status);
        const { data, error } = await query;
        if (error) throw error;
        return JSON.stringify(data);
      }
      
      case "get_budgets": {
        let query = supabase.from('budgets').select('*');
        if (args.status) query = query.eq('status', args.status);
        const { data, error } = await query;
        if (error) throw error;
        return JSON.stringify(data);
      }
      
      case "get_expenses": {
        let query = supabase.from('expenses').select('*');
        if (args.status) query = query.eq('status', args.status);
        const { data, error } = await query;
        if (error) throw error;
        return JSON.stringify(data);
      }
      
      case "get_financial_overview": {
        const { data, error } = await supabase
          .from('financial_overview')
          .select('*')
          .order('period_date', { ascending: false });
        if (error) throw error;
        return JSON.stringify(data);
      }
      
      default:
        return JSON.stringify({ error: "Função não encontrada" });
    }
  } catch (error) {
    console.error('Error executing function:', error);
    return JSON.stringify({ error: error.message });
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    let allMessages = [
      { 
        role: "system", 
        content: "Você é um assistente de dashboard financeiro. Responda perguntas sobre vendas, pedidos, orçamentos, despesas e finanças. Use as ferramentas disponíveis para buscar dados quando necessário. Responda sempre em português de forma clara e objetiva."
      },
      ...messages
    ];

    let shouldContinue = true;
    let encoder = new TextEncoder();
    
    const stream = new ReadableStream({
      async start(controller) {
        while (shouldContinue) {
          const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${LOVABLE_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "google/gemini-2.5-flash",
              messages: allMessages,
              tools: tools,
              stream: true,
            }),
          });

          if (!response.ok) {
            const error = await response.text();
            console.error("AI gateway error:", error);
            controller.close();
            return;
          }

          const reader = response.body?.getReader();
          if (!reader) {
            controller.close();
            return;
          }

          const decoder = new TextDecoder();
          let buffer = "";
          let toolCalls: any[] = [];

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (!line.trim() || line.startsWith(":")) continue;
              if (!line.startsWith("data: ")) continue;

              const data = line.slice(6).trim();
              if (data === "[DONE]") continue;

              try {
                const parsed = JSON.parse(data);
                const delta = parsed.choices?.[0]?.delta;
                
                if (delta?.tool_calls) {
                  for (const tc of delta.tool_calls) {
                    if (!toolCalls[tc.index]) {
                      toolCalls[tc.index] = { id: tc.id, name: "", arguments: "" };
                    }
                    if (tc.function?.name) toolCalls[tc.index].name = tc.function.name;
                    if (tc.function?.arguments) toolCalls[tc.index].arguments += tc.function.arguments;
                  }
                }

                if (delta?.content) {
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify(parsed)}\n\n`));
                }

                if (parsed.choices?.[0]?.finish_reason === "tool_calls") {
                  shouldContinue = true;
                  break;
                }

                if (parsed.choices?.[0]?.finish_reason === "stop") {
                  shouldContinue = false;
                }
              } catch (e) {
                console.error("Parse error:", e);
              }
            }
          }

          if (toolCalls.length > 0) {
            const toolMessages = [];
            
            for (const tc of toolCalls) {
              const args = JSON.parse(tc.arguments || "{}");
              const result = await executeFunction(tc.name, args);
              toolMessages.push({
                role: "tool",
                tool_call_id: tc.id,
                content: result
              });
            }

            allMessages.push({
              role: "assistant",
              tool_calls: toolCalls.map(tc => ({
                id: tc.id,
                type: "function",
                function: { name: tc.name, arguments: tc.arguments }
              }))
            });
            allMessages.push(...toolMessages);
          } else {
            shouldContinue = false;
          }
        }
        
        controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
        controller.close();
      }
    });

    return new Response(stream, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
