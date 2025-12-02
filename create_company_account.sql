-- SQL Query for Creating a Company Account
-- This includes insertions into both 'account' and 'company' tables
-- Industry choices can be found in: src/data/industry_categories.json

-- Note: Replace placeholders with actual values
-- company_id should be generated using nanoid (21 characters)
-- status_id: 7 = onboarding, 1 = active (pero default na sa 1 para active na agad)
-- role_id: 2 = company

START TRANSACTION;

-- Step 1: Insert into company table
INSERT INTO company (
    company_id,
    company_name,
    company_email,
    description,
    industry,                    -- Comma-separated industries from industry_categories.json
    city_municipality,
    barangay,
    telephone_number,
    phone_number,
    website,
    facebook_page,
    instagram_page,
    twitter_page,
    date_founded,
    mou_path,                    -- Partnership document paths
    loi_path,
    cp_path,
    business_permit_path,        -- Legal document paths
    mayor_permit_path,
    dti_permit_path,
    bir_cert_of_registration_path,
    company_image,
) VALUES (
    'GENERATED_NANOID_21CHARS',  -- (Search online for "nanoid generator" with 21 chars)
    'Sample Company Name',
    'company@example.com',
    'Company description here',
    'Information Technology,Business and Entrepreneurship',  -- Multiple industries separated by comma
    'Quezon City',
    'Barangay Sample',
    '02-1234567',                -- Optional
    '09123456789',
    'https://example.com',       -- Optional
    'https://facebook.com/page', -- Optional
    'https://instagram.com/page',-- Optional
    'https://twitter.com/page',  -- Optional
    '2020-01-15',                -- Date founded (YYYY-MM-DD)
    '/uploads/company/documents/mou.pdf',     -- Required (path lang to, pero yung actual file is nasa uploads folder)
    '/uploads/company/documents/loi.pdf',     -- Required (path lang to, pero yung actual file is nasa uploads folder)
    '/uploads/company/documents/cp.pdf',      -- Required (path lang to, pero yung actual file is nasa uploads folder)
    '/uploads/company/documents/business.pdf',-- Required (path lang to, pero yung actual file is nasa uploads folder)
    '/uploads/company/documents/mayor.pdf',   -- Required (path lang to, pero yung actual file is nasa uploads folder)
    '/uploads/company/documents/dti.pdf',     -- Required (path lang to, pero yung actual file is nasa uploads folder)
    '/uploads/company/documents/bir.pdf',     -- Required (path lang to, pero yung actual file is nasa uploads folder)
    '/uploads/company/profile/image.jpg',     -- (optional company image path)
);

-- Step 2: Insert into account table
INSERT INTO account (
    company_id,
    email,
    provider,
    status_id,                   -- 7 = onboarding, 1 = active (pero default na sa 1 para active na agad)
    role_id,                     -- 2 = company
) VALUES (
    'GENERATED_NANOID_21CHARS',  -- Same as company_id above
    'company@example.com',       -- Same as company_email
    'google-company',            -- (keep na lang to indicate Google OAuth for company)
    1,                           -- 1 to automatically activate account
    2,                           -- 2 = company role (DO NOT CHANGE)
);

-- Available industries (from industry_categories.json):
-- - Information Technology
-- - Business and Entrepreneurship
-- - Accounting and Finance
-- - Education and Training
-- - Industrial and Manufacturing Engineering
-- - Electronics and Electrical Engineering
-- - Information Systems and Business Technology
-- - Healthcare and Medical Services
-- - Hospitality and Tourism
-- - Retail and Consumer Services
-- - Media and Communications
-- - Construction and Civil Engineering
-- - Human Resources and Recruitment
-- - Logistics and Transportation
-- - Real Estate and Property Management
-- - Food and Beverage Industry
-- - Legal Services
-- - Arts and Creative Services
-- - Environmental Services
-- - Agriculture and Agribusiness
