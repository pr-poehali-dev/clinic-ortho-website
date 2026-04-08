
CREATE TABLE t_p48876731_clinic_ortho_website.booking_specialists (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    specialty TEXT NOT NULL,
    specialty_type TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE t_p48876731_clinic_ortho_website.booking_schedules (
    id SERIAL PRIMARY KEY,
    specialist_id INTEGER NOT NULL,
    work_date DATE NOT NULL,
    start_time TIME NOT NULL DEFAULT '09:00',
    end_time TIME NOT NULL DEFAULT '19:00',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT now(),
    UNIQUE(specialist_id, work_date)
);

CREATE TABLE t_p48876731_clinic_ortho_website.booking_appointments (
    id SERIAL PRIMARY KEY,
    specialist_id INTEGER NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    duration_minutes INTEGER NOT NULL DEFAULT 40,
    patient_name TEXT NOT NULL,
    patient_phone TEXT NOT NULL,
    patient_comment TEXT DEFAULT '',
    notify_channel TEXT NOT NULL DEFAULT 'email',
    notify_contact TEXT DEFAULT '',
    status TEXT NOT NULL DEFAULT 'confirmed',
    cancel_token TEXT UNIQUE,
    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE t_p48876731_clinic_ortho_website.booking_blocked_slots (
    id SERIAL PRIMARY KEY,
    specialist_id INTEGER NOT NULL,
    block_date DATE NOT NULL,
    block_time TIME NOT NULL,
    reason TEXT DEFAULT '',
    created_at TIMESTAMP DEFAULT now()
);

INSERT INTO t_p48876731_clinic_ortho_website.booking_specialists (name, specialty, specialty_type) VALUES
('Дуйшеналиев Канатбек Дуйшеналиевич', 'Ортопед', 'doctor'),
('Буланбаев Бек Ардинатович', 'Ортопед', 'doctor'),
('Умарова Ксения Юрьевна', 'Невролог', 'doctor'),
('Беломытцев Евгений Михайлович', 'Массажист', 'masseur');
