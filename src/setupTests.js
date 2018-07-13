import { configure } from 'enzyme';
import Adapter from 'enzyme-react-adapter-future';

import 'jest-enzyme';

configure({ adapter: new Adapter() });