-- Password reset tokens table
CREATE TABLE IF NOT EXISTS password_resets (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  expires_at TEXT NOT NULL,
  used INTEGER DEFAULT 0,
  created_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_password_resets_token ON password_resets(token);
CREATE INDEX idx_password_resets_user_id ON password_resets(user_id);
CREATE INDEX idx_password_resets_expires_at ON password_resets(expires_at);

-- Post media junction table
CREATE TABLE IF NOT EXISTS post_media (
  post_id TEXT NOT NULL,
  media_id TEXT NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (post_id, media_id),
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (media_id) REFERENCES media_files(id) ON DELETE CASCADE
);

CREATE INDEX idx_post_media_post_id ON post_media(post_id);
CREATE INDEX idx_post_media_media_id ON post_media(media_id);

-- Artist revenue tracking
CREATE TABLE IF NOT EXISTS artist_revenue (
  id TEXT PRIMARY KEY,
  artist_id TEXT NOT NULL,
  amount REAL NOT NULL,
  source TEXT NOT NULL,
  date TEXT NOT NULL,
  description TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT,
  FOREIGN KEY (artist_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_artist_revenue_artist_id ON artist_revenue(artist_id);
CREATE INDEX idx_artist_revenue_date ON artist_revenue(date);

-- Artist expenses tracking
CREATE TABLE IF NOT EXISTS artist_expenses (
  id TEXT PRIMARY KEY,
  artist_id TEXT NOT NULL,
  amount REAL NOT NULL,
  category TEXT NOT NULL,
  date TEXT NOT NULL,
  description TEXT,
  approved INTEGER DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT,
  FOREIGN KEY (artist_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_artist_expenses_artist_id ON artist_expenses(artist_id);
CREATE INDEX idx_artist_expenses_date ON artist_expenses(date);
CREATE INDEX idx_artist_expenses_approved ON artist_expenses(approved);