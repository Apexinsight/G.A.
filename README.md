# G.A. Consultants Ltd - Website

A modern, responsive, and interactive website for G.A. Consultants Ltd, an engineering consultancy firm providing professional solutions in civil, structural, transportation, and water engineering.

## Project Structure

```
G.A/
├── index.html                 # Homepage
├── about.html                 # About Us page
├── services.html              # Services page
├── projects.html              # Projects showcase
├── team.html                  # Team members page
├── certifications.html        # Certifications & memberships
├── contact.html               # Contact form page
├── css/
│   └── style.css             # Complete styling with animations
└── js/
    └── script.js             # Interactive features & functionality
```

## Features

### Pages Included

1. **Homepage (index.html)**
   - Hero section with CTA buttons
   - Statistics dashboard
   - About company overview
   - Services showcase
   - Featured projects
   - Testimonials section
   - Call-to-action section

2. **About Us (about.html)**
   - Company overview
   - Core values (Vision, Mission, Values)
   - Why choose us (6 key reasons)
   - Company timeline (2003-2024)
   - Key statistics

3. **Services (services.html)**
   - Detailed service descriptions:
     - Civil Engineering
     - Structural Engineering
     - Transportation Engineering
     - Water & Sanitation Engineering
     - Project Management
     - Consulting Services
   - Project statistics for each service
   - Service delivery process

4. **Projects (projects.html)**
   - Project portfolio with filtering
   - Categories: Civil, Structural, Transportation, Water & Sanitation
   - Project details with client information
   - Project images and descriptions
   - Status updates (Completed, In Progress)

5. **Our Team (team.html)**
   - Leadership team profiles
   - Department overview
   - Senior engineers gallery
   - Professional development section
   - Career opportunities section

6. **Certifications (certifications.html)**
   - Professional certifications (ISO, FIDIC, ECSA, CIOB)
   - Professional memberships
   - Awards & recognition timeline
   - Compliance & standards information

7. **Contact (contact.html)**
   - Contact information cards
   - Contact form with validation
   - Office location map
   - FAQ section with accordion
   - Social media links

### Technical Features

#### CSS (style.css)
- **Responsive Design**: Mobile-first approach with breakpoints at 768px and 480px
- **Modern Animations**: 
  - Fade-in, slide-up, bounce animations
  - Hover effects with transitions
  - Smooth scroll behavior
  - Page transition effects
- **Color Scheme**:
  - Primary: #ff8c00 (Orange)
  - Secondary: #1a3a52 (Dark Blue)
  - Accent: #3ddc84 (Green)
- **Components**:
  - Sticky navigation bar
  - Service cards with hover effects
  - Project grid with filter options
  - Team member cards
  - Testimonial cards
  - FAQ accordion
  - Form styling

#### JavaScript (script.js)
- **Interactive Features**:
  - Mobile hamburger menu
  - Project filtering system
  - Contact form validation and submission
  - FAQ accordion toggle
  - Smooth scrolling
  - Active navigation highlighting
  - Back-to-top button
  - Number counter animations
  - Parallax scroll effect
  - Intersection Observer for animations
  - Lazy loading support

### Animations & Effects

1. **Entrance Animations**:
   - Fade-in effects
   - Slide-up animations
   - Scale transitions
   - Stagger effects

2. **Hover Effects**:
   - Card elevation
   - Icon scaling
   - Color transitions
   - Background changes

3. **Scroll Effects**:
   - Parallax backgrounds
   - Number counting
   - Reveal animations
   - Navbar shadow updates

4. **Interactive Elements**:
   - Form validation
   - FAQ accordion
   - Project filter
   - Mobile menu toggle

## How to Use

### Quick Start
1. Open `index.html` in your web browser
2. Navigate through pages using the navigation menu
3. All pages are fully functional and linked

### Customization

#### Update Contact Information
Edit the contact info in:
- Footer (all pages)
- Contact page
- Footer section (phone, email, address)

#### Update Colors
Modify CSS variables in `css/style.css`:
```css
:root {
    --primary-color: #ff8c00;      /* Main orange */
    --secondary-color: #1a3a52;    /* Dark blue */
    --accent-color: #3ddc84;       /* Green accent */
}
```

#### Update Project Information
Edit project cards in `projects.html`:
- Project names and descriptions
- Client information
- Project values
- Status updates

#### Update Team Members
Edit team section in `team.html`:
- Team member names and titles
- Department information
- Team statistics

### Form Submission
The contact form currently:
- Validates all required fields
- Formats the visitor's message with their name, email, phone, company, subject, selected service, and message
- Opens the visitor's email app addressed to `info@gaconsultants.co.ke`
- Opens WhatsApp with the same formatted message addressed to `+254 722 737 855`
- Shows clear success/error messages

Because this is a static HTML website, fully automatic background email and WhatsApp delivery requires a backend endpoint or a hosted form service. The current implementation is reliable for static hosting because the visitor can review and press send in both email and WhatsApp.

To implement silent backend submission later:
1. Create a server endpoint or connect a form service such as Formspree, Netlify Forms, EmailJS, or a custom Node/PHP/Python endpoint
2. Send the form payload to that endpoint from `js/script.js`
3. Configure server-side email delivery to `info@gaconsultants.co.ke`
4. Configure a WhatsApp Business Cloud API message template for forwarding
5. Add CSRF/spam protection and server-side validation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Features

- Optimized CSS with minimal file size
- Efficient JavaScript with modern ES6 syntax
- Lazy loading support for images
- Smooth animations using CSS transforms
- Mobile-responsive design
- Accessible HTML structure

## Future Enhancements

1. Add backend form submission
2. Implement blog section
3. Add testimonial carousel
4. Integrate payment system
5. Implement search functionality
6. Add multi-language support
7. Social media feeds integration
8. Live chat support
9. Analytics integration

## SEO Optimization

- Semantic HTML structure
- Meta tags on all pages
- Proper heading hierarchy
- Mobile-responsive design
- Fast loading times
- Accessibility features

## File Sizes

- index.html: ~25KB
- about.html: ~18KB
- services.html: ~22KB
- projects.html: ~24KB
- team.html: ~20KB
- certifications.html: ~20KB
- contact.html: ~22KB
- css/style.css: ~40KB
- js/script.js: ~15KB

**Total**: ~206KB (Lightweight and fast-loading)

## Support & Maintenance

- All code is well-commented
- Modular structure for easy updates
- Consistent naming conventions
- Clean and organized file structure

## License

This website template is created for G.A. Consultants Ltd. Modifications and redistributions should include proper attribution.

## Contact

For inquiries about this website:
- Phone: +254 722 737 855
- Email: info@gaconsultants.co.ke
- Location: Nairobi, Kenya

---

**Website Built**: 2024
**Version**: 1.0
**Status**: Production Ready
