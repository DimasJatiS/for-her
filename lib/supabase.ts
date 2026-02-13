import { createClient } from '@supabase/supabase-js';

// Supabase setup - minimal usage untuk quiz responses
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type untuk quiz response
export interface QuizResponse {
  id?: string;
  question: string;
  answer: string;
  question_id: number;
  created_at?: string;
}

// Helper function untuk save quiz response
export async function saveQuizResponse(questionId: number, question: string, answer: string) {
  try {
    const { data, error } = await supabase
      .from('responses')
      .insert([
        {
          question_id: questionId,
          question,
          answer,
        },
      ])
      .select();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    // Suppress error if using placeholder credentials
    if (!supabaseUrl.includes('placeholder')) {
      console.error('Error saving quiz response:', error);
    }
    return { success: false, error };
  }
}

// Get all responses
export async function getQuizResponses() {
  try {
    const { data, error } = await supabase
      .from('responses')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching responses:', error);
    return { success: false, error };
  }
}
