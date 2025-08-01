@@ .. @@
-import React, { useEffect } from 'react';
-import { NextUIProvider } from '@nextui-org/react';
-import { Layout } from './components/layout/Layout';
-import { HomePage } from './pages/HomePage';
-import { DashboardPage } from './pages/DashboardPage';
-import { useThemeStore } from './store/useThemeStore';
-import { useAuthStore } from './store/useAuthStore';
+import React from 'react';
+import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
+import { GrandmastersList } from './pages/GrandmastersList';
+import { PlayerProfile } from './pages/PlayerProfile';

 function App() {
-  const { setTheme, mode } = useThemeStore();
-  const { isAuthenticated } = useAuthStore();
-
-  // Initialize theme on app start
-  useEffect(() => {
-    setTheme(mode);
-  }, [setTheme, mode]);
-
-  // Simple routing logic - in a real app, use React Router
-  const currentPage = isAuthenticated ? 'dashboard' : 'home';
-
-  const renderPage = () => {
-    switch (currentPage) {
-      case 'dashboard':
-        return <DashboardPage />;
-      default:
-        return <HomePage />;
-    }
-  };
-
   return (
-    <NextUIProvider>
-      <Layout>
-        {renderPage()}
-      </Layout>
-    </NextUIProvider>
+    <Router>
+      <Routes>
+        <Route path="/" element={<GrandmastersList />} />
+        <Route path="/player/:username" element={<PlayerProfile />} />
+      </Routes>
+    </Router>
   );
 }