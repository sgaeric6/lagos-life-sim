-- Players table
CREATE TABLE players (
  id SERIAL PRIMARY KEY,
  user_id UUID UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  display_name VARCHAR(100) NOT NULL,
  bio TEXT,
  avatar_style VARCHAR(50),
  current_district VARCHAR(100) DEFAULT 'Surulere',
  balance BIGINT DEFAULT 1000000,
  daily_income BIGINT DEFAULT 24000,
  energy INT DEFAULT 82,
  health INT DEFAULT 91,
  reputation INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Properties table
CREATE TABLE properties (
  id SERIAL PRIMARY KEY,
  player_id INT REFERENCES players(id) ON DELETE CASCADE,
  property_name VARCHAR(100) NOT NULL,
  location VARCHAR(100) NOT NULL,
  property_type VARCHAR(50),
  value BIGINT NOT NULL,
  purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  rental_income BIGINT DEFAULT 0,
  upgrades TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Businesses table
CREATE TABLE businesses (
  id SERIAL PRIMARY KEY,
  player_id INT REFERENCES players(id) ON DELETE CASCADE,
  business_name VARCHAR(100) NOT NULL,
  business_type VARCHAR(50),
  location VARCHAR(100) NOT NULL,
  monthly_revenue BIGINT DEFAULT 58000,
  employees INT DEFAULT 0,
  level INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bets table
CREATE TABLE bets (
  id SERIAL PRIMARY KEY,
  player_id INT REFERENCES players(id) ON DELETE CASCADE,
  bet_type VARCHAR(100) NOT NULL,
  stake_amount BIGINT NOT NULL,
  odds DECIMAL(5, 2) NOT NULL,
  potential_win BIGINT NOT NULL,
  result VARCHAR(20),
  settled_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Multiplayer rooms (chat rooms)
CREATE TABLE chat_rooms (
  id SERIAL PRIMARY KEY,
  room_name VARCHAR(100) NOT NULL,
  district VARCHAR(100),
  room_type VARCHAR(50),
  max_players INT DEFAULT 50,
  created_by INT REFERENCES players(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Chat messages
CREATE TABLE chat_messages (
  id SERIAL PRIMARY KEY,
  room_id INT REFERENCES chat_rooms(id) ON DELETE CASCADE,
  player_id INT REFERENCES players(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Friends/Social connections
CREATE TABLE friendships (
  id SERIAL PRIMARY KEY,
  player_id INT REFERENCES players(id) ON DELETE CASCADE,
  friend_id INT REFERENCES players(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(player_id, friend_id)
);

-- Social interactions (Kiss, Gift, Flirt, etc)
CREATE TABLE interactions (
  id SERIAL PRIMARY KEY,
  player_id INT REFERENCES players(id) ON DELETE CASCADE,
  target_player_id INT REFERENCES players(id) ON DELETE CASCADE,
  interaction_type VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_players_user_id ON players(user_id);
CREATE INDEX idx_players_district ON players(current_district);
CREATE INDEX idx_properties_player ON properties(player_id);
CREATE INDEX idx_businesses_player ON businesses(player_id);
CREATE INDEX idx_bets_player ON bets(player_id);
CREATE INDEX idx_chat_messages_room ON chat_messages(room_id);
CREATE INDEX idx_friendships_player ON friendships(player_id);
