# SkillMatch

**SkillMatch** is a comprehensive web-based platform that connects OJT (On-the-Job Training) seekers with companies and employers. The platform enables students to create detailed profiles, showcase their skills, and apply for internship opportunities, while companies can post positions, manage applications, share updates, and conduct virtual interviews.

> ✅ **Status:** Core functionality complete | 🚧 Mobile responsiveness in progress

---

## 🌟 Features

### For Students (Applicants)
- **Authentication & Onboarding**
  - Google OAuth and email/password authentication
  - Multi-step onboarding process with profile creation
  - QCU student database integration for validation

- **Profile Management**
  - Comprehensive user profiles with personal information
  - Skills showcase (technical and soft skills)
  - Resume upload and management
  - Profile visibility controls (public/private)
  - OJT requirements tracking (hours, schedule, course)

- **Job Search & Applications**
  - Advanced job search with filters (location, skills, arrangement)
  - Intelligent skill matching with highlighted requirements
  - Course matching with visual indicators
  - Saved jobs and companies
  - Application tracking dashboard
  - Real-time application status updates

- **Communication**
  - In-app notification system
  - Application status notifications
  - Interview scheduling notifications
  - Offer notifications with response deadlines

- **Company Engagement**
  - Company profile viewing
  - Company feed posts
  - Post reactions (like, insightful, supportive, etc.)
  - Save companies and posts

### For Companies (Employers)
- **Account Management**
  - Company registration with document verification
  - Admin approval workflow
  - Company profile with rich information (industry, location, social links)
  - Cover images and branding

- **Job Posting**
  - Create and manage job postings
  - Detailed job descriptions with requirements
  - Skills and courses requirements specification
  - Work arrangement options (On-site, Hybrid, Remote)
  - Paid/unpaid internship designation
  - Position availability tracking

- **Application Management**
  - Centralized applicant dashboard
  - Application status tracking (Applied, Shortlisted, On Hold, Interview, Selected, etc.)
  - Applicant profile viewing
  - Resume downloads
  - Application filtering and sorting
  - Bulk status updates

- **Interview Scheduling**
  - Google Meet integration
  - Automated meeting link generation
  - Interview scheduling with date/time/type
  - Interview notes and reminders
  - Virtual and in-person interview types

- **Company Updates**
  - Create and publish company posts
  - Rich text content with cover images
  - Edit and delete posts
  - View post engagement metrics
  - Reaction tracking

- **Notifications**
  - Application received notifications
  - Status change tracking
  - Real-time updates

### For Administrators
- **User Management**
  - Admin dashboard
  - Company approval/rejection workflow
  - Rejection reason documentation
  - Account status management

- **System Oversight**
  - Job posting moderation
  - User account monitoring
  - System-wide notifications

---

## 🛠 Tech Stack

### Frontend
- **Framework:** Next.js 15.5 (App Router)
- **UI Library:** React 19.1
- **Styling:** Tailwind CSS with custom design system
- **Component Library:** Radix UI (Shadcn/ui)
- **Animations:** Framer Motion
- **State Management:** Zustand
- **Data Fetching:** TanStack React Query (v5)
- **Form Validation:** Zod schemas
- **Icons:** Lucide React
- **Notifications:** Sonner
- **Date Handling:** date-fns
- **Command Menu:** cmdk
- **Theme:** Next Themes (dark/light mode)

### Backend
- **Runtime:** Node.js
- **API:** Next.js API Routes
- **Database:** MySQL (Aiven Cloud)
- **Authentication:** NextAuth.js
- **Password Hashing:** bcrypt
- **HTTP Client:** Axios
- **Google Integration:** Google Meet API, Google Auth Library

### Development Tools
- **Language:** TypeScript
- **Linting:** ESLint
- **Package Manager:** npm
- **Version Control:** Git

### Deployment
- **Platform:** Vercel
- **Database:** Aiven MySQL (Cloud)
- **Environment:** Production and development configurations

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- MySQL database (local or cloud)
- Google OAuth credentials (for authentication)
- Google Meet API credentials (for virtual interviews)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mark-ianz/skillmatch.git
   cd skillmatch
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   Create a `.env` file in the root directory:
   ```env
   # Database
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=skillmatch
   DB_PORT=3306

   # NextAuth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret

   # Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_OAUTH_CLIENT_WEB_CREDENTIALS=your_oauth_credentials_json

   # Application
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Set up the database:**
   
   Import the database schema:
   ```bash
   # Use the provided SQL file
   mysql -u your_user -p skillmatch < docs/skillmatch_aiven.sql
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

   The app will be available at http://localhost:3000

### Building for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
SkillMatch/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication routes
│   │   ├── (site)/            # Main application routes
│   │   ├── api/               # API routes
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── auth/              # Authentication components
│   │   ├── common/            # Shared components
│   │   ├── global/            # Global layout components
│   │   ├── page_specific/     # Page-specific components
│   │   └── ui/                # UI component library
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility libraries
│   ├── schema/                # Zod validation schemas
│   ├── services/              # API service functions
│   ├── store/                 # Zustand state stores
│   └── types/                 # TypeScript type definitions
├── public/                    # Static assets
├── docs/                      # Documentation and SQL files
└── package.json              # Dependencies and scripts
```

---

## 🎯 Key Functionalities

### Intelligent Matching System
- **Skill Matching:** Automatically matches applicant skills with job requirements
- **Course Matching:** Highlights matching courses between applicants and job postings
- **Visual Indicators:** Green badges show matched requirements, helping both parties identify good fits

### Application Workflow
1. **Applied (Status 8)** - Initial application submission
2. **Shortlisted (Status 13)** - Company shows interest (no notification)
3. **On Hold (Status 14)** - Application pending review (no notification)
4. **Interview Scheduled (Status 9)** - Interview date/time set with Google Meet link
5. **Selected (Status 10)** - Applicant selected with offer deadline
6. **Offer Accepted (Status 11)** - Applicant accepts the offer
7. **Offer Declined (Status 12)** - Applicant declines the offer
8. **Rejected (Status 3)** - Application rejected with optional reason

### Notification System
- Filters notifications based on application status
- Real-time updates for critical status changes
- Email-like notification center with read/unread tracking
- Application-specific notifications with deep links

### Google Meet Integration
- Automatic meeting link generation
- OAuth-based authentication
- Meeting code extraction
- Interview scheduling with calendar integration

---

## 🔐 Security Features

- **Authentication:** NextAuth with multiple providers
- **Password Security:** bcrypt hashing
- **Session Management:** Secure session tokens
- **Role-based Access Control:** Admin, Company, Applicant roles
- **Status-based Authorization:** Active, Pending, Rejected, Disabled statuses
- **Input Validation:** Zod schemas for all forms
- **SQL Injection Prevention:** Parameterized queries
- **File Upload Security:** Controlled upload paths and validation

---

## 📊 Database Schema

The application uses 19 interconnected tables:
- **User Management:** user, account, admin, qcu_db
- **Profiles:** applicant_profile, company, onboarding
- **Job System:** job_posts, applications, status, role
- **Skills:** skill, soft_skill
- **Social Features:** company_posts, company_post_reactions, notifications
- **Saved Items:** saved_companies, saved_jobs, saved_posts

Full schema available in `docs/skillmatch_aiven.sql`

---

## 🚧 Remaining Work

- **Mobile Responsiveness:** Optimize layouts for mobile devices and tablets
- **Additional Polish:** Minor UI/UX refinements

---

## 📝 License

This project is part of an academic requirement for the subject **Systems Integration and Architecture 1** at Quezon City University.

---

## 👥 Contributors

- Mark Ian Bustillo - Lead Developer

---

## 📞 Support

For questions or issues, please contact:
- Email: bustillomarkian23@gmail.com
- GitHub: [@mark-ianz](https://github.com/mark-ianz)

---

**Last Updated:** December 11, 2025
