# Component Naming Convention - Mock Components Standardization

**Status**: Implementation Ready  
**Priority**: Must Have (M)  
**Target**: Unified naming convention across all CreatorFlow mock components  
**Alignment**: CreatorFlow design system consistency and developer experience optimization

## 🎯 System Overview

The Component Naming Convention system establishes a unified, scalable naming pattern for all CreatorFlow mock components, ensuring consistency with existing blog post (AC-) and blog page (BP-) series while extending systematic naming to dashboard, mobile, and utility components.

### Core Purpose
Implement comprehensive component naming standards that:
- **Unify Component Discovery**: Consistent `[PREFIX]-[NUMBER]-[NAME]` pattern
- **Enable Logical Grouping**: Components organized by functional domains
- **Support Scalable Growth**: Clear categories for new component additions
- **Enhance Developer Experience**: Intuitive naming that matches component functionality

## 🏗️ Architecture

### Universal Naming Pattern
```
[PREFIX]-[NUMBER]-[DESCRIPTIVE-NAME].tsx
```

**Components:**
- **PREFIX**: 2-3 character functional domain identifier (DC, MC, NC, etc.)
- **NUMBER**: 3-digit sequential identifier (010, 020, 030, etc.)
- **DESCRIPTIVE-NAME**: Clear, hyphen-separated component description

### Component Categories & Prefix System

#### **Dashboard Components (DC-)**
Primary dashboard interface and command center components
```
DC-010-CommandCenter.tsx        # Main dashboard command center
DC-020-OrderTable.tsx          # Order management table interface  
DC-030-UserProfile.tsx         # User profile display card
DC-040-SecurityCard.tsx        # Security settings interface
```

#### **Mobile Components (MC-)**
Mobile-optimized interface components
```
MC-010-Dashboard.tsx           # Mobile dashboard interface
MC-020-Order.tsx              # Mobile order management
MC-030-Navbar.tsx             # Mobile navigation interface
```

#### **Navigation Components (NC-)**
Header, sidebar, and navigation system components
```
NC-010-Header.tsx             # Desktop header navigation
NC-020-Sidebar.tsx            # Dashboard sidebar navigation
NC-030-ExecutiveHeader.tsx    # Executive-level header interface
```

#### **Order Management (OM-)**
TikTok Shop order processing and fulfillment components
```
OM-010-SystemStats.tsx        # Order system statistics display
OM-020-FlowVisualization.tsx  # Order workflow visualization
OM-030-SubNavbar.tsx          # Order management sub-navigation
```

#### **Business Intelligence (BI-)**
Analytics, insights, and strategic business components
```
BI-010-StrategicInsights.tsx  # Business strategy insights dashboard
BI-020-BusinessSymphony.tsx   # Business performance orchestration
BI-030-IntelBriefing.tsx      # Intelligence briefing interface
```

#### **Inventory Management (IM-)**
Inventory tracking and stock management components
```
IM-010-CriticalStock.tsx      # Critical stock level monitoring
IM-020-ManagementFocus.tsx    # Inventory management focus interface
```

#### **User Experience (UX-)**
Modal, notification, and interactive UX components
```
UX-010-Modals.tsx            # System modal interfaces
UX-020-OnboardingTour.tsx    # User onboarding tour system
UX-030-FeedbackWidget.tsx    # User feedback collection
UX-040-ToastNotifications.tsx # Real-time notification system
```

#### **Account Management (AM-)**
Billing, payments, and account settings components
```
AM-010-BillingOverview.tsx    # Account billing overview
AM-020-BillingHistory.tsx     # Billing history interface
AM-030-PaymentMethod.tsx      # Payment method management
AM-040-EmailNotifications.tsx # Email notification preferences
```

#### **System Utilities (SU-)**
Error pages, policies, and system-level utilities
```
SU-010-NotFound.tsx          # 404 error page component
SU-020-CookiePolicy.tsx      # Cookie policy notification bar
SU-030-ThemeSwitcher.tsx     # System theme switching interface
SU-040-DataSovereignty.tsx   # GDPR data sovereignty compliance
```

### Existing Conventions (Maintained)
```
# Public Pages (Already Standardized)
HP-010-Header.tsx             # Homepage header
AP-020-OurMission.tsx         # About page mission section
CP-010-Hero.tsx               # Contact page hero
FP-020-OrderManagement.tsx    # Features page order management
LP-010-Legal.tsx              # Legal page content

# Blog Pages (Already Standardized)  
BP-Complete-Content-Hub.tsx   # Blog content hub interface
BP-PostCard.tsx               # Blog post card component

# Blog Post Content (Already Standardized)
AC-ArticleHero.tsx            # Article hero section
AC-DataTable.tsx              # Article data table component
```

### Series Management Components
```
DC-Series.tsx                 # Dashboard Component Series Manager
OM-Series.tsx                 # Order Management Series Manager  
BI-Series.tsx                 # Business Intelligence Series Manager
IM-Series.tsx                 # Inventory Management Series Manager
```

## 📊 Implementation Strategy

### Phase 1: Component Analysis & Mapping
Analyze all existing components and create comprehensive mapping from current names to standardized convention.

### Phase 2: Systematic Renaming
Execute systematic renaming following the established prefix categories:
1. Dashboard Components (A-series → DC-)
2. Mobile Components → MC-
3. Navigation Components → NC-
4. Order Management → OM-
5. Business Intelligence (M-series → BI-)
6. Inventory Management (I-series → IM-)
7. User Experience → UX-
8. Account Management → AM-
9. System Utilities → SU-

### Phase 3: Reference Updates
Update all imports, exports, and references in:
- `UnifiedComponentBrowser.tsx`
- Series management files
- Any internal component references

### Phase 4: Validation & Testing
- TypeScript compilation verification
- ESLint compliance checking
- Component browser functionality testing
- Navigation system validation

## 🎯 Benefits

### **Developer Experience**
- **Predictable Naming**: Developers can predict component names based on functionality
- **Logical Grouping**: Related components are easily discoverable
- **Consistent Patterns**: Uniform structure reduces cognitive load

### **Maintainability**
- **Scalable Organization**: Clear categories for new component additions
- **Refactoring Support**: Easier to reorganize and restructure components
- **Documentation Alignment**: Names match functional documentation

### **Design System Integration**
- **CDH Manifesto Compliance**: Clear, organized component structure
- **Professional Standards**: Enterprise-grade naming conventions
- **Brand Consistency**: Aligns with CreatorFlow professional positioning

## 🔄 Migration Strategy

### Current → New Naming Mappings

#### Dashboard Components (DC-)
```
A1ShmDashboard.tsx → DC-010-ShmDashboard.tsx
A2ShmDashboard.tsx → DC-020-ShmDashboardV2.tsx
A3ShmDashboard.tsx → DC-030-ShmDashboardV3.tsx
A4ShmDashboard.tsx → DC-040-ShmDashboardV4.tsx
A5ShmDashboard.tsx → DC-050-ShmDashboardV5.tsx
A6ShmDashboard.tsx → DC-060-ShmDashboardV6.tsx
10DesktopDashboardCommandCenter.tsx → DC-070-CommandCenter.tsx
```

#### Mobile Components (MC-)
```
01MobileDashboard.tsx → MC-010-Dashboard.tsx
08MobileOrder.tsx → MC-020-Order.tsx
M6MobileNavbar.tsx → MC-030-Navbar.tsx
```

#### Navigation Components (NC-)
```
02DesktopHeaderDemo.tsx → NC-010-Header.tsx
04DesktopSidebarDemo.tsx → NC-020-Sidebar.tsx
M1ExecutiveHeader.tsx → NC-030-ExecutiveHeader.tsx
```

## 🛠️ Implementation Commands

### File Renaming Commands
```bash
# Dashboard Components (DC-)
bun git:wip "Rename A-series dashboard components to DC- prefix"
mv A1ShmDashboard.tsx DC-010-ShmDashboard.tsx
mv A2ShmDashboard.tsx DC-020-ShmDashboardV2.tsx
mv A3ShmDashboard.tsx DC-030-ShmDashboardV3.tsx
# ... continue for all mappings

# Update imports in UnifiedComponentBrowser.tsx
# Update series files with new naming convention
```

### Validation Commands
```bash
# Type checking after renaming
bun run type-check

# ESLint validation
bun run lint

# Component browser testing
bun run dev
# Navigate to /en/component-browser
```

## 📚 Quality Assurance

### Validation Criteria
- [ ] All components follow `[PREFIX]-[NUMBER]-[DESCRIPTIVE-NAME].tsx` pattern
- [ ] No orphaned imports or broken references  
- [ ] UnifiedComponentBrowser navigation updated and functional
- [ ] TypeScript compilation successful with zero errors
- [ ] ESLint passes with acceptable warnings only
- [ ] All components accessible via `/en/component-browser`

### Testing Protocol
1. **Import Validation**: Verify all imports resolve correctly
2. **Browser Testing**: Test component browser navigation
3. **TypeScript Checks**: Confirm zero compilation errors
4. **ESLint Compliance**: Address any critical linting issues
5. **Functionality Testing**: Ensure all components render correctly

## 🚀 Expected Outcomes

### **Short-term Benefits**
- Unified component naming across entire mock system
- Improved developer productivity and component discovery
- Elimination of naming inconsistencies and confusion

### **Long-term Benefits**
- Scalable foundation for future component additions
- Professional-grade component library structure
- Enhanced maintainability and refactoring capabilities

## 🎯 Success Metrics

- **Naming Consistency**: 100% of components follow unified convention
- **Zero Broken References**: All imports and exports functional
- **Developer Satisfaction**: Improved component discovery experience
- **Maintenance Efficiency**: Reduced time for component location and updates

---

## Related Documentation

- [Public Pages Component Strategy](../public-pages/01-specifications/S001-DRAFT-public-pages-component-strategy.md)
- [Blog Page Components Documentation](../public-pages/03-jsx-mocks/01-blog-page-components/README.md)
- [CDH vs MVPBlocks Analysis](../public-pages/00-planning/P001-cdh-vs-mvpblocks-analysis.md)
- [CreatorFlow Documentation Standards](../documentation-standards/DOCUMENTATION_STANDARDS.md)
- [TypeScript Standards](../../.amazonq/rules/typescript-standards.md)