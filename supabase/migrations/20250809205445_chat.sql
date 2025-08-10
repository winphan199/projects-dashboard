-- Create the `chats` table
CREATE TABLE chats (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES auth.users (id) ON DELETE CASCADE,
  title text,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Create the `messages` table
CREATE TABLE messages (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  chat_id uuid REFERENCES chats (id) ON DELETE CASCADE,
  role text,
  content text,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Set up Row Level Security (RLS) policies for `chats`
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own chats." ON chats FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own chats." ON chats FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own chats." ON chats FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own chats." ON chats FOR DELETE USING (auth.uid() = user_id);

-- Set up RLS policies for `messages`
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view messages in their own chats." ON messages FOR SELECT USING (
  EXISTS ( SELECT 1 FROM chats WHERE chats.id = messages.chat_id AND chats.user_id = auth.uid() )
);
CREATE POLICY "Users can insert messages into their own chats." ON messages FOR INSERT WITH CHECK (
  EXISTS ( SELECT 1 FROM chats WHERE chats.id = messages.chat_id AND chats.user_id = auth.uid() )
);