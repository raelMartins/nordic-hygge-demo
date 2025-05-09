import LandingWrapper from '/src/hoc/LandingWrapper';
import {AuthLayout} from '../components/page_layout/AuthLayout';
import PropertiesPage from '../components/properties/PropertiesPage';

function Home() {
  return <AuthLayout InnerComponent={<PropertiesPage />} />;
}

export default LandingWrapper(Home);
