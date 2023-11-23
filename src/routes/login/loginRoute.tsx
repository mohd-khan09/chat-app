import { Route, RouteProps } from 'react-router-dom';
import Login from '../../pages/Login';

const Home: React.FC<RouteProps> = (props) => {
  return <Route path="/" element={<Login />} {...props} />;
};
export default Home;
