-- Sample data for MadeCare India application
-- This script populates the database with test data for development

-- Insert sample users
INSERT INTO users (full_name, email, phone, password_hash, gender, date_of_birth, location) VALUES
('John Doe', 'john@example.com', '+91 9876543210', '$2b$10$example_hash_1', 'male', '1985-06-15', 'Mumbai'),
('Jane Smith', 'jane@example.com', '+91 9876543211', '$2b$10$example_hash_2', 'female', '1990-03-22', 'Delhi'),
('Mike Johnson', 'mike@example.com', '+91 9876543212', '$2b$10$example_hash_3', 'male', '1978-11-08', 'Bangalore'),
('Sarah Wilson', 'sarah@example.com', '+91 9876543213', '$2b$10$example_hash_4', 'female', '1992-09-14', 'Chennai'),
('David Brown', 'david@example.com', '+91 9876543214', '$2b$10$example_hash_5', 'male', '1988-01-30', 'Pune');

-- Insert sample medicine schedules
INSERT INTO medicine_schedules (user_id, medicine_name, dosage, start_date, end_date, times_per_day, number_of_days) VALUES
((SELECT user_id FROM users WHERE email = 'john@example.com'), 'Vitamin D3', '1000 IU', '2024-01-01', '2024-01-30', '["08:00"]', 30),
((SELECT user_id FROM users WHERE email = 'john@example.com'), 'Omega-3', '500mg', '2024-01-01', '2024-01-30', '["12:00"]', 30),
((SELECT user_id FROM users WHERE email = 'john@example.com'), 'Multivitamin', '1 tablet', '2024-01-01', '2024-01-30', '["18:00"]', 30),
((SELECT user_id FROM users WHERE email = 'john@example.com'), 'Calcium', '600mg', '2024-01-01', '2024-01-30', '["21:00"]', 30),

((SELECT user_id FROM users WHERE email = 'jane@example.com'), 'Iron Supplement', '65mg', '2024-01-01', '2024-01-15', '["09:00", "21:00"]', 15),
((SELECT user_id FROM users WHERE email = 'jane@example.com'), 'Folic Acid', '400mcg', '2024-01-01', '2024-01-15', '["08:00"]', 15),

((SELECT user_id FROM users WHERE email = 'mike@example.com'), 'Blood Pressure Med', '10mg', '2024-01-01', '2024-03-01', '["07:00", "19:00"]', 60),
((SELECT user_id FROM users WHERE email = 'mike@example.com'), 'Cholesterol Med', '20mg', '2024-01-01', '2024-03-01', '["20:00"]', 60),
((SELECT user_id FROM users WHERE email = 'mike@example.com'), 'Aspirin', '81mg', '2024-01-01', '2024-03-01', '["08:00"]', 60),

((SELECT user_id FROM users WHERE email = 'sarah@example.com'), 'Antibiotic', '500mg', '2024-01-01', '2024-01-07', '["08:00", "14:00", "20:00"]', 7),
((SELECT user_id FROM users WHERE email = 'sarah@example.com'), 'Probiotic', '1 capsule', '2024-01-08', '2024-01-22', '["09:00"]', 14),

((SELECT user_id FROM users WHERE email = 'david@example.com'), 'Diabetes Med', '500mg', '2024-01-01', '2024-04-01', '["07:00", "19:00"]', 90),
((SELECT user_id FROM users WHERE email = 'david@example.com'), 'Vitamin B12', '1000mcg', '2024-01-01', '2024-04-01', '["08:00"]', 90);

-- Insert sample medicine logs
INSERT INTO medicine_logs (schedule_id, user_id, scheduled_time, taken_time, status) VALUES
-- John's logs for today
((SELECT schedule_id FROM medicine_schedules WHERE medicine_name = 'Vitamin D3' AND user_id = (SELECT user_id FROM users WHERE email = 'john@example.com')), 
 (SELECT user_id FROM users WHERE email = 'john@example.com'), 
 '2024-01-15 08:00:00', '2024-01-15 08:05:00', 'taken'),

((SELECT schedule_id FROM medicine_schedules WHERE medicine_name = 'Omega-3' AND user_id = (SELECT user_id FROM users WHERE email = 'john@example.com')), 
 (SELECT user_id FROM users WHERE email = 'john@example.com'), 
 '2024-01-15 12:00:00', '2024-01-15 12:10:00', 'taken'),

((SELECT schedule_id FROM medicine_schedules WHERE medicine_name = 'Multivitamin' AND user_id = (SELECT user_id FROM users WHERE email = 'john@example.com')), 
 (SELECT user_id FROM users WHERE email = 'john@example.com'), 
 '2024-01-15 18:00:00', NULL, 'pending'),

((SELECT schedule_id FROM medicine_schedules WHERE medicine_name = 'Calcium' AND user_id = (SELECT user_id FROM users WHERE email = 'john@example.com')), 
 (SELECT user_id FROM users WHERE email = 'john@example.com'), 
 '2024-01-15 21:00:00', NULL, 'pending');

-- Insert sample health articles
INSERT INTO health_articles (title, content, author, category, tags, is_published) VALUES
('The Importance of Taking Medicine on Time', 
 'Taking medications at the prescribed times is crucial for their effectiveness. Here are some tips to help you remember: 1. Set alarms on your phone, 2. Use a pill organizer, 3. Link medicine time to daily activities like meals...', 
 'Dr. Priya Sharma', 'Medication Management', 
 ARRAY['medicine', 'health', 'reminders'], true),

('Staying Hydrated: Why Water Matters', 
 'Proper hydration is essential for your body to function optimally. Water helps transport nutrients, regulate body temperature, and flush out toxins. Aim for 8-10 glasses of water daily...', 
 'Dr. Rajesh Kumar', 'General Health', 
 ARRAY['hydration', 'health', 'wellness'], true),

('Understanding Your Medication Side Effects', 
 'Every medication can have side effects. It''s important to understand what to expect and when to contact your doctor. Common side effects include nausea, dizziness, and fatigue...', 
 'Dr. Anita Patel', 'Medication Safety', 
 ARRAY['medicine', 'safety', 'side-effects'], true),

('Building Healthy Daily Habits', 
 'Small daily habits can make a big difference in your overall health. Start with simple changes like taking a 10-minute walk, eating one extra serving of vegetables, or practicing deep breathing...', 
 'Dr. Suresh Reddy', 'Lifestyle', 
 ARRAY['habits', 'lifestyle', 'wellness'], true);

-- Insert sample notifications
INSERT INTO notifications (user_id, title, message, type, scheduled_for) VALUES
((SELECT user_id FROM users WHERE email = 'john@example.com'), 
 'Medicine Reminder', 'Time to take your Multivitamin (1 tablet)', 'reminder', 
 '2024-01-15 18:00:00'),

((SELECT user_id FROM users WHERE email = 'john@example.com'), 
 'Medicine Reminder', 'Time to take your Calcium (600mg)', 'reminder', 
 '2024-01-15 21:00:00'),

((SELECT user_id FROM users WHERE email = 'jane@example.com'), 
 'Welcome to MadeCare!', 'Thank you for joining MadeCare India. Start by adding your first medicine schedule.', 'announcement', 
 '2024-01-20 10:00:00'),

((SELECT user_id FROM users WHERE email = 'mike@example.com'), 
 'Health Tip', 'Remember to check your blood pressure regularly and maintain a healthy diet.', 'alert', 
 '2024-01-15 09:00:00');

-- Update some users to inactive for testing
UPDATE users SET is_active = false WHERE email = 'mike@example.com';

COMMENT ON SCRIPT IS 'Sample data for development and testing purposes';
