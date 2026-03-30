import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { Dashboard } from "./pages/Dashboard";
import { ReviewInbox } from "./pages/ReviewInbox";
import { SentimentAnalysis } from "./pages/SentimentAnalysis";
import { IssueDetection } from "./pages/IssueDetection";
import { SmartInsights } from "./pages/SmartInsights";
import { ActionCenter } from "./pages/ActionCenter";
import { Alerts } from "./pages/Alerts";
import { ThemeProvider } from "./context/ThemeContext";
import { SplashScreen } from "./components/layout/SplashScreen";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" onEnter={() => setShowSplash(false)} />
        ) : (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <Router>
              <MainLayout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/reviews" element={<ReviewInbox />} />
                  <Route path="/sentiment" element={<SentimentAnalysis />} />
                  <Route path="/issues" element={<IssueDetection />} />
                  <Route path="/insights" element={<SmartInsights />} />
                  <Route path="/actions" element={<ActionCenter />} />
                  <Route path="/alerts" element={<Alerts />} />
                </Routes>
              </MainLayout>
            </Router>
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;
