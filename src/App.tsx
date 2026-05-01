import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
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

// ── 404 Page ───────────────────────────────────────────────────────────────

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;900&display=swap');
`

const NotFoundWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #1a1a2e;
  font-family: 'Montserrat', sans-serif;
  gap: 2rem;
`

const TVCard = styled.div`
  .main_wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30em;
    height: 30em;
  }
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 5em;
  }
  .antenna {
    width: 5em; height: 5em;
    border-radius: 50%;
    border: 2px solid black;
    background-color: #f27405;
    margin-bottom: -6em;
    margin-left: 0em;
    z-index: -1;
  }
  .antenna_shadow {
    position: absolute;
    background-color: transparent;
    width: 50px; height: 56px;
    margin-left: 1.68em;
    border-radius: 45%;
    transform: rotate(140deg);
    border: 4px solid transparent;
    box-shadow: inset 0px 16px #a85103, inset 0px 16px 1px 1px #a85103;
  }
  .antenna::after {
    content: '';
    position: absolute;
    margin-top: -9.4em; margin-left: 0.4em;
    transform: rotate(-25deg);
    width: 1em; height: 0.5em;
    border-radius: 50%;
    background-color: #f69e50;
  }
  .antenna::before {
    content: '';
    position: absolute;
    margin-top: 0.2em; margin-left: 1.25em;
    transform: rotate(-20deg);
    width: 1.5em; height: 0.8em;
    border-radius: 50%;
    background-color: #f69e50;
  }
  .a1 {
    position: relative;
    top: -102%; left: -130%;
    width: 12em; height: 5.5em;
    border-radius: 50px;
    background-image: linear-gradient(#171717,#171717,#353535,#353535,#171717);
    transform: rotate(-29deg);
    clip-path: polygon(50% 0%,49% 100%,52% 100%);
  }
  .a1d {
    position: relative;
    top: -211%; left: -35%;
    transform: rotate(45deg);
    width: 0.5em; height: 0.5em;
    border-radius: 50%;
    border: 2px solid black;
    background-color: #979797;
    z-index: 99;
  }
  .a2 {
    position: relative;
    top: -210%; left: -10%;
    width: 12em; height: 4em;
    border-radius: 50px;
    background-color: #171717;
    background-image: linear-gradient(#171717,#171717,#353535,#353535,#171717);
    margin-right: 5em;
    clip-path: polygon(47% 0,47% 0,34% 34%,54% 25%,32% 100%,29% 96%,49% 32%,30% 38%);
    transform: rotate(-8deg);
  }
  .a2d {
    position: relative;
    top: -294%; left: 94%;
    width: 0.5em; height: 0.5em;
    border-radius: 50%;
    border: 2px solid black;
    background-color: #979797;
    z-index: 99;
  }
  .notfound_text {
    background-color: black;
    padding-left: 0.3em; padding-right: 0.3em;
    font-size: 0.75em;
    color: white;
    letter-spacing: 0;
    border-radius: 5px;
    z-index: 10;
  }
  .tv {
    width: 17em; height: 9em;
    margin-top: 3em;
    border-radius: 15px;
    background-color: #d36604;
    display: flex;
    justify-content: center;
    border: 2px solid #1d0e01;
    box-shadow: inset 0.2em 0.2em #e69635;
  }
  .tv::after {
    content: '';
    position: absolute;
    width: 17em; height: 9em;
    border-radius: 15px;
    background: repeating-radial-gradient(#d36604 0 0.0001%,#00000070 0 0.0002%) 50% 0/2500px 2500px,
      repeating-conic-gradient(#d36604 0 0.0001%,#00000070 0 0.0002%) 60% 60%/2500px 2500px;
    background-blend-mode: difference;
    opacity: 0.09;
  }
  .curve_svg {
    position: absolute;
    margin-top: 0.25em; margin-left: -0.25em;
    height: 12px; width: 12px;
  }
  .display_div {
    display: flex;
    align-items: center;
    align-self: center;
    justify-content: center;
    border-radius: 15px;
    box-shadow: 3.5px 3.5px 0px #e69635;
  }
  .screen_out { width: auto; height: auto; border-radius: 10px; }
  .screen_out1 {
    width: 11em; height: 7.75em;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
  }
  .screen {
    width: 13em; height: 7.85em;
    font-family: Montserrat;
    border: 2px solid #1d0e01;
    background: repeating-radial-gradient(#000 0 0.0001%,#ffffff 0 0.0002%) 50% 0/2500px 2500px,
      repeating-conic-gradient(#000 0 0.0001%,#ffffff 0 0.0002%) 60% 60%/2500px 2500px;
    background-blend-mode: difference;
    animation: b 0.2s infinite alternate;
    border-radius: 10px;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: #252525;
    letter-spacing: 0.15em;
    text-align: center;
  }
  .screenM {
    width: 13em; height: 7.85em;
    position: relative;
    font-family: Montserrat;
    background: linear-gradient(to right,#002fc6 0%,#002bb2 14.2857142857%,#3a3a3a 14.2857142857%,#303030 28.5714285714%,#ff0afe 28.5714285714%,#f500f4 42.8571428571%,#6c6c6c 42.8571428571%,#626262 57.1428571429%,#0affd9 57.1428571429%,#00f5ce 71.4285714286%,#3a3a3a 71.4285714286%,#303030 85.7142857143%,white 85.7142857143%,#fafafa 100%);
    border-radius: 10px;
    border: 2px solid black;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: #252525;
    letter-spacing: 0.15em;
    text-align: center;
    overflow: hidden;
  }
  .screenM:before,.screenM:after { content: ''; position: absolute; left: 0; z-index: 1; width: 100%; }
  .screenM:before {
    top: 0; height: 68.4782608696%;
    background: linear-gradient(to right,white 0%,#fafafa 14.2857142857%,#ffe60a 14.2857142857%,#f5dc00 28.5714285714%,#0affd9 28.5714285714%,#00f5ce 42.8571428571%,#10ea00 42.8571428571%,#0ed600 57.1428571429%,#ff0afe 57.1428571429%,#f500f4 71.4285714286%,#ed0014 71.4285714286%,#d90012 85.7142857143%,#002fc6 85.7142857143%,#002bb2 100%);
  }
  .screenM:after {
    bottom: 0; height: 21.7391304348%;
    background: linear-gradient(to right,#006c6b 0%,#005857 16.6666666667%,white 16.6666666667%,#fafafa 33.3333333333%,#001b75 33.3333333333%,#001761 50%,#6c6c6c 50%,#626262 66.6666666667%,#929292 66.6666666667%,#888888 83.3333333333%,#3a3a3a 83.3333333333%,#303030 100%);
  }
  @keyframes b { 100% { background-position: 50% 0, 60% 50%; } }
  .lines { display: flex; column-gap: 0.1em; align-self: flex-end; }
  .line1,.line3 { width: 2px; height: 0.5em; background-color: black; border-radius: 25px 25px 0px 0px; margin-top: 0.5em; }
  .line2 { flex-grow: 1; width: 2px; height: 1em; background-color: black; border-radius: 25px 25px 0px 0px; }
  .buttons_div {
    width: 4.25em; align-self: center; height: 8em;
    background-color: #e69635;
    border: 2px solid #1d0e01;
    padding: 0.6em; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    flex-direction: column; row-gap: 0.75em;
    box-shadow: 3px 3px 0px #e69635;
  }
  .b1 {
    width: 1.65em; height: 1.65em;
    border-radius: 50%;
    background-color: #7f5934;
    border: 2px solid black;
    box-shadow: inset 2px 2px 1px #b49577,-2px 0px #513721,-2px 0px 0px 1px black;
  }
  .b1::before { content: ''; position: absolute; margin-top: 1em; margin-left: 0.5em; transform: rotate(47deg); border-radius: 5px; width: 0.1em; height: 0.4em; background-color: #000000; }
  .b1::after  { content: ''; position: absolute; margin-top: 0.9em; margin-left: 0.8em; transform: rotate(47deg); border-radius: 5px; width: 0.1em; height: 0.55em; background-color: #000000; }
  .b1 div { content: ''; position: absolute; margin-top: -0.1em; margin-left: 0.65em; transform: rotate(45deg); width: 0.15em; height: 1.5em; background-color: #000000; }
  .b2 {
    width: 1.65em; height: 1.65em;
    border-radius: 50%;
    background-color: #7f5934;
    border: 2px solid black;
    box-shadow: inset 2px 2px 1px #b49577,-2px 0px #513721,-2px 0px 0px 1px black;
  }
  .b2::before { content: ''; position: absolute; margin-top: 1.05em; margin-left: 0.8em; transform: rotate(-45deg); border-radius: 5px; width: 0.15em; height: 0.4em; background-color: #000000; }
  .b2::after  { content: ''; position: absolute; margin-top: -0.1em; margin-left: 0.65em; transform: rotate(-45deg); width: 0.15em; height: 1.5em; background-color: #000000; }
  .speakers { display: flex; flex-direction: column; row-gap: 0.5em; }
  .speakers .g1 { display: flex; column-gap: 0.25em; }
  .speakers .g1 .g11,.g12,.g13 { width: 0.65em; height: 0.65em; border-radius: 50%; background-color: #7f5934; border: 2px solid black; box-shadow: inset 1.25px 1.25px 1px #b49577; }
  .speakers .g { width: auto; height: 2px; background-color: #171717; }
  .bottom { width: 100%; height: auto; display: flex; align-items: center; justify-content: center; column-gap: 8.7em; }
  .base1,.base2 { height: 1em; width: 2em; border: 2px solid #171717; background-color: #4d4d4d; margin-top: -0.15em; z-index: -1; }
  .base3 { position: absolute; height: 0.15em; width: 17.5em; background-color: #171717; margin-top: 0.8em; }
  .text_404 { position: absolute; display: flex; flex-direction: row; column-gap: 6em; z-index: -5; margin-bottom: 2em; align-items: center; justify-content: center; opacity: 0.5; font-family: Montserrat; }
  .text_4041 { transform: scaleY(24.5) scaleX(9); }
  .text_4042 { transform: scaleY(24.5) scaleX(9); }
  .text_4043 { transform: scaleY(24.5) scaleX(9); }
  @media only screen and (max-width: 495px) { .text_404 { column-gap: 6em; } }
  @media only screen and (max-width: 395px) { .text_404 { column-gap: 4em; } .text_4041,.text_4042,.text_4043 { transform: scaleY(25) scaleX(8); } }
  @media only screen and (max-width: 1024px) { .screenM { display: flex; } .screen { display: none; } }
  @media only screen and (min-width: 1025px) { .screen { display: flex; } .screenM { display: none; } }
`

const HomeButton = styled.button`
  padding: 0.75rem 2rem;
  background-color: #f27405;
  color: #fff;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  border: 2px solid #1d0e01;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 3px 3px 0px #a85103;
  transition: transform 0.1s, box-shadow 0.1s;
  &:hover { transform: translate(-1px,-1px); box-shadow: 4px 4px 0px #a85103; }
  &:active { transform: translate(2px,2px); box-shadow: 1px 1px 0px #a85103; }
`

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate()
  return (
    <NotFoundWrapper>
      <GlobalStyle />
      <TVCard>
        <div className="main_wrapper">
          <div className="main">
            <div className="antenna">
              <div className="antenna_shadow" />
              <div className="a1" />
              <div className="a1d" />
              <div className="a2" />
              <div className="a2d" />
              <div className="a_base" />
            </div>
            <div className="tv">
              <div className="cruve">
                <svg className="curve_svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 189.929 189.929" xmlSpace="preserve">
                  <path d="M70.343,70.343c-30.554,30.553-44.806,72.7-39.102,115.635l-29.738,3.951C-5.442,137.659,11.917,86.34,49.129,49.13C86.34,11.918,137.664-5.445,189.928,1.502l-3.95,29.738C143.041,25.54,100.895,39.789,70.343,70.343z" />
                </svg>
              </div>
              <div className="display_div">
                <div className="screen_out">
                  <div className="screen_out1">
                    <div className="screen"><span className="notfound_text">NOT FOUND</span></div>
                    <div className="screenM"><span className="notfound_text">NOT FOUND</span></div>
                  </div>
                </div>
              </div>
              <div className="lines">
                <div className="line1" /><div className="line2" /><div className="line3" />
              </div>
              <div className="buttons_div">
                <div className="b1"><div /></div>
                <div className="b2" />
                <div className="speakers">
                  <div className="g1"><div className="g11" /><div className="g12" /><div className="g13" /></div>
                  <div className="g" /><div className="g" />
                </div>
              </div>
            </div>
            <div className="bottom">
              <div className="base1" /><div className="base2" /><div className="base3" />
            </div>
          </div>
          <div className="text_404">
            <div className="text_4041">4</div>
            <div className="text_4042">0</div>
            <div className="text_4043">4</div>
          </div>
        </div>
      </TVCard>
      <HomeButton onClick={() => navigate('/')}>← Go Back Home</HomeButton>
    </NotFoundWrapper>
  )
}

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