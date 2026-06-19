import React from 'react'
import { Routes, Route } from 'react-router-dom'

// ── Pages ────────────────────────────────────────────────────────────────

import LandingPage from './pages/Landingpage'
import AICareerPage from './pages/AICareerPage'
import RoadmapsPage from './pages/Roadmapspage'
import RoadmapDetailPage from './pages/AiMlRoadmapPage'
import DataScienceRoadmapPage from './pages/Datascienceroadmappage'
import CloudDevOpsRoadmapPage from './pages/Clouddevopsroadmappage'
import ProductManagerRoadmapPage from './pages/Productmanagerroadmappage'
import FullStackDeveloperRoadmapPage from './pages/Fullstackdeveloperroadmappage'
import UxUiDesignerRoadmapPage from './pages/Uxuidesignerroadmappage'
import CloudengineerRoadmapPage from './pages/Cloudengineerroadmappage'
import SecurityEngineerRoadmapPage from './pages/Securityengineerroadmappage'
import BackenddeveloperRoadmapPage from './pages/Backenddeveloperroadmappage.tsx'
import FrontendDeveloperRoadmapPage from './pages/FrontendDeveloperroadmappage.tsx'
import CybersecurityRoadmapPage from './pages/CybersecurityAnalystroadmappage.tsx'
import SocanalystRoadmapPage from './pages/Socanalystroadmappage.tsx'
import CloudSecurityEngineerRoadmapPage from './pages/CloudSecurityEngineersroadmappage.tsx'
import DigitalMarketerRoadmapPage from './pages/DigitalMarketerroadmappage.tsx'
import EthicalHackerPenTesterRoadmapPage from './pages/EthicalHacker(PenTester)roadmappage'
import DevopsEngineersRoadmapPage from './pages/DevopsEngineersroadmappage'
import SiteReliabilityEngineerRoadmapPage from './pages/Sitereliabilityengineersroadmappage'
import MobileAppDeveloperRoadmapPage from './pages/MobileAppDeveloperroadmappage'
import BlockchainDeveloperRoadmapPage from './pages/BlockchainDeveloperroadmappage'
import SystemsEngineerRoadmapPage from './pages/SystemsEngineerroadmappage'
import SoftwareEngineerRoadmapPage from './pages/Softwareengineerroadmappage'
import WebDeveloperRoadmapPage from './pages/Webdeveloperroadmappage.tsx'
import SecurityOperationsEngineerRoadmapPage from './pages/Securityoperationsengineerroadmappage.tsx'
import Iotengineerroadmappage from './pages/Iotengineerroadmappage'
import DataAnalystRoadmapPage from './pages/Dataanalystroadmappage.tsx'
import CareerChangePage from './pages/Careerchangepage'
import BlogPage from './pages/Blogpage'
import BlogPostPage from './pages/Blogpostpage'
import AboutContactPage from './pages/Aboutpage.tsx'
import ContactPage from './pages/Contactpage.tsx'
import PrivacyPolicyPage from './pages/Privacypolicypage'
import AIEngineerRoadmapPage from './pages/Aiengineerroadmappage.tsx'
import HelpDeskITSupportRoadmapPage from './pages/Helpdeskroadmappage.tsx'
import DataEngineerRoadmapPage from './pages/Dataengineerroadmappage.tsx'
import MLOpsEngineerRoadmapPage from './pages/Mlopsengineerroadmappage.tsx'
import ServiceDeskAnalystRoadmapPage from './pages/Servicedeskanalystroadmappage.tsx'
import MachineLearningEngineerRoadmapPage from './pages/Machinelearningengineerroadmappage.tsx'
import NetworkEngineerRoadmapPage from './pages/Networkengineerroadmappage.tsx'
import SystemsAdministratorRoadmapPage from './pages/Systemsadministratorroadmappage.tsx'
import CustomerITSupportRoadmapPage from './pages/Customeritsupportroadmappage.tsx'
import ITTechnicianRoadmapPage from './pages/Ittechnicianroadmappage.tsx'
import QAEngineerRoadmapPage from './pages/Qaengineerroadmappage.tsx'
import ITSupportspecialist from './pages/Itsupportspecialistroadmappage.tsx'
import INFormationTechnologyRoadmapPage from './pages/Informationsecurityanalystroadmappage.tsx'
import CybersecuritySpecialistRoadmapPage from './pages/Cybersecurityspecialistroadmappage.tsx'
import BusinessAnalystRoadmapPage from './pages/Businessanalystroadmappage.tsx'
import ProjectManagerRoadmapPage from './pages/Projectmanagerroadmappage.tsx'
import SoftwareDeveloperRoadmapPage from './pages/Softwaredeveloperroadmappage.tsx'
import SolutionsArchitectRoadmapPage from './pages/Solutionsarchitectroadmappage.tsx'
import ScrumMasterRoadmapPage from './pages/Scrummasterroadmappage.tsx'
import CybersecurityEngineerRoadmapPage from './pages/Cybersecurityengineerroadmappage.tsx'
import GameDeveloperRoadmapPage from './pages/Gamedeveloperroadmappage.tsx'
import AIResearcherRoadmapPage from './pages/Airesearcherroadmappage.tsx'
import Graphicdesignerroadmappage from './data/Graphicdesign-Uxuidesignerroadmap.tsx'
import CustomerRoadmapPage from './data/CustomerService-Qatesterroadmap.tsx'
import MarketerRoadmapPage from './data/MarketingAnalyst-Dataanalystroadmap.tsx'
import ITSupportCybersecurityRoadmapPage from './data/ITSupport-Cybersecurityanalystroadmappage.tsx'
import RetailfrontendDeveloperroadmappage from './data/retailFrontenddeveloperroadmappage.tsx'
import CallCenter from './data/Productmanagerroadmap.tsx'
import TermsOfUsePage from './pages/Termsofusepage.tsx'

// ── 404 Page (now imported from separate file) ────────────────────────────

import NotFoundPage from './pages/NotFoundPage'

// ── App ────────────────────────────────────────────────────────────────────

const App: React.FC = () => (
  <Routes>
    {/* ── Core pages ── */}
    <Route path="/"              element={<LandingPage />} />
    <Route path="/roadmaps"      element={<RoadmapsPage />} />
    <Route path="/career-change" element={<CareerChangePage />} />
    <Route path="/ai-career"     element={<AICareerPage />} />

    {/* ── Blog ── */}
    <Route path="/blog"          element={<BlogPage />} />
    <Route path="/blog/:slug"    element={<BlogPostPage />} />

    {/* ── About & Contact ── */}
    <Route path="/about"         element={<AboutContactPage />} />
    <Route path="/contact"       element={<ContactPage />} />
    <Route path="/terms"         element={<TermsOfUsePage />} />
    <Route path="/privacy"       element={<PrivacyPolicyPage />} />

    {/* ── Roadmap detail pages ──
        IMPORTANT: all specific /roadmaps/xxx routes MUST come
        BEFORE the dynamic /roadmaps/:id catch-all below         */}
    <Route path="/roadmaps/data-science"                 element={<DataScienceRoadmapPage />} />
    <Route path="/roadmaps/cloud-devops"                 element={<CloudDevOpsRoadmapPage />} />
    <Route path="/roadmaps/product-manager"              element={<ProductManagerRoadmapPage />} />
    <Route path="/roadmaps/full-stack-developer"         element={<FullStackDeveloperRoadmapPage />} />
    <Route path="/roadmaps/ux-ui-designer"               element={<UxUiDesignerRoadmapPage />} />
    <Route path="/roadmaps/cloud-engineer"               element={<CloudengineerRoadmapPage />} />
    <Route path="/roadmaps/security-engineer"            element={<SecurityEngineerRoadmapPage />} />
    <Route path="/roadmaps/backend-developer"            element={<BackenddeveloperRoadmapPage />} />
    <Route path="/roadmaps/frontend-developer"           element={<FrontendDeveloperRoadmapPage />} />
    <Route path="/roadmaps/cybersecurity-analyst"        element={<CybersecurityRoadmapPage />} />
    <Route path="/roadmaps/soc-analyst"                  element={<SocanalystRoadmapPage />} />
    <Route path="/roadmaps/cloud-security-engineer"      element={<CloudSecurityEngineerRoadmapPage />} />
    <Route path="/roadmaps/digital-marketer"             element={<DigitalMarketerRoadmapPage />} />
    <Route path="/roadmaps/ethical-hacker"               element={<EthicalHackerPenTesterRoadmapPage />} />
    <Route path="/roadmaps/devops"                       element={<DevopsEngineersRoadmapPage />} />
    <Route path="/roadmaps/site-reliability-engineer"    element={<SiteReliabilityEngineerRoadmapPage />} />
    <Route path="/roadmaps/mobile-developer"             element={<MobileAppDeveloperRoadmapPage />} />
    <Route path="/roadmaps/blockchain-developer"         element={<BlockchainDeveloperRoadmapPage />} />
    <Route path="/roadmaps/systems-engineer"             element={<SystemsEngineerRoadmapPage />} />
    <Route path="/roadmaps/software-engineer"            element={<SoftwareEngineerRoadmapPage />} />
    <Route path="/roadmaps/web-developer"                element={<WebDeveloperRoadmapPage />} />
    <Route path="/roadmaps/security-operations-engineer" element={<SecurityOperationsEngineerRoadmapPage />} />
    <Route path="/roadmaps/iot-engineer"                 element={<Iotengineerroadmappage />} />
    <Route path="/roadmaps/data-analyst"                 element={<DataAnalystRoadmapPage />} />
    <Route path="/roadmaps/ai-engineer"                  element={<AIEngineerRoadmapPage />} />
    <Route path="/roadmaps/help-desk-technician"         element={<HelpDeskITSupportRoadmapPage />} />
    <Route path="/roadmaps/data-engineer"                element={<DataEngineerRoadmapPage />} />
    <Route path="/roadmaps/mlops-engineer"               element={<MLOpsEngineerRoadmapPage />} />
    <Route path="/roadmaps/service-desk-analyst"         element={<ServiceDeskAnalystRoadmapPage />} />
    <Route path="/roadmaps/machine-learning-engineer"    element={<MachineLearningEngineerRoadmapPage />} />
    <Route path="/roadmaps/network-engineer"             element={<NetworkEngineerRoadmapPage />} />
    <Route path="/roadmaps/systems-administrator"        element={<SystemsAdministratorRoadmapPage />} />
    <Route path="/roadmaps/customer-it-support"          element={<CustomerITSupportRoadmapPage />} />
    <Route path="/roadmaps/it-technician"                element={<ITTechnicianRoadmapPage />} />
    <Route path="/roadmaps/qa-engineer"                  element={<QAEngineerRoadmapPage />} />
    <Route path="/roadmaps/it-support-specialist"        element={<ITSupportspecialist />} />
    <Route path="/roadmaps/information-technology"       element={<INFormationTechnologyRoadmapPage />} />
    <Route path="/roadmaps/cybersecurity-specialist"     element={<CybersecuritySpecialistRoadmapPage />} />
    <Route path="/roadmaps/business-analyst"             element={<BusinessAnalystRoadmapPage />} />
    <Route path="/roadmaps/project-manager"              element={<ProjectManagerRoadmapPage />} />
    <Route path="/roadmaps/software-developer"           element={<SoftwareDeveloperRoadmapPage />} />
    <Route path="/roadmaps/solutions-architect"          element={<SolutionsArchitectRoadmapPage />} />
    <Route path="/roadmaps/scrum-master"                 element={<ScrumMasterRoadmapPage />} />
    <Route path="/roadmaps/cybersecurity-engineer"       element={<CybersecurityEngineerRoadmapPage />} />
    <Route path="/roadmaps/game-developer"               element={<GameDeveloperRoadmapPage />} />
    <Route path="/roadmaps/ai-researcher"                element={<AIResearcherRoadmapPage />} />

    {/* ── Dynamic catch-all for roadmaps — MUST be AFTER all specific routes above ── */}
    <Route path="/roadmaps/:id"                          element={<RoadmapDetailPage />} />

    {/* ── Career-change sub-pages ── */}
    <Route path="/graphic-designer"                      element={<Graphicdesignerroadmappage />} />
    <Route path="/customer-service-qa"                   element={<CustomerRoadmapPage />} />
    <Route path="/marketing-analyst-data-analyst"        element={<MarketerRoadmapPage />} />
    <Route path="/it-support-cybersecurity-analyst"      element={<ITSupportCybersecurityRoadmapPage />} />
    <Route path="/retail-frontend-developer"             element={<RetailfrontendDeveloperroadmappage />} />
    <Route path="/call-center"                           element={<CallCenter />} />

    {/* ── 404 catch-all — MUST be last ── */}
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
)

export default App
