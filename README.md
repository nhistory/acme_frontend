# ACME Sports NFL Teams Dashboard

## Project Overview

This project is a full-stack web application that displays a dynamic list of NFL teams, built for ACME Sports. The application fetches NFL team data from a remote API and presents it in an organized, user-friendly interface.

- Desktop screenshot

![image](https://github.com/user-attachments/assets/ca876c04-4db5-4eb1-96ec-643b1f64b362)

- Mobile screenshop

![image (1)](https://github.com/user-attachments/assets/872b3b95-f672-4f63-88f8-d3d1154091ad)


## Technology Stack

### Frontend Technology Choices

1. Next.js

- SEO Optimization: Server-side rendering allows search engines to easily crawl content, enhancing SEO which is essential for ACME Sports' first website.
- Fast Initial Loading: Pre-rendered HTML from the server improves user experience.
- Automatic Code Splitting: Only loads necessary JavaScript, improving performance.
- Development Efficiency: Hot Module Replacement speeds up the development process.

2. Tailwind CSS

- Rapid Development: Class-based styling enables quick UI development and complements server-side rendering.
- Flexible Design System: Pre-defined utility classes make consistent design implementation easy.
- Minimal CSS: Only used classes are included in the bundle, resulting in smaller final bundle size.
- Responsive Design: Built-in responsive utilities make it easy to adapt to various screen sizes.
- Customizable: Easily extendable to match ACME Sports branding when necessary.

### Backend Technology Choices

1. Core Framework: FastAPI

- Performance-Focused: Supports asynchronous processing for high concurrency and fast response times, which is important for delivering NFL team data in real-time.
- Automated Documentation: Automatically generates OpenAPI specifications, facilitating collaboration with frontend teams and making it easy to explain API usage to ACME Sports.
- Type Safety: Strong type validation through Pydantic ensures data integrity and reduces errors during development.
- Modern Approach: Utilizes the latest Python features for excellent maintainability and scalability.

2. Database: PostgreSQL (psycopg2-binary)

- Relational Data: Effectively models relationships between NFL teams, conferences, and divisions.
- Reliability: Ensures data consistency and transaction integrity for securely storing important sports data.
- Scalability: Flexibly accommodates expansion to other sports leagues or additional statistical data in the future.

3. ORM: SQLAlchemy

- Database Abstraction: Allows handling data as Python objects instead of direct SQL queries, increasing development speed.
- Database Independence: Easy migration to other relational databases if needed.
- Complex Query Support: Efficiently implements team data filtering, sorting, and grouping functionality.

4. Migration: Alembic

- Schema Version Control: Systematically manages database schema changes for safe updates.
- Collaboration Simplicity: Prevents schema conflicts when multiple developers work simultaneously.
- Rollback Capability: Minimizes risk by allowing restoration to previous states if problems occur.

## UX Assumptions

1. User Purpose: Users primarily want to quickly browse the complete NFL team list, search for specific teams, or sort team information.
2. Information Priority: Team Name, Display Name, and Nickname are considered the most important information for users.
3. Usage Pattern: Users prefer exploring information through familiar web patterns (search, sort, pagination).
4. Accessibility: All users should be able to easily read content and interact with the interface.

## UI Design Decisions

### Table Layout:

- Displays data in a structured format to efficiently show a lot of information.
- Adds sorting functionality to column headers allowing users to reorganize data as desired.
- Provides an intuitive and familiar format for sports statistics.

### Search Functionality:

- Allows users to quickly find specific teams among the 32 NFL teams.
- Positions the search bar at the top for improved accessibility.

### Sorting Options:

- Provides various ways to sort data through dropdown menus and column header arrows.
- Lets users organize information according to their preferences.

### Pagination:

- Adjusts the number of teams displayed per page to match user preferences for data density.
- Uses a default of 10 items, which is an appropriate amount viewable on most screens without scrolling.
- Includes page navigation controls for easy exploration of the complete dataset.

### Minimalist Design:

- Removes unnecessary visual elements to focus on content.
- Uses clean headers and dividers to structure information.
- Creates a modern, professional feel to enhance the sports website's credibility.

### Responsive Considerations:

- Optimizes layout for desktop, with tables transforming to horizontal scroll or card format on mobile as needed.

### Intuitive Interaction Elements:

- Uses familiar UI patterns (sorting arrows, page numbers, search fields) to minimize the learning curve.



## SEO Strategies

1. Search Traffic Importance: Assumed organic traffic through search engines is important for ACME Sports' website.
2. Search Keyword Assumptions: Expected users to search using keywords like "NFL team list," "NFL team information," or specific team names (e.g., "Arizona Cardinals").
3. Content Freshness: Recognized the importance of up-to-date sports information and search engines' recognition of this freshness.
4. Mobile Search Volume: Assumed sports fans often search for information on mobile devices, making mobile SEO important.

## SEO Implementation Reasons

### Server-Side Rendering (SSR):

- Uses `Next.js` to pre-render pages on the server, allowing search engine crawlers to fully index content without executing JavaScript.
- Significantly improves search engine visibility compared to client-side rendering.

### Semantic HTML Structure:

- Uses appropriate heading tags (`<h1>`, `<h2>`, etc.) to clearly define content hierarchy.
- Implements meaningful tags (`<table>`, `<th>`, `<td>`, etc.) to clearly communicate data meaning to search engines.
- Employs semantic tags (`<nav>`, `<main>`, `<footer>`, etc.) to clarify page structure.

### Metadata Optimization:

- Creates page titles (e.g., "NFL Teams - ACME Sports") that include search keywords.
- Includes descriptive meta descriptions to improve click-through rates.

### URL Structure Optimization:

- Uses concise, descriptive URLs (e.g., `/nfl-teams`) to clearly communicate page content to both search engines and users.

### Structured Data Markup:

- Applies Schema.org SportsOrganization List schema to help search engines better understand team information and provide rich search results.
- Increases the possibility of team logos, conferences, and divisions appearing in Google search results.

### Responsive Design:

- Considers Mobile-First Indexing to provide optimal experiences across all screen sizes.
- Aligns with Google's current trend of prioritizing mobile versions of content for indexing.

### Data Refresh Strategy:

- Utilizes Next.js's Incremental Static Regeneration (ISR) to regenerate pages at regular intervals, maintaining fresh data while providing fast page loading.
- Satisfies both "freshness" and "speed" SEO elements.
