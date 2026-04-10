import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

import Layout from "@/components/Layout";
import PromoPopup from "@/components/PromoPopup";
import Home from "@/pages/Home";

const Doctors = lazy(() => import("@/pages/Doctors"));
const Services = lazy(() => import("@/pages/Services"));
const ServiceDetail = lazy(() => import("@/pages/ServiceDetail"));
const Prices = lazy(() => import("@/pages/Prices"));
const Contacts = lazy(() => import("@/pages/Contacts"));
const DiseaseDetail = lazy(() => import("@/pages/DiseaseDetail"));
const Publications = lazy(() => import("@/pages/Publications"));
const ArticleDetail = lazy(() => import("@/pages/ArticleDetail"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Admin = lazy(() => import("@/pages/Admin"));
const License = lazy(() => import("@/pages/License"));
const Requisites = lazy(() => import("@/pages/Requisites"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Supervisors = lazy(() => import("@/pages/Supervisors"));
const BulanbayevCertificates = lazy(() => import("@/pages/BulanbayevCertificates"));
const Promos = lazy(() => import("@/pages/Promos"));
const Osteohondroz = lazy(() => import("@/pages/diseases/Osteohondroz"));
const Artroz = lazy(() => import("@/pages/diseases/Artroz"));
const KolennyjSustav = lazy(() => import("@/pages/diseases/KolennyjSustav"));
const TazobedrenyjSustav = lazy(() => import("@/pages/diseases/TazobedrenyjSustav"));
const PrpTerapiya = lazy(() => import("@/pages/services/PrpTerapiya"));
const GialuronovayaKislota = lazy(() => import("@/pages/services/GialuronovayaKislota"));
const MassazhLanding = lazy(() => import("@/pages/services/MassazhLanding"));
const Orthopedics = lazy(() => import("@/pages/services/Orthopedics"));
const Neurology = lazy(() => import("@/pages/services/Neurology"));
const Massage = lazy(() => import("@/pages/services/Massage"));
const LabTests = lazy(() => import("@/pages/services/LabTests"));
const Ultrasound = lazy(() => import("@/pages/services/Ultrasound"));
const Infusions = lazy(() => import("@/pages/services/Infusions"));
const OsteohondrozService = lazy(() => import("@/pages/services/OsteohondrozService"));
const Booking = lazy(() => import("@/pages/Booking"));
const BookingAdmin = lazy(() => import("@/pages/BookingAdmin"));

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <PromoPopup />
        <Suspense fallback={<div className="min-h-screen" />}>
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
          <Route path="/diseases/artroz" element={<Layout><Artroz /></Layout>} />
          <Route path="/diseases/kolennyj-sustav" element={<Layout><KolennyjSustav /></Layout>} />
          <Route path="/diseases/tazobedrennyj-sustav" element={<Layout><TazobedrenyjSustav /></Layout>} />
          <Route path="/diseases/:slug" element={<Layout><DiseaseDetail /></Layout>} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/license" element={<Layout><License /></Layout>} />
          <Route path="/requisites" element={<Layout><Requisites /></Layout>} />
          <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
          <Route path="/supervisors" element={<Layout><Supervisors /></Layout>} />
          <Route path="/promos" element={<Layout><Promos /></Layout>} />
          <Route path="/services/prp-terapiya" element={<Layout><PrpTerapiya /></Layout>} />
          <Route path="/services/gialuronovaya-kislota" element={<Layout><GialuronovayaKislota /></Layout>} />
          <Route path="/services/massazh" element={<Layout><MassazhLanding /></Layout>} />
          <Route path="/services/orthopedics-clinic" element={<Layout><Orthopedics /></Layout>} />
          <Route path="/services/neurology-clinic" element={<Layout><Neurology /></Layout>} />
          <Route path="/services/massage-clinic" element={<Layout><Massage /></Layout>} />
          <Route path="/services/lab-tests" element={<Layout><LabTests /></Layout>} />
          <Route path="/services/ultrasound" element={<Layout><Ultrasound /></Layout>} />
          <Route path="/services/infusions" element={<Layout><Infusions /></Layout>} />
          <Route path="/services/osteohondroz" element={<Layout><OsteohondrozService /></Layout>} />
          <Route path="/booking" element={<Layout><Booking /></Layout>} />
          <Route path="/booking-admin" element={<BookingAdmin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;