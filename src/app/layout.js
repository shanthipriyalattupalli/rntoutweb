// app/layout.js (Clean and organized)
import "./globals.css";
import Header from "@/Components/Layout/Header";
import Newsletter from "@/Components/Layout/Newsletter";
import MobileApp from "@/Components/Home/MobileApp";
import GoogleMapsProvider from "../Components/Location/GoogleMapsProvider";
import GlobalLoading from "@/Components/GlobalLoading";
import TrackingProvider from "@/Tracking/index";

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
      </head>
      <body className="antialiased">
        <GlobalLoading />
        <GoogleMapsProvider>
          <Header />
          <div className="relative lg:pt-[80px]">
            {children}
          </div>
          <MobileApp />
          <Newsletter />
        </GoogleMapsProvider>
        
        {/* All tracking scripts in one clean component */}
        <TrackingProvider />
      </body>
    </html>
  );
}