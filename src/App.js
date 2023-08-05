// import { BrowserRouter } from 'react-router-dom';
// import { HelmetProvider } from 'react-helmet-async';
// // routes
// import Router from './routes';
// // theme
// import ThemeProvider from './theme';
// // components
// import { StyledChart } from './components/chart';
// import ScrollToTop from './components/scroll-to-top';

// // ----------------------------------------------------------------------

// export default function App() {
//   return (
//     <HelmetProvider>
//       <BrowserRouter>
//         <ThemeProvider>
//           <ScrollToTop />
//           <StyledChart />
//           <Router />
//         </ThemeProvider>
//       </BrowserRouter>
//     </HelmetProvider>
//   );
// }

import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TimeFrameProvider } from './TimeFrameContext'; 
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimeFrameProvider>
              <ScrollToTop />
              <StyledChart />
              <Router />
            </TimeFrameProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
