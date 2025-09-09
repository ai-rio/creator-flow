# S001: Component Mapping Matrix - Current to Standardized Names

**Document Type**: Specifications  
**Status**: Implementation Ready  
**Priority**: Must Have (M)  
**Last Updated**: 2025-01-09

## 🎯 Overview

This document provides the definitive mapping matrix for transforming all existing CreatorFlow mock components from their current inconsistent naming patterns to the standardized `[PREFIX]-[NUMBER]-[DESCRIPTIVE-NAME].tsx` convention.

## 📋 Complete Component Mapping Matrix

### Dashboard Components (DC-) - 13 Components
| Current Name | New Name | Category | Description |
|--------------|----------|----------|-------------|
| `A1ShmDashboard.tsx` | `DC-010-ShmDashboard.tsx` | Dashboard | Strategic Health Monitor Dashboard V1 |
| `A2ShmDashboard.tsx` | `DC-020-ShmDashboardV2.tsx` | Dashboard | Strategic Health Monitor Dashboard V2 |
| `A3ShmDashboard.tsx` | `DC-030-ShmDashboardV3.tsx` | Dashboard | Strategic Health Monitor Dashboard V3 |
| `A4ShmDashboard.tsx` | `DC-040-ShmDashboardV4.tsx` | Dashboard | Strategic Health Monitor Dashboard V4 |
| `A5ShmDashboard.tsx` | `DC-050-ShmDashboardV5.tsx` | Dashboard | Strategic Health Monitor Dashboard V5 |
| `A6ShmDashboard.tsx` | `DC-060-ShmDashboardV6.tsx` | Dashboard | Strategic Health Monitor Dashboard V6 |
| `10DesktopDashboardCommandCenter.tsx` | `DC-070-CommandCenter.tsx` | Dashboard | Main dashboard command center interface |
| `D1D3EnhancedDesctopCcc-768px.tsx` | `DC-080-EnhancedCccV1.tsx` | Dashboard | Enhanced desktop command center V1 (768px) |
| `D4EnhancedDesctopCcc-768px.tsx` | `DC-090-EnhancedCccV4.tsx` | Dashboard | Enhanced desktop command center V4 (768px) |
| `D5EnhancedDesctopCcc-768px.tsx` | `DC-100-EnhancedCccV5.tsx` | Dashboard | Enhanced desktop command center V5 (768px) |
| `D6EnhancedDesctopCcc-768px.tsx` | `DC-110-EnhancedCccV6.tsx` | Dashboard | Enhanced desktop command center V6 (768px) |
| `D4EnhancedDesctopCcc-768px .tsx` | `DC-120-EnhancedCccV4Alt.tsx` | Dashboard | Enhanced desktop command center V4 Alt (768px) |
| `D5EnhancedDesctopCcc-768px .tsx` | `DC-130-EnhancedCccV5Alt.tsx` | Dashboard | Enhanced desktop command center V5 Alt (768px) |

### Mobile Components (MC-) - 3 Components
| Current Name | New Name | Category | Description |
|--------------|----------|----------|-------------|
| `01MobileDashboard.tsx` | `MC-010-Dashboard.tsx` | Mobile | Primary mobile dashboard interface |
| `08MobileOrder.tsx` | `MC-020-Order.tsx` | Mobile | Mobile order management interface |
| `M6MobileNavbar.tsx` | `MC-030-Navbar.tsx` | Mobile | Mobile navigation bar component |

### Navigation Components (NC-) - 3 Components
| Current Name | New Name | Category | Description |
|--------------|----------|----------|-------------|
| `02DesktopHeaderDemo.tsx` | `NC-010-Header.tsx` | Navigation | Desktop header navigation demo |
| `04DesktopSidebarDemo.tsx` | `NC-020-Sidebar.tsx` | Navigation | Desktop sidebar navigation demo |
| `M1ExecutiveHeader.tsx` | `NC-030-ExecutiveHeader.tsx` | Navigation | Executive-level header interface |

### Order Management (OM-) - 3 Components  
| Current Name | New Name | Category | Description |
|--------------|----------|----------|-------------|
| `O2OrderSystemStatsCard.tsx` | `OM-010-SystemStats.tsx` | Orders | Order system statistics card |
| `11DesktopOrderFlowVisualisation.tsx` | `OM-020-FlowVisualization.tsx` | Orders | Desktop order flow visualization |
| `O5OrderSubNavbar.tsx` | `OM-030-SubNavbar.tsx` | Orders | Order management sub-navigation |

### Business Intelligence (BI-) - 5 Components
| Current Name | New Name | Category | Description |
|--------------|----------|----------|-------------|
| `12DesktopStrategicInsights.tsx` | `BI-010-StrategicInsights.tsx` | Business Intel | Strategic insights dashboard |
| `M2BusinessSimphonyCard.tsx` | `BI-020-BusinessSymphony.tsx` | Business Intel | Business symphony orchestration card |
| `M3StrategicCommandCard.tsx` | `BI-030-StrategicCommand.tsx` | Business Intel | Strategic command interface card |
| `M4LiberationOrchestraCard.tsx` | `BI-040-LiberationOrchestra.tsx` | Business Intel | Liberation orchestra workflow card |
| `M5IntelBriefingCard.tsx` | `BI-050-IntelBriefing.tsx` | Business Intel | Intelligence briefing interface |

### Inventory Management (IM-) - 2 Components
| Current Name | New Name | Category | Description |
|--------------|----------|----------|-------------|
| `I3CriticalStockCard.tsx` | `IM-010-CriticalStock.tsx` | Inventory | Critical stock level monitoring |
| `I1I5InventoryManagementFocusComponents.tsx` | `IM-020-ManagementFocus.tsx` | Inventory | Inventory management focus interface |

### User Experience (UX-) - 4 Components
| Current Name | New Name | Category | Description |
|--------------|----------|----------|-------------|
| `05DesktopModals.tsx` | `UX-010-Modals.tsx` | UX | Desktop modal system interfaces |
| `06DesktopOnboardingTour.demo.tsx` | `UX-020-OnboardingTour.tsx` | UX | User onboarding tour system |
| `07DesktopFeedbackWidget.tsx` | `UX-030-FeedbackWidget.tsx` | UX | Desktop feedback widget interface |
| `03DesktopToastNotifications.tsx` | `UX-040-ToastNotifications.tsx` | UX | Desktop toast notification system |

### Account Management (AM-) - 4 Components
| Current Name | New Name | Category | Description |
|--------------|----------|----------|-------------|
| `16DesktopBillinqOverview.tsx` | `AM-010-BillingOverview.tsx` | Account | Desktop billing overview interface |
| `17DesktopBillingHistory.tsx` | `AM-020-BillingHistory.tsx` | Account | Desktop billing history interface |
| `18DesktopPaymentMethod.tsx` | `AM-030-PaymentMethod.tsx` | Account | Desktop payment method management |
| `15DesktopEmailNotificationsCard.tsx` | `AM-040-EmailNotifications.tsx` | Account | Email notification preferences |

### Data & Analytics (DA-) - 1 Component
| Current Name | New Name | Category | Description |
|--------------|----------|----------|-------------|
| `09DesktopOrderTableComponent.tsx` | `DA-010-OrderTable.tsx` | Data | Desktop order data table component |

### Profile Management (PM-) - 1 Component
| Current Name | New Name | Category | Description |
|--------------|----------|----------|-------------|
| `13DesktopUserProfileCard.tsx` | `PM-010-UserProfile.tsx` | Profile | Desktop user profile card interface |

### Security & Compliance (SC-) - 1 Component
| Current Name | New Name | Category | Description |
|--------------|----------|----------|-------------|
| `14DesktopSecurityCard.tsx` | `SC-010-SecurityCard.tsx` | Security | Desktop security settings card |

### System Utilities (SU-) - 4 Components
| Current Name | New Name | Category | Description |
|--------------|----------|----------|-------------|
| `404-NotFound.tsx` | `SU-010-NotFound.tsx` | System | 404 error page component |
| `Cookie-Policy-Bar.tsx` | `SU-020-CookiePolicy.tsx` | System | Cookie policy notification bar |
| `CreatorFlow-Theme-Switcher.tsx` | `SU-030-ThemeSwitcher.tsx` | System | CreatorFlow theme switching interface |
| `GDPR-Data-Sovereignty.tsx` | `SU-040-DataSovereignty.tsx` | System | GDPR data sovereignty compliance |

### Component-Prefixed Files (Duplicates) - To be Removed
| Current Name | Action | Reason |
|--------------|--------|--------|
| `Component01mobileDashboard.tsx` | **DELETE** | Duplicate of `01MobileDashboard.tsx` |
| `Component02desktopHeaderDemo.tsx` | **DELETE** | Duplicate of `02DesktopHeaderDemo.tsx` |
| `Component03desktopToastNotifications.tsx` | **DELETE** | Duplicate of `03DesktopToastNotifications.tsx` |
| `Component04desktopSidebarDemo.tsx` | **DELETE** | Duplicate of `04DesktopSidebarDemo.tsx` |
| `Component05desktopModals.tsx` | **DELETE** | Duplicate of `05DesktopModals.tsx` |
| `Component06desktopOnboardingTour.demo.tsx` | **DELETE** | Duplicate of `06DesktopOnboardingTour.demo.tsx` |
| `Component07desktopFeedbackWidget.tsx` | **DELETE** | Duplicate of `07DesktopFeedbackWidget.tsx` |
| `Component08mobileOrder.tsx` | **DELETE** | Duplicate of `08MobileOrder.tsx` |
| `Component09desktopOrderTableComponent.tsx` | **DELETE** | Duplicate of `09DesktopOrderTableComponent.tsx` |
| `Component10desktopDashboardCommandCenter.tsx` | **DELETE** | Duplicate of `10DesktopDashboardCommandCenter.tsx` |
| `Component11desktopOrderFlowVisualisation.tsx` | **DELETE** | Duplicate of `11DesktopOrderFlowVisualisation.tsx` |
| `Component12desktopStrategicInsights.tsx` | **DELETE** | Duplicate of `12DesktopStrategicInsights.tsx` |
| `Component13desktopUserProfileCard.tsx` | **DELETE** | Duplicate of `13DesktopUserProfileCard.tsx` |
| `Component14desktopSecurityCard.tsx` | **DELETE** | Duplicate of `14DesktopSecurityCard.tsx` |
| `Component15desktopEmailNotificationsCard.tsx` | **DELETE** | Duplicate of `15DesktopEmailNotificationsCard.tsx` |
| `Component16desktopBillinqOverview.tsx` | **DELETE** | Duplicate of `16DesktopBillinqOverview.tsx` |
| `Component17desktopBillingHistory.tsx` | **DELETE** | Duplicate of `17DesktopBillingHistory.tsx` |
| `Component18desktopPaymentMethod.tsx` | **DELETE** | Duplicate of `18DesktopPaymentMethod.tsx` |

### Series Management Files
| Current Name | New Name | Category | Description |
|--------------|----------|----------|-------------|
| `ASeries.tsx` | `DC-Series.tsx` | Series | Dashboard Component Series Manager |
| `MSeries.tsx` | `BI-Series.tsx` | Series | Business Intelligence Series Manager |
| `MxSeries.tsx` | `BI-Extended-Series.tsx` | Series | Extended Business Intelligence Series |
| `OSeries.tsx` | `OM-Series.tsx` | Series | Order Management Series Manager |
| `ISeries.tsx` | `IM-Series.tsx` | Series | Inventory Management Series Manager |
| `DSeries.tsx` | `DC-Extended-Series.tsx` | Series | Extended Dashboard Component Series |
| `DxSeries.tsx` | `DC-Experimental-Series.tsx` | Series | Experimental Dashboard Component Series |
| `FPSeries.tsx` | `FP-Series.tsx` | Series | Features Page Series Manager (Keep existing) |

### Already Standardized (No Changes Required)
| Component Name | Status | Category |
|----------------|--------|----------|
| `HP-*.tsx` | ✅ **KEEP** | Homepage Components |
| `AP-*.tsx` | ✅ **KEEP** | About Page Components |
| `CP-*.tsx` | ✅ **KEEP** | Contact Page Components |
| `FP-*.tsx` | ✅ **KEEP** | Features Page Components |
| `LP-*.tsx` | ✅ **KEEP** | Legal Page Components |
| `BP-*.tsx` | ✅ **KEEP** | Blog Page Components |
| `AC-*.tsx` | ✅ **KEEP** | Article Content Components |

## 🔄 Implementation Summary

### Total Component Count: 113 Files
- **Rename Required**: 50 components
- **Delete (Duplicates)**: 18 files  
- **Keep Unchanged**: 45 components (already standardized)

### New Prefix Distribution
- **DC- (Dashboard)**: 13 components
- **MC- (Mobile)**: 3 components
- **NC- (Navigation)**: 3 components  
- **OM- (Order Management)**: 3 components
- **BI- (Business Intelligence)**: 5 components
- **IM- (Inventory Management)**: 2 components
- **UX- (User Experience)**: 4 components
- **AM- (Account Management)**: 4 components
- **DA- (Data & Analytics)**: 1 component
- **PM- (Profile Management)**: 1 component
- **SC- (Security & Compliance)**: 1 component
- **SU- (System Utilities)**: 4 components
- **Series Management**: 8 files

## 🛠️ Implementation Commands

### Phase 1: Remove Duplicate Files
```bash
# Remove all Component-prefixed duplicates
rm Component*.tsx
```

### Phase 2: Rename Dashboard Components
```bash
mv A1ShmDashboard.tsx DC-010-ShmDashboard.tsx
mv A2ShmDashboard.tsx DC-020-ShmDashboardV2.tsx
mv A3ShmDashboard.tsx DC-030-ShmDashboardV3.tsx
mv A4ShmDashboard.tsx DC-040-ShmDashboardV4.tsx
mv A5ShmDashboard.tsx DC-050-ShmDashboardV5.tsx
mv A6ShmDashboard.tsx DC-060-ShmDashboardV6.tsx
mv 10DesktopDashboardCommandCenter.tsx DC-070-CommandCenter.tsx
mv "D1D3EnhancedDesctopCcc-768px.tsx" DC-080-EnhancedCccV1.tsx
mv "D4EnhancedDesctopCcc-768px.tsx" DC-090-EnhancedCccV4.tsx
mv "D5EnhancedDesctopCcc-768px.tsx" DC-100-EnhancedCccV5.tsx
mv "D6EnhancedDesctopCcc-768px.tsx" DC-110-EnhancedCccV6.tsx
mv "D4EnhancedDesctopCcc-768px .tsx" DC-120-EnhancedCccV4Alt.tsx
mv "D5EnhancedDesctopCcc-768px .tsx" DC-130-EnhancedCccV5Alt.tsx
```

### Phase 3: Continue with Remaining Categories
```bash
# Mobile Components
mv 01MobileDashboard.tsx MC-010-Dashboard.tsx
mv 08MobileOrder.tsx MC-020-Order.tsx
mv M6MobileNavbar.tsx MC-030-Navbar.tsx

# Navigation Components  
mv 02DesktopHeaderDemo.tsx NC-010-Header.tsx
mv 04DesktopSidebarDemo.tsx NC-020-Sidebar.tsx
mv M1ExecutiveHeader.tsx NC-030-ExecutiveHeader.tsx

# Continue for all other categories...
```

### Phase 4: Update Series Files
```bash
mv ASeries.tsx DC-Series.tsx
mv MSeries.tsx BI-Series.tsx
mv OSeries.tsx OM-Series.tsx
mv ISeries.tsx IM-Series.tsx
mv DSeries.tsx DC-Extended-Series.tsx
mv DxSeries.tsx DC-Experimental-Series.tsx
mv MxSeries.tsx BI-Extended-Series.tsx
```

## ✅ Validation Checklist

- [ ] All 50 target files renamed successfully
- [ ] All 18 duplicate files removed
- [ ] Series files updated with new naming
- [ ] UnifiedComponentBrowser.tsx imports updated
- [ ] TypeScript compilation successful
- [ ] ESLint passes without critical errors
- [ ] Component browser navigation functional

---

## Related Documentation

- [Component Naming Convention README](../README.md)
- [Implementation Progress Tracking](../02-implementation/I001-DRAFT-implementation-progress.md)
- [CreatorFlow Documentation Standards](../../documentation-standards/DOCUMENTATION_STANDARDS.md)