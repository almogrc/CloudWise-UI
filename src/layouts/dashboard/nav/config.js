import { useLocation } from 'react-router-dom';
// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Machines',
    icon: icon('ic_user'),
  },
  {
    title: 'dashboard',
    icon: icon('ic_analytics'), 
  },
  { 
    title: 'forecasts',
    icon: icon('ic_crystal_ball'),
  },
];

export default navConfig;
