import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Doctors from "@/pages/Doctors";
import Services from "@/pages/Services";
import ServiceDetail from "@/pages/ServiceDetail";
import Prices from "@/pages/Prices";
import Contacts from "@/pages/Contacts";
import DiseaseDetail from "@/pages/DiseaseDetail";
import Publications from "@/pages/Publications";
import ArticleDetail from "@/pages/ArticleDetail";
import NotFound from "./pages/NotFound";
import Admin from "@/pages/Admin";
import License from "@/pages/License";
import Requisites from "@/pages/Requisites";
import Privacy from "@/pages/Privacy";
import Supervisors from "@/pages/Supervisors";
import BulanbayevCertificates from "@/pages/BulanbayevCertificates";
import Promos from "@/pages/Promos";
import PromoPopup from "@/components/PromoPopup";
import Osteohondroz from "@/pages/diseases/Osteohondroz";
import Orthopedics from "@/pages/services/Orthopedics";
import Neurology from "@/pages/services/Neurology";
import Massage from "@/pages/services/Massage";
import LabTests from "@/pages/services/LabTests";
import Ultrasound from "@/pages/services/Ultrasound";
import Infusions from "@/pages/services/Infusions";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PromoPopup />
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/doctors" element={<Layout><Doctors /></Layout>} />
          <Route path="/doctors/bulanbayev/certificates" element={<Layout><BulanbayevCertificates /></Layout>} />
          <Route path="/services" element={<Layout><Services /></Layout>} />
          <Route path="/services/:slug" element={<Layout><ServiceDetail /></Layout>} />
          <Route path="/prices" element={<Layout><Prices /></Layout>} />
          <Route path="/contacts" element={<Layout><Contacts /></Layout>} />
          <Route path="/publications" element={<Layout><Publications /></Layout>} />
          <Route path="/articles/:slug" element={<Layout><ArticleDetail /></Layout>} />
          <Route path="/diseases/osteohondroz" element={<Layout><Osteohondroz /></Layout>} />
          <Route path="/diseases/:slug" element={<Layout><DiseaseDetail /></Layout>} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/license" element={<Layout><License /></Layout>} />
          <Route path="/requisites" element={<Layout><Requisites /></Layout>} />
          <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
          <Route path="/supervisors" element={<Layout><Supervisors /></Layout>} />
          <Route path="/promos" element={<Layout><Promos /></Layout>} />
          <Route path="/services/orthopedics-clinic" element={<Layout><Orthopedics /></Layout>} />
          <Route path="/services/neurology-clinic" element={<Layout><Neurology /></Layout>} />
          <Route path="/services/massage-clinic" element={<Layout><Massage /></Layout>} />
          <Route path="/services/lab-tests" element={<Layout><LabTests /></Layout>} />
          <Route path="/services/ultrasound" element={<Layout><Ultrasound /></Layout>} />
          <Route path="/services/infusions" element={<Layout><Infusions /></Layout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;